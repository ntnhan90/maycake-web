'use client';

import { useState } from "react";

import CakePreview from "../cake/CakePreview";
import SizeBaseTab from "./SizeBaseTab";
import FlavorTab from "./FlavorTab";
import ToppingTab from "./ToppingTab";
import CustomerTab from "./CustomerTab";
import ReviewTab from "./ReviewTab";

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
                  SIZE & BASE
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
                  COLOR & FLAVOR
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

                <div
                  className={`config-tab ${
                    tab === "review"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setTab("review")
                  }
                >
                  REVIEW
                </div>

              </div>

              <div className="mt-4">

                {tab === "size" && (
                  <SizeBaseTab />
                )}

                {tab === "flavor" && (
                  <FlavorTab />
                )}

                {tab === "topping" && (
                  <ToppingTab />
                )}

                {tab === "customer" && (
                  <CustomerTab />
                )}

                {tab === "review" && (
                  <ReviewTab />
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}