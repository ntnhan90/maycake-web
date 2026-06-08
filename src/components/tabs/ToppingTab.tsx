import { toppings } from "@/data/topping";

export default function ToppingTab() {
  return (
    <>
      <input
        className="form-control mb-3"
        placeholder="Tìm topping..."
      />

      <div className="row g-3">

        {toppings.map((item) => (
          <div
            key={item.id}
            className="col-md-3"
          >
            <div className="topping-card">

              <img
                src={item.image}
                alt=""
              />

              <div className="p-2">

                <div>
                  {item.name}
                </div>

                <small>
                  +{item.price.toLocaleString()}
                </small>

                <button className="btn btn-primary btn-sm w-100 mt-2">
                  Thêm
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </>
  );
}