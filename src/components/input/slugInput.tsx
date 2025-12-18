'use client'

import { useEffect, useRef } from 'react'
import { UseFormRegister, UseFormSetValue, UseFormWatch,FieldErrors, } from 'react-hook-form'
import { slugify } from '@/utils/lib'

interface Props {
    register: UseFormRegister<any>
    setValue: UseFormSetValue<any>
    watch: UseFormWatch<any>
    titleName?: string
    slugName?: string
    errors?: FieldErrors
}

export default function SlugInput({
    register,
    setValue,
    watch,
    titleName = 'title',
    slugName = 'slug',
    errors,
 }: Props) {
    const title = watch(titleName)
    const slug = watch(slugName)

    // Đánh dấu: slug đã bị user chỉnh tay hay chưa
    const isSlugEdited = useRef(false)

    // Auto generate slug khi title thay đổi
    useEffect(() => {
        if (!isSlugEdited.current && title) {
            setValue(slugName, slugify(title), { shouldDirty: true })
            }
    }, [title])
    const titleError = errors?.[titleName]?.message as string | undefined
    const slugError = errors?.[slugName]?.message as string | undefined
    return (
        <>
            {/* TITLE */}
            <div className="mb-3 position-relative">
                <label className="form-label">Name</label>
                <input
                    {...register(titleName)}
                    placeholder="Nhập tiêu đề"
                    className="form-control"
                />
                {titleError && (
                    <p className="text-red-500">{titleError}</p>
                )}
            </div>

            {/* SLUG */}
            <div className="mb-3 position-relative">
                <label className="form-label">
                Slug
                {isSlugEdited.current && (
                    <span className="ml-2 text-xs text-orange-600">
                    (đã chỉnh tay)
                    </span>
                )}
                </label>

                <div className="flex gap-2">
                    <input
                        {...register(slugName)}
                        value={slug || ''}
                        onChange={(e) => {
                        isSlugEdited.current = true
                        setValue(slugName, slugify(e.target.value), {
                            shouldDirty: true,
                        })
                        }}
                        className="form-control"
                    />

                    <button
                        type="button"
                        onClick={() => {
                        isSlugEdited.current = false
                        setValue(slugName, slugify(title || ''), {
                            shouldDirty: true,
                        })
                        }}
                        className="px-3 border rounded text-sm hover:bg-gray-100"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}
