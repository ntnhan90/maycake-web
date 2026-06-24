import { useGetProductAttributeQuery,  } from '@/queries/useProductAttribute';

type Props ={
    id?: number
}

export default function ToppingTab({id}: Props) {
  const attributeId = id ? Number(id) : 0;
  const attributeQuery = useGetProductAttributeQuery(attributeId);
  const attributeData = id ? attributeQuery.data?.payload : null;
  const attributes = attributeData?.attributes ?? [];

  return (
    <>
      <input
        className="form-control mb-3"
        placeholder="Tìm topping..."
      />

      <div className="row g-2">
        {
          attributes?.map((item) => (
            <div
              key={item.attribute_id}
              className="col-4"
            >
              <button className="btn btn-outline-secondary w-100">
                {item.title}
              </button>
            </div>
          ))
        }
      </div>
    </>
  );
}