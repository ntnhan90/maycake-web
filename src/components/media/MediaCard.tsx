import { MediaItem } from "@/types/media.type";
import styles from "./MediaCard.module.scss";

interface Props {
    item: MediaItem;
    openMenu: (e: React.MouseEvent<HTMLDivElement>, item: MediaItem) => void;
}

export default function MediaCard({ item, openMenu }: Props) {
    const onDouble = () => {
        if (item.type === "folder") {
        alert("Open folder: " + item.name);
        } else {
        alert("Preview file: " + item.name);
        }
    };

    return (
        <div className="col-3">
            <div
                className={styles.card}
                onContextMenu={(e) => openMenu(e, item)}
                onDoubleClick={onDouble}
            >
                {item.type === "folder" ? (
                <i className="bi bi-folder-fill text-warning" />
                ) : (
                <img src={item.thumbnail} alt={item.name} />
                )}

                <p className={styles.name}>{item.name}</p>
            </div>
        </div>
    );
}
