import { Topping } from "@/types/cake";

interface Props {
  topping: Topping;
}

export default function ToppingCard({
  topping,
}: Props) {
  return (
    <div className="card h-100">

      <img
        src={topping.image}
        className="card-img-top"
        alt=""
      />

      <div className="card-body">

        <div className="fw-semibold">
          {topping.name}
        </div>

        <div className="text-danger small">
          +{topping.price.toLocaleString()}đ
        </div>

      </div>

      <div className="card-footer bg-white">
        <button className="btn btn-primary w-100">
          Thêm
        </button>
      </div>

    </div>
  );
}