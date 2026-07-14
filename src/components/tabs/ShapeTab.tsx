import { useGetProductAttributeQuery,  } from '@/queries/useProductAttribute';
import { mediaUrl } from '@/utils/lib';
type Props ={
  id?: number,
  attr_id?: number
}

export default function ShapeTab({id,attr_id}: Props) {
  
  const attributeId = id ? Number(id) : 0;
  const attributeQuery = useGetProductAttributeQuery(attributeId);
  const attributeData = id ? attributeQuery.data?.payload : null;
  const attributes = attributeData?.attributes ?? [];
  return (
    <>
      <h5 className="mt-4">
        Shape
      </h5>

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
              >
                {item.image && (
                  <img
                    src={mediaUrl(item.image)}
                    alt={item.title}
                    className="mb-2"
                    style={{
                      width: "100%",
                      height: 70,
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
                {item.title} 
              </button>
            </div>
          ))
        } 
      </div>
    </>
  );
}