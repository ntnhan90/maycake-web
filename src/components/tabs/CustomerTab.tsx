export default function CustomerTab() {
  return (
    <div>

      <input
        className="form-control mb-3"
        placeholder="Tên khách"
      />

      <input
        className="form-control mb-3"
        placeholder="Số điện thoại"
      />

      <textarea
        className="form-control"
        rows={4}
        placeholder="Ghi chú"
      />

    </div>
  );
}