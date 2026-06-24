'use client';

import { useState } from "react";

import CakePreview from "../cake/CakePreview";
import ShapeTab from "./ShapeTab";
import FlavorTab from "./FlavorTab";
import ToppingTab from "./ToppingTab";
import ColorTab from "./ColorTab";
import CustomerTab from "./CustomerTab";

export default function CakeDesigner() {
  const [tab, setTab] = useState("size");

  return (
    <div className="designer-container">
      <div className="row">
        <div className="col-md-5">
          <CakePreview />
        </div>
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div
                  className={`config-tab ${
                    tab === "size"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setTab("size")
                  }
                >
                  Shape
                </div>
                
                 <div
                  className={`config-tab ${
                    tab === "flavor"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setTab("flavor")
                  }
                >
                  FLAVOR
                </div>

                <div
                  className={`config-tab ${
                    tab === "color"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setTab("color")
                  }
                >
                  COLOR
                </div>

                <div
                  className={`config-tab ${
                    tab === "topping"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setTab("topping")
                  }
                >
                  TOPPINGS
                </div>

                <div
                  className={`config-tab ${
                    tab === "customer"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setTab("customer")
                  }
                >
                  CUSTOMER
                </div>
              </div>

              <div className="mt-4">
                {tab === "size" && (
                  <ShapeTab id={1} />
                )}

                {tab === "flavor" && (
                  <FlavorTab id={2} />
                )}

                {tab === "color" && (
                  <ColorTab id={3}/>
                )}

                {tab === "topping" && (
                  <ToppingTab id={4} />
                )}

                {tab === "customer" && (
                  <CustomerTab />
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}