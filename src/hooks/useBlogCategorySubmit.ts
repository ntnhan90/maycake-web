import { toast } from "react-toastify";
import { handleErrorApi } from "@/utils/lib";
import { CreateBlogCateBodyType } from "@/models/blog/categoryModel";

export function useBlogCategorySubmit({
    selected,
    createMutation,
    updateMutation,
    reset,
    setSelected,
    router,
    setError
}: any) {
    return async (data: CreateBlogCateBodyType) => {
        try {
            if (selected) {
                console.log(data);
                if (updateMutation.isPending) return;

                const body = {
                    id: selected.id,
                    ...data
                };

                await updateMutation.mutateAsync(body);
                toast.success("Update success");
            } else {
                if (createMutation.isPending) return;

                await createMutation.mutateAsync(data);

                toast.success("Add success");
            }

            reset();
            setSelected(null);
            router.refresh();

        } catch (error) {
            handleErrorApi({
                error,
                setError
            });
        }
    };
}