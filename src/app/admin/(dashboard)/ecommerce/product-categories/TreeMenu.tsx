'use client'

import { useState } from 'react'
import { ChevronDown ,ChevronRight} from "react-feather";

export default function TreeMenu({ items }: { items: any[] }) {
    return (
        <div className="tree-menu">
            {items.map((item) => (
                <TreeNode key={item.id} item={item} />
            ))}
        </div>
    )
}

function TreeNode({ item }: { item: any }) {
    const [open, setOpen] = useState(false)
    const hasChildren = item.children && item.children.length > 0

    return (
        <div className='level-1'>
            <div
                className="flex items-center gap-1 cursor-pointer py-1 level-2"
                onClick={() => hasChildren && setOpen(!open)}
            >
                {hasChildren ? (
                open ? <ChevronDown size={16}/> : <ChevronRight size={16}/>
                ) : (
                <span className="w-[16px] inline-block"></span>
                )}

                <span> {item.title}</span>
            </div>

            {open && hasChildren && (
                <div className="ms-4 border-1 ps-3 level-2">
                {item.children.map((child: any) => (
                    <TreeNode key={child.id} item={child} />
                ))}
                </div>
            )}
        </div>
    )
}
