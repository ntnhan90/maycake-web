'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface Props {
  value?: string | null
  onChange?: (value: string) => void
  onBlur?: () => void
}

export default function RichTextEditor({
    value ,
    onChange,
    onBlur,
}: Props) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={value ?? ''}
            config={{
                licenseKey: 'GPL',
                toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'blockQuote',
                'insertTable',
                'undo',
                'redo',
                ],
            }}
            onChange={(_, editor) => {
                onChange?.(editor.getData())
            }}
            onBlur={() => {
                onBlur?.()
            }}
        />
    )
}
