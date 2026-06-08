export default function ReviewTab() {
  return (
    <div>

      <h4>Tổng kết đơn hàng</h4>

      <ul>
        <li>Size: 20cm</li>
        <li>Flavor: Vani</li>
        <li>Topping: Mario</li>
      </ul>

      <h3 className="text-danger">
        1.250.000đ
      </h3>

      <button className="btn btn-success">
        Xác nhận đơn
      </button>

    </div>
  );
}