'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface Props {
    value?: string
    onChange?: (data: string) => void
}

export default function RichTextEditor({ value = '', onChange }: Props) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(_, editor) => {
                const data = editor.getData()
                onChange?.(data)
            }}
            config={{
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
        />
    )
}


// import 
//const [content, setContent] = useState('') 
// <RichTextEditor   value={content}    onChange={setContent}  />