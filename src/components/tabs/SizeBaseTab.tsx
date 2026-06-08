export default function SizeBaseTab() {
  return (
    <>
      <h5>Size bánh</h5>

      <div className="row g-2">

        <div className="col-3">
          <button className="btn btn-outline-primary w-100">
            15 cm
          </button>
        </div>

        <div className="col-3">
          <button className="btn btn-outline-primary w-100">
            20 cm
          </button>
        </div>

        <div className="col-3">
          <button className="btn btn-outline-primary w-100">
            25 cm
          </button>
        </div>

      </div>

      <h5 className="mt-4">
        Shape
      </h5>

      <div className="row g-2">

        <div className="col-4">
          <button className="btn btn-outline-secondary w-100">
            Round
          </button>
        </div>

        <div className="col-4">
          <button className="btn btn-outline-secondary w-100">
            Square
          </button>
        </div>

        <div className="col-4">
          <button className="btn btn-outline-secondary w-100">
            Heart
          </button>
        </div>

      </div>
    </>
  );
}