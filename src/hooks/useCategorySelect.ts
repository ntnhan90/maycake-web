import { CategoryItem } from "@/models/categoryManager";
import { UseFormSetValue } from "react-hook-form";
import { CreateBlogCateBodyType } from "@/models/blog/categoryModel";
import { onSelectCategory } from "@/utils/lib";

export function useCategorySelect(
    setSelected: (item: CategoryItem | null) => void,
    setValue: UseFormSetValue<CreateBlogCateBodyType>
) {
    return (item: CategoryItem) => {
        onSelectCategory({
            item,
            setSelected,
            setValue
        });
    };
}