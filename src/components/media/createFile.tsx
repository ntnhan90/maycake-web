"use client"
import { useRef,useState } from "react";
import { useUploadFileMutation } from "@/queries/useMedia";

interface UploadFileProps {
  folderID: number | null
}

export default function UploadFile({ folderID }: UploadFileProps){
    
    const [file, setFile] = useState<File | null>(null)
    const fileRef = useRef<HTMLInputElement>(null);
    const uploadFileMutation  = useUploadFileMutation();

    const handleUpload = async (  e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return; // ⛔ chặn sớm
        console.log
        const formData = new FormData();
        if (folderID !== null) {
            formData.append('folder_id', folderID.toString())
        }
        formData.append('file', file);
        setFile(file)
        const uploadImageResult = await uploadFileMutation.mutateAsync(
            formData
        )
        console.log(uploadImageResult)
        /*
        formData.forEach((value, key) => {
            console.log(key, value);
        });*/
    }

    return(
        <>
            <input
                ref={fileRef}
                type="file"
                hidden
                multiple
                onChange={handleUpload}
            />

            <button
                className="btn btn-primary"
                onClick={() => fileRef.current?.click()}
            >
                Upload
            </button>
        </>
    )
}