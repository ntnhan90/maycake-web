export interface MediaItem {
  id: number;
  name: string;
  type: "folder" | "file";
  thumbnail?: string;
}

export interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  target: MediaItem | null;
}

export interface MenuAction {
  label: string;
  icon?: string;
  onClick: () => void;
}