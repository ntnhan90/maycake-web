'use client';

import { useState } from "react";
import { toppings } from "@/data/topping";
import CategoryTabs from "./CategoryTabs";
import ToppingCard from "./ToppingCard";

export default function ToppingConfigurator() {
  const [category, setCategory] =
    useState("game");

  const filtered = toppings.filter(
    (x) => x.category === category
  );

  return (
    <div className="card border-0 shadow-sm">

      <div className="card-body">

        <h4 className="fw-bold mb-3">
          Advanced Topping Configurator
        </h4>

        <CategoryTabs
          selected={category}
          onChange={setCategory}
        />

        <input
          className="form-control mb-3"
          placeholder="Tìm topping..."
        />

        <div className="row g-2">

          {filtered.map((item) => (
            <div
              key={item.id}
              className="col-md-4"
            >
              <ToppingCard topping={item} />
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}