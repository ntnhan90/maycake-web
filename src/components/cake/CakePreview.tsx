export default function CakePreview() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="preview-area mt-3">
          <img
            src="/img/cake.png"
            alt=""
          />
        </div>
        <input
          className="form-control mt-3"
          placeholder="Chúc mừng..."
        />
      </div>
    </div>
  );
}