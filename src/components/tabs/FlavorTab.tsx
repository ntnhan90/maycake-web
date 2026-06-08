export default function FlavorTab() {
  return (
    <>
      <h5>Màu sắc</h5>

      <div className="d-flex gap-2">

        <button className="btn btn-light">
          Trắng
        </button>

        <button className="btn btn-danger">
          Hồng
        </button>

        <button className="btn btn-primary">
          Xanh
        </button>

      </div>

      <h5 className="mt-4">
        Hương vị
      </h5>

      <div className="d-flex gap-2">

        <button className="btn btn-outline-secondary">
          Vani
        </button>

        <button className="btn btn-outline-secondary">
          Socola
        </button>

        <button className="btn btn-outline-secondary">
          Matcha
        </button>

      </div>
    </>
  );
}