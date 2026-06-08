'use client';

type Attribute = {
  id: number;
  title: string;
  price: number;
};

type Props = {
  value?: number;
  options?: Attribute[]; // 👈 quan trọng: optional
  onChange?: (id: number) => void;
};

export default function AttributeSelect({
  value,
  options = [], // 👈 fallback chống crash
  onChange,
}: Props) {
  return (
    <select
      className="form-select form-select-sm"
      value={value ?? ''}
      onChange={(e) => onChange?.(Number(e.target.value))}
    >
      {options.map((a) => (
        <option key={a.id} value={a.id}>
          {a.title} (+${a.price})
        </option>
      ))}
    </select>
  );
}