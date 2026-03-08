import {  useSortable } from "@dnd-kit/sortable";
import { CategoryItem } from "@/models/categoryManager";
import { CSS } from "@dnd-kit/utilities";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SortableItemProps {
    item: CategoryItem;
    depth: number;
    hasChildren: boolean;
    isExpanded: boolean;
    onToggle: (id: number) => void;
    onSelect: (item: CategoryItem) => void;
    onDelete: (id: number) => void
}

// ================= SORTABLE ITEM =================
export function SortableItem({
    item,
    depth,
    hasChildren,
    isExpanded,
    onToggle,
    onSelect,
    onDelete
}: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginLeft: depth * 20,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="d-flex align-items-center justify-content-between p-2 border rounded mb-1 bg-white"
        >
            <div className="d-flex align-items-center gap-2">
                {hasChildren && (
                <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={() => onToggle(item.id)}
                >
                    {isExpanded ? "−" : "+"}
                </button>
                )}

                <span
                {...attributes}
                {...listeners}
                className="text-muted"
                style={{ cursor: "grab" }}
                >
                ≡
                </span>

                <span role="button" onClick={() => onSelect(item)}>
                    {item.name} <span className="text-primary">({item.count})</span>
                </span>

                <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={(e) => {
                        e.stopPropagation()

                        if (confirm("Delete this category?")) {
                            onDelete(item.id)
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}