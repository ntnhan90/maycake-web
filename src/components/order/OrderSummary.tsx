export default function OrderSummary() {
  return (
    <div className="card mt-3">

      <div className="card-body d-flex justify-content-between align-items-center">

        <h5 className="mb-0">
          Tổng: 1.250.000đ
        </h5>

        <div>

          <button className="btn btn-secondary me-2">
            HỦY ĐƠN
          </button>

          <button className="btn btn-warning">
            IN BILL & GỬI BẾP
          </button>

        </div>

      </div>

    </div>
  );
}