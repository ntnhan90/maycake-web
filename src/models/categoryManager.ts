export interface CategoryItem {
    id: number;
    name: string;
    count: number;
    parent_id: number;
    is_featured: number;
    is_default: number;
    image?: string;
}