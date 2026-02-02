'use client'
import { useEffect, useState } from 'react'

type LabelItem = {
  id: number
  name: string
}
type LabelApiResponse = {
    data: LabelItem[]
    pagination: {
        limit: number
        currentPage: number
        totalRecords: number
        totalPages: number
    }
}
interface Props {
    value?: number[]
    onChange?: (ids: number[]) => void
}

export default function LabelSelect({
    value = [],
    onChange,
}: Props) {
    const [categories, setCategories] = useState<LabelItem[]>([])
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL

    const API_URI = `${API_URL}/product-labels`

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(API_URI)

            if (!res.ok) {
                console.error('Fetch category failed', res.status)
                setCategories([])
                return
            }

            const json: LabelApiResponse = await res.json()

            const normalized: LabelItem[] = (json.data ?? []).map(c => ({
                id: Number(c.id),
                name: c.name,
            }))

            setCategories(normalized)
        }

        fetchCategories()
    }, [API_URI])

    const toggle = (id: number) => {
        const next = value.includes(id)
        ? value.filter(i => i !== id)
        : [...value, id]

        onChange?.(next)
    }

    const renderTree = (parentId = 0) => {
        return (categories ?? [])
        .map(cat => (
            <div key={cat.id}>
                <label className="d-flex align-items-center gap-2 mb-2">
                    <input
                    type="checkbox"
                    checked={value.includes(cat.id)}
                    onChange={() => toggle(cat.id)}
                    />
                    <span>{cat.name} - {cat.id}</span>
                </label>

                {renderTree(cat.id)}
            </div>
        ))
    }

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h5 className="mb-3">Labels</h5>
                {renderTree()}
            </div>
        </div>
    )
}