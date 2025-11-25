export interface ProductListType {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  status: "Active" | "Deactive";
  imageSrc: string;
}
