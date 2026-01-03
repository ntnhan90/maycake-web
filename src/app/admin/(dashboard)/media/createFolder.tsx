"use client"
import { useState } from 'react';
import {  FolderPlus } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFolderBody, CreateFolderBodyType } from '@/models/folderModel';
import { useUploadFolderMutation } from '@/queries/useMedia';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAccountProfile } from '@/queries/useAccount'
import { handleErrorApi } from "@/utils/lib";

interface UploadFileProps {
  folderID: number | null
}

export default function UploadFolder({ folderID }: UploadFileProps){
    const router = useRouter()
    const {data} = useAccountProfile();
    const account_id = data?.payload.id;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const uploadFolderMutation  = useUploadFolderMutation();
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
                parent_id:folderID ?? 0
            }
            const result = await uploadFolderMutation.mutateAsync(body)
            console.log(result)
            toast.success("add folder success");
            router.push("/admin/media")
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
            })
        }
    }
    return (
        <>
            <button className="btn btn-outline-secondary" onClick={handleShow} >
                <FolderPlus />
            </button>
            <Modal show={show} onHide={handleClose}>
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