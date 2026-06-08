'use client';

import { useState } from "react";

export default function CakeVisualizer() {
  const [text, setText] = useState("");

  return (
    <div className="card border-0 shadow-sm">

      <div className="card-body">

        <h4 className="fw-bold mb-3">
          Cake Visualizer
        </h4>

        <div className="position-relative">
          <img
            src="/img/cake.png"
            className="img-fluid rounded"
            alt=""
          />

          <button
            className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2"
          >
            ✏️
          </button>

        </div>

        <div className="mt-3">

          <label className="form-label">
            Văn bản trên bánh
          </label>

          <input
            className="form-control form-control-lg"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Chúc mừng..."
          />

        </div>

        <button className="btn btn-outline-secondary mt-2 w-100">
          📷 Thêm ảnh mẫu
        </button>

      </div>

    </div>
  );
}