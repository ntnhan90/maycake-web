'use client'

import { useState } from 'react'
import { Image } from 'react-bootstrap-icons'
import { useController, Control } from 'react-hook-form'
import MediaManager from '../media/mediaManager'
import { mediaUrl } from '@/utils/lib'

interface Props {
    name: string
    control: Control<any>
}

export default function ImageUploadBoxMini({ name, control}: Props) {
    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const { field } = useController({
        name,
        control
    })

    const preview = mediaUrl(field.value)

    const handleInsert = () =>{
        if( !selectedImage) return;
        field.onChange(selectedImage)
        setOpen(false)
    }
    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center mb-2"
                style={{ height: 36, width: 36, background: '#fafafa' }}
                onClick={() => setOpen(true)}
                >
                {preview ? (
                    <img
                    src={preview}
                    className="img-fluid"
                    style={{ maxHeight: '100%' }}
                    />
                ) : (
                    <Image size={36} className="text-muted" />
                )}
            </div>

            {open && (
                <div className="modal fade show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Media Library</h5>
                                <button
                                type="button"
                                className="btn-close"
                                onClick={() => setOpen(false)}
                                />
                            </div>

                            <div className="modal-body p-4">
                                <MediaManager onSelect={(url:string)=>setSelectedImage(url)}/>
                            </div>
                            <div className="modal-footer">
                                <button
                                type="button"
                                className='btn btn-outline-primary'
                                onClick={handleInsert}
                                >Insert </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
