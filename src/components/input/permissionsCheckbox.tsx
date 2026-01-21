import { useState, useEffect } from "react";
import { useGetPermissionsListQuery } from "@/queries/useRole";

interface Props {
  selected: number[];
  onChange: (ids: number[]) => void;
}

export function PermissionCheckboxes({ selected, onChange }: Props) {
    const permissionData = useGetPermissionsListQuery();
    const data = permissionData.data?.payload.data ?? []
    console.log(data)
   // const [permissions, setPermissions] = useState<Permission[]>([]);
    const toggle = (id: number) => {
        onChange(
        selected.includes(id)
            ? selected.filter(p => p !== id)
            : [...selected, id]
        );
    };
    {/**
    
      {permissions.map(p => (
            <label key={p.id}>
            <input
                type="checkbox"
                checked={selected.includes(p.id)}
                onChange={() => toggle(p.id)}
            />
            {p.name}
            </label>
        ))}
            */}
    return (
        <div>
            
      
        </div>
    );
}
