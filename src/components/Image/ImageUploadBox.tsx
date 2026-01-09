'use client'

import { useState } from 'react'
import { Image } from 'react-bootstrap-icons'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import MediaManager from '../media/mediaManager'

interface Props {
  name: string
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
}

export default function ImageUploadBox({ name, setValue, watch }: Props) {
    const [open, setOpen] = useState(false)
    const value = watch(name)

    const preview = typeof value === 'string' ? value : null

    const onSelectImage = (url: string) => {
        setValue(name, url, { shouldValidate: true })
        setOpen(false)
    }

    return (
        <>
        <div className="border rounded p-3" style={{ maxWidth: 320 }}>
            <div className="fw-semibold mb-2">Image</div>

            <div
            className="border rounded d-flex align-items-center justify-content-center mb-2"
            style={{ height: 140, background: '#fafafa' }}
            >
            {preview ? (
                <img
                src={preview}
                className="img-fluid"
                style={{ maxHeight: '100%' }}
                />
            ) : (
                <Image size={48} className="text-muted" />
            )}
            </div>

            <div className="text-center small">
            <span
                className="text-primary fw-semibold"
                style={{ cursor: 'pointer' }}
                onClick={() => setOpen(true)}
            >
                Choose image
            </span>
            <br />
            <span className="text-muted">from media library</span>
            </div>
        </div>

        {/* MODAL MEDIA */}
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

                <div className="modal-body p-0">
                    {/**
                     *<MediaManager onSelect={onSelectImage} />
                     **/}
                    <MediaManager />
                </div>
                </div>
            </div>

            {/* backdrop */}
            <div className="modal-backdrop fade show" />
            </div>
        )}
        </>
    )
}
