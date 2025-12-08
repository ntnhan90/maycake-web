import TreeMenu from "./TreeMenu";
import { treeMenu} from "./menu";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product Category | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function EcomProductCatePage() {
    return (
        <div className="p-4">
            <TreeMenu items={treeMenu} />
        </div>
    );
}