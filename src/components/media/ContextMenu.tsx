import { useEffect, useRef } from "react";
import { ContextMenuState, MenuAction } from "@/types/media.type";
import styles from "./ContextMenu.module.scss";

interface Props {
  menu: ContextMenuState;
  actions: MenuAction[];
  closeMenu: () => void;
}

export default function ContextMenu({ menu, actions, closeMenu }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hide = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            closeMenu();
        }
        };

        document.addEventListener("click", hide);
            return () => document.removeEventListener("click", hide);
    }, []);

    if (!menu.show) return null;

    return (
        <div
        ref={ref}
        className={styles.menu}
        style={{ top: menu.y, left: menu.x }}
        >
        {actions.map((a, i) => (
            <div
            key={i}
            className={styles.item}
            onClick={() => {
                a.onClick();
                closeMenu();
            }}
            >
            {a.icon && <i className={`bi ${a.icon}`} />}
            <span>{a.label}</span>
            </div>
        ))}
        </div>
    );
}
