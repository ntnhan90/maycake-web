'use client'

import React from "react"
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react"

const CustomEditor: React.FC = () => {
    const cloud = useCKEditorCloud({
        version: "47.6.0",
        premium: true
    })

    if (cloud.status === "error") {
        return <div>Error loading editor</div>
    }

    if (cloud.status === "loading") {
        return <div>Loading editor...</div>
    }

    const {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Heading,
        Link,
        List,
        Table,
        TableToolbar,
        Image,
        ImageToolbar,
        ImageCaption,
        ImageStyle,
        ImageResize,
        ImageUpload,
        CodeBlock,
        BlockQuote,
        MediaEmbed
    } = cloud.CKEditor

    return (
        <CKEditor
            editor={ClassicEditor}
            data="<p>Start writing your blog...</p>"
            config={{
                licenseKey: "<YOUR_LICENSE_KEY>",

                plugins: [
                    Essentials,
                    Paragraph,
                    Bold,
                    Italic,
                    Heading,
                    Link,
                    List,
                    Table,
                    TableToolbar,
                    Image,
                    ImageToolbar,
                    ImageCaption,
                    ImageStyle,
                    ImageResize,
                    ImageUpload,
                    CodeBlock,
                    BlockQuote,
                    MediaEmbed
                ],

                toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "|",
                    "insertTable",
                    "imageUpload",
                    "mediaEmbed",
                    "|",
                    "codeBlock",
                    "|",
                    "undo",
                    "redo"
                ],

                image: {
                    toolbar: [
                        "imageTextAlternative",
                        "imageStyle:inline",
                        "imageStyle:block",
                        "imageStyle:side"
                    ]
                },

                table: {
                    contentToolbar: [
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells"
                    ]
                },

                mediaEmbed: {
                    previewsInData: true
                }
            }}

            onChange={(_, editor) => {
                const data = editor.getData()
                console.log(data)
            }}
        />
    )
}

export default CustomEditor