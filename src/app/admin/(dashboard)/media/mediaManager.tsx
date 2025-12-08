"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState ,MouseEvent } from "react";
import { Folder, Image , FolderPlus } from "react-bootstrap-icons";
import { MediaItem ,ContextMenuState} from '@/types/media.type';

const folders = [
  "promotion",
  "general",
  "payments",
  "testimonials",
  "sliders",
  "news",
  "products",
  "customers",
  "brands",
  "product-categories"
];

const items = [
    { id: 1, name: "products", type: "folder" },
    { id: 2, name: "brands", type: "folder" },
    { id: 3, name: "banner.png", type: "file" },
    { id: 4, name: "promo.webp", type: "file" },
];


export default function MediaManager() {
    const [selected, setSelected] = useState<string | null>(null);
    const [menu, setMenu] = useState<ContextMenuState>({ show: false, x: 0, y: 0, target: null });

    const handleOpenFolder = (id: number) => {
        console.log("Open folder:", id);
        // Router.push(`/media/folder/${id}`)
    };
    
    return (
        <div className="container-fluid p-4">
            {/* ACTION BAR */}
            <div className="d-flex align-items-center gap-2 mb-4">
                <button className="btn btn-primary">Upload</button>
                <button className="btn btn-outline-secondary"><FolderPlus /></button>
                
                <div className="ms-auto d-flex align-items-center">
                <input className="form-control" placeholder="Search in current folder" />
                </div>
            </div>

            <div className="row">
                {/* LEFT GRID */}
                <div className="col-lg-9">
                    <div className="row g-4">
                        {folders.map(folder => (
                        <div key={folder} className="col-6 col-md-3 col-lg-2">
                            <div
                            className={`border rounded p-3 text-center folder-card ${
                                selected === folder ? "border-primary shadow-sm" : ""
                            }`}
                            onClick={() => setSelected(folder)}
                            onDoubleClick={() => handleOpenFolder(1)}
                         //   onContextMenu={(e) => openMenu(e, item)} // right-click on item
                            style={{ cursor: "pointer" }}
                            >
                            <Folder size={36} />
                            <div className="mt-2 small">{folder}</div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PREVIEW PANEL */}
                <div className="col-lg-3">
                    <div className="border rounded p-4 h-100 d-flex flex-column align-items-center justify-content-center">
                        {selected ? (
                            <>
                                <Folder size={60} />
                                <p className="mt-3 fw-bold">{selected}</p>
                            </>
                        ) : (
                        <>
                            <Image size={80} />
                            <p className="mt-3 text-muted">Select an item</p>
                        </>
                        )}
                    </div>
                </div>
            </div>

            <div className="row">
            </div>
        </div>
    );
}