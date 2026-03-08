import React from "react";
import { CategoryWithCountType } from "@/models/blog/categoryModel";
import { CategoryItem } from "@/models/categoryManager";
import { SortableItem } from "@/components/SortableItem";


interface RenderCategoriesParams {
    categories: CategoryWithCountType[];
    expanded: Record<string, boolean>;
    toggleExpand: (id: number) => void;
    onSelectCategory: (item: CategoryItem) => void;
    onDeleteCategory: (id: number) => void;  
    parentId?: number;
    depth?: number;
}

export const renderCategories = ({
    categories,
    expanded,
    toggleExpand,
    onSelectCategory,
    onDeleteCategory,
    parentId = 0,
    depth = 0,
}: RenderCategoriesParams): React.ReactNode => {
    return categories
    .filter((c) => c.parent_id === parentId)
    .map((cat) => {
        const children = categories.filter((c) => c.parent_id === cat.id);
        const hasChildren = children.length > 0;
        const isExpanded = !!expanded[cat.id];

        return (
            <div key={cat.id}>
                <SortableItem
                    item={cat}
                    depth={depth}
                    hasChildren={hasChildren}
                    isExpanded={isExpanded}
                    onToggle={toggleExpand}
                    onSelect={onSelectCategory}
                    onDelete={onDeleteCategory}
                />

                {hasChildren && isExpanded && (
                    <div>
                    {renderCategories({
                        categories,
                        expanded,
                        toggleExpand,
                        onSelectCategory,
                        onDeleteCategory,
                        parentId: cat.id,
                        depth: depth + 1,
                    })}
                    </div>
                )}
            </div>
        );
    });
};

interface ParentOptionParams {
    categories: CategoryWithCountType[];
    selected: CategoryItem | null;
    parentId?: number;
    depth?: number;
}

export const renderParentOptions = ({
    categories,
    selected,
    parentId = 0,
    depth = 0,
}: ParentOptionParams): React.ReactNode[] => {
    return (categories ?? [])
    .filter((c) => c.parent_id === parentId)
    .flatMap((cat) => {
        // Không cho chọn chính nó
        if (selected && cat.id === selected.id) {
            return [];
        }

        return [
            <option key={cat.id} value={cat.id}>
                {"— ".repeat(depth)} {cat.name}
                </option>,
                ...renderParentOptions({
                categories,
                selected,
                parentId: cat.id,
                depth: depth + 1,
            }),
        ];
    });
};