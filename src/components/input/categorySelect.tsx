'use client'
import { useEffect, useState } from 'react'

type CategoryType = 'post' | 'product'

type CategoryItem = {
  id: number
  name: string
  parent_id: number
}

interface Props {
  type: CategoryType
  value?: number[]
  onChange?: (ids: number[]) => void
}

export default function CategorySelect({
  type,
  value = [],
  onChange,
}: Props) {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL

  const API_URI =
    type === 'post'
      ? `${API_URL}/categories`
      : `${API_URL}/product-categories`

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(API_URI)
      const json: { data: CategoryItem[] } = await res.json()
      setCategories(json.data)
    }

    fetchCategories()
  }, [API_URI])

  const toggle = (id: number) => {
    const next = value.includes(id)
      ? value.filter(i => i !== id)
      : [...value, id]

    onChange?.(next)
  }

  const renderTree = (parentId = 0, level = 0) => {
    return categories
      .filter(c => c.parent_id === parentId)
      .map(cat => (
        <div key={cat.id} style={{ marginLeft: level * 20 }}>
          <label className="d-flex align-items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={value.includes(cat.id)}
              onChange={() => toggle(cat.id)}
            />
            <span>{cat.name}</span>
          </label>

          {renderTree(cat.id, level + 1)}
        </div>
      ))
  }

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h5 className="mb-3">Categories</h5>
                {renderTree()}
            </div>
        </div>
    )
}
