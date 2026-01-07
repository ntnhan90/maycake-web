'use client'

import { useEffect, useState ,useRef} from 'react'
import { Folder, Image ,FolderPlus} from 'react-bootstrap-icons'
import { useQuery } from '@tanstack/react-query'
import { MediaItem, MediaTreeType } from '@/types/media.type'
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFolderBody, CreateFolderBodyType } from '@/models/folderModel';
import { useUploadFolderMutation,useUploadFileMutation } from '@/queries/useMedia';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAccountProfile } from '@/queries/useAccount'
import { handleErrorApi } from "@/utils/lib";

interface MediaManagerProps {
  onSelect?: (url: string) => void
}

const MEDIA_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/media`

const fetchMediaTree = async (): Promise<MediaTreeType> => {
    const res = await fetch(MEDIA_API_URL, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(`Fetch media failed: ${res.status}`)
    }

    const data = (await res.json()) as MediaTreeType

    return data ?? {}
}

export default function MediaManager({ onSelect }: MediaManagerProps) {
    /* ---------- QUERY ---------- */
    const { data, isLoading, error } = useQuery<MediaTreeType>({
        queryKey: ['media'],
        queryFn: fetchMediaTree,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1
    })
    /* ---------- ROUTER + ACCOUNT  Upload folder---------- */
    const router = useRouter()
    const { data: dataAccount } = useAccountProfile()
    const account_id = dataAccount?.payload.id;
    const [showFolder, setShowFolder] = useState(false);

    const handleCloseFolder = () => setShowFolder(false);
    const handleShowFolder = () => setShowFolder(true);
    const uploadFolderMutation  = useUploadFolderMutation();
    const uploadFileMutation  = useUploadFileMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<CreateFolderBodyType>({
        resolver: zodResolver(CreateFolderBody),
        defaultValues: {
            name:"",
            parent_id: 0
        },
    });

    const onSubmit = async(data:CreateFolderBodyType) => {
        if(uploadFolderMutation.isPending) return

        try {
            let body = {
                ...data,
                user_id: account_id,
                parent_id:currentFolderId ?? 0
            }
           
            const result = await uploadFolderMutation.mutateAsync(body)
            console.log(result)
            toast.success("add folder success");
            setShowFolder(false)
            router.refresh()
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
            })
        }
    }

    /* FIle */
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const handleUploadFile = async (  e: React.ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder_id', String(currentFolderId))
        formData.append('user_id', String(account_id))
        await uploadFileMutation.mutateAsync(formData)

        toast.success('Upload success')
    }

    /* ---------- LOCAL STATE ---------- */
    const [mediaTree, setMediaTree] = useState<MediaTreeType>({})
    const [pathStack, setPathStack] = useState<string[]>(['0']) // root = "0"
    const [selected, setSelected] = useState<string | null>(null)
    
    const [contextMenu, setContextMenu] = useState<{
        x: number
        y: number
        item: MediaItem | null
    } | null>(null)


    /* ---------- SYNC DATA ---------- */
    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setMediaTree(data)
        }
    }, [data])

    /* ---------- PATH ---------- */
    const currentPath = pathStack[pathStack.length - 1]
    const items: MediaItem[] = mediaTree[currentPath] ?? []
    const currentFolderKey = currentPath          // dùng cho mediaTree
    const currentFolderName = currentPath === '0' ? 'root' : currentPath

    const currentFolderId = Number(currentPath) || 0

    const getFolderNameById = (id: string) => {
        if (id === '0') return 'root'

        for (const items of Object.values(mediaTree)) {
            const found = items.find(
            item => item.id.toString() === id && item.type === 'folder'
            )
            if (found) return found.name
        }

        return id // fallback nếu không tìm thấy
    }
    /* ---------- UI STATE ---------- */
    if (isLoading && Object.keys(mediaTree).length === 0) {
        return <div className="p-4">Loading media...</div>
    }

    if (error) {
        return <div className="p-4 text-danger">Load media failed</div>
    }

    /* ================= ACTIONS ================= */
    const openFolder = (id: number) => {
        setPathStack(prev => [...prev, String(id)])
    }

    const goBack = () => {
        setPathStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev))
    }

    const selectFile = (item: MediaItem) => {
        if (item.type !== 'file') return

       // const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${item.url}`
        const url = `${item.url}`;
        setSelected(url)
        onSelect?.(url)
    }

    const onRightClick = (e: React.MouseEvent, item: MediaItem) => {
        e.preventDefault()
        setContextMenu({ x: e.pageX, y: e.pageY, item })
    }

    const closeContextMenu = () => setContextMenu(null)

    /* ---------- CRUD LOCAL ---------- */
    const deleteItem = () => {
        if (!contextMenu?.item) return

        setMediaTree(prev => ({
            ...prev,
            [currentPath]: (prev[currentPath] || []).filter(
                i => i.id !== contextMenu.item!.id
            )
        }))

        closeContextMenu()
    }

    const renameItem = () => {
        if (!contextMenu?.item) return
        const newName = prompt('Rename to:', contextMenu.item.name)
        if (!newName) return

        setMediaTree(prev => ({
            ...prev,
            [currentPath]: (prev[currentPath] || []).map(i =>
                i.id === contextMenu.item!.id ? { ...i, name: newName } : i
            )
        }))

        closeContextMenu()
    }

    return (
        <>
            <div className="d-flex align-items-center gap-2 mb-4">
                <input type="file"
                    ref={fileInputRef}
                    className="d-none"
                    onChange={handleUploadFile}
                />

                <button
                    className="btn btn-outline-primary"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload file
                </button>
                <button className="btn btn-outline-secondary" onClick={handleShowFolder} >
                    <FolderPlus />
                </button>
              
            </div>
            <div className="row">
                <div className="container py-4" onClick={closeContextMenu}>
                    {/* PATH */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                            /
                            {pathStack
                            .map(id => getFolderNameById(id))
                            .join('/')}
                        </small>
                        {pathStack.length > 1 && (
                        <button className="btn btn-sm btn-outline-secondary" onClick={goBack}>
                            ← Back
                        </button>
                        )}
                    </div>
                    
                    <div className="row g-3">
                        <div className="col-lg-9">
                            <div className="row">
                                {items.map(item => (
                                <div key={`${item.type}-${item.id}`} className="col-6 col-md-3 col-lg-2 mt-2">
                                    <div className={`card h-100 text-center ${
                                            selected?.endsWith(item.name) ? 'border-primary' : ''
                                        }`}
                                        onClick={() =>
                                            item.type === 'folder'
                                            ? openFolder(item.id)
                                            : selectFile(item)
                                        }
                                        onContextMenu={e => onRightClick(e, item)}
                                    >
                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                            {item.type === 'folder' ? (
                                            <Folder size={36} />
                                            ) : (
                                            <Image size={36} />
                                            )}
                                            <p className="mt-2 small text-truncate w-100">
                                            {item.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                ))}
                                {items.length === 0 && (
                                    <div className="text-muted p-3">Empty folder</div>
                                )}
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="border rounded p-4 h-100 d-flex flex-column align-items-center justify-content-center">
                                {selected ? (
                                    <>
                                        <Image size={80} />
                                        <p className="mt-3 small text-break">{selected}</p>
                                    </>
                                    ) : (
                                    <>
                                        <Folder size={80} />
                                        <p className="mt-3 text-muted">Select an item</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CONTEXT MENU */}
                    {contextMenu && (
                        <div
                        className="position-fixed bg-white border rounded shadow"
                        style={{
                            top: contextMenu.y,
                            left: contextMenu.x,
                            zIndex: 1000
                        }}
                        >
                        <button className="dropdown-item" onClick={renameItem}>
                            Rename
                        </button>
                        <button className="dropdown-item text-danger" onClick={deleteItem}>
                            Delete
                        </button>
                        </div>
                    )}
                </div>
            </div>


            <Modal show={showFolder} onHide={handleCloseFolder}>
                <Modal.Header closeButton>
                    <Modal.Title>Create folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit, (err) =>{
                        console.log(err)
                    })} className="row">
                        <div className='input-group'>
                            <input className="form-control " placeholder="Enter name"  {...register("name")} />
                            
                            <button className="btn btn-primary" type="submit"> Create </button>
                        </div>
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    </form>
                </Modal.Body>
                
            </Modal>
        </>
    )
}