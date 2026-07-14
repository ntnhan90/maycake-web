import { useGetProductAttributeQuery } from '@/queries/useProductAttribute';

type ProductAttributeItem = {
  id?: number;
  attribute_id?: number;
  title?: string;
  color?: string | null;
  image?: string | null;
  price?: number;
};

type Props ={
  id?: number,
  attr_id?: number,
  setColor: (color: string) => void;
}

export default function ColorTab({id,attr_id,setColor}: Props) {
  const attributeId = id ? Number(id) : 0;
  const attributeQuery = useGetProductAttributeQuery(attributeId);
  const attributeData = id ? attributeQuery.data?.payload : null;
  const attributes : ProductAttributeItem[]= attributeData?.attributes ?? [];
  return (
    <>
      <h5>Màu sắc</h5>

      <div className="row g-2">
        {
          attributes?.map((item) => (
            <div
              key={item.attribute_id}
              className="col-4"
            >
              <button className={`btn w-100 ${
                attr_id === item.id
                  ? "btn-primary border border-3 border-danger rounded-pill"
                    : "btn-outline-secondary"
                }`}
                onClick={() => {
                  console.log("Selected color:", item.color);
                  setColor(item.color ?? "#112123");
                }}
              >
                {item.title} 
              </button>
            </div>
          ))
        }
      </div>
    </>
  );
}