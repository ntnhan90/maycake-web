'use client'

import { useEffect, useState } from 'react'
import { Form, Badge, Spinner } from 'react-bootstrap'
import { useController, Control } from 'react-hook-form'
import { useGetBlogTagQuery, useGetBlogTagListQuery} from "@/queries/useBlogTag";

interface Tag {
    id: number
    name: string
    slug: string
}

interface TagInputProps {
    name: string
    control: Control<any>
    type: 'post' | 'product'
    label?: string
}

export default function TagInput({
    name,
    control,
    type,
    label = 'Tags',
}: TagInputProps) {
    const {
        field: { value = [], onChange },
    } = useController({
        name,
        control,
    })

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState<Tag[]>([])
    const [open, setOpen] = useState(false)
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL
    useEffect(() => {
        if (!query) {
            setSuggestions([])
            return
        }
        let data : Tag[]= []
        
        const fetchTags = async () => {
            setLoading(true)
            try {
                if (type === 'post') {
                    const res = await fetch(`${API_URL}/tags?q=${query}`)
                    const json: { data: Tag[] } = await res.json()
                    data = json.data
                } else if (type === 'product') {
                    const res = await fetch(`${API_URL}/product-tags?q=${query}`)
                    const json: { data: Tag[] } = await res.json()
                    data = json.data
                }

                setSuggestions(data)
            } finally {
                setLoading(false)
            }
        }

        const t = setTimeout(fetchTags, 300)
        return () => clearTimeout(t)
    }, [query, type])

    const addTag = (tag: string) => {
        if (!value.includes(tag)) {
            onChange([...value, tag])
        }
        setQuery('')
        setOpen(false)
    }

    const removeTag = (tag: string) => {
        onChange(value.filter((t: string) => t !== tag))
    }

    return (
        <Form.Group className="position-relative">
            <Form.Label>{label}</Form.Label>

            <Form.Control
                placeholder="Write some tags"
                value={query}
                onChange={e => {
                setQuery(e.target.value)
                setOpen(true)
                }}
                onFocus={() => setOpen(true)}
            />

            {/* TAGS SELECTED */}
            {value.length > 0 && (
                <div className="mt-2 d-flex gap-2 flex-wrap">
                {value.map((tag: string) => (
                    <Badge
                        key={tag}
                        bg="secondary"
                        className="cursor-pointer"
                        onClick={() => removeTag(tag)}
                    >
                    {tag} ✕
                    </Badge>
                ))}
                </div>
            )}

            {/* DROPDOWN */}
            {open && query && (
                <div className="position-absolute w-100 bg-white border rounded shadow mt-1 z-3">
                {loading && (
                    <div className="p-2 text-center">
                    <Spinner size="sm" />
                    </div>
                )}

                {!loading && suggestions.length === 0 && (
                    <div
                        className="p-2 text-muted"
                        onClick={() => addTag(query)}
                    >
                    ➕ Add "{query}"
                    </div>
                )}

                {!loading &&
                    suggestions.map(tag => (
                    <div
                        key={tag.id}
                        className="p-2 hover-bg cursor-pointer"
                        onClick={() => addTag(tag.name)}
                    >
                        {tag.name}
                    </div>
                    ))}
                </div>
            )}
        </Form.Group>
    )
}
