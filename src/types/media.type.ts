export interface MediaItem {
    id: number;
    name: string;
    type: 'file' | 'folder';
    url?: string;
}
//export type MediaTreeType = Record<string, MediaItem[]>;
export interface MediaTreeType {
  [key: string]: MediaItem[]
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