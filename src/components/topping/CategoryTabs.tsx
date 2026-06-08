interface Props {
  selected: string;
  onChange: (value: string) => void;
}

const categories = [
  "kid",
  "game",
  "sport",
  "wedding",
  "meme",
  "cartoon",
];

export default function CategoryTabs({
  selected,
  onChange,
}: Props) {
  return (
    <div className="d-flex gap-2 flex-wrap mb-3">

      {categories.map((item) => (
        <button
          key={item}
          className={`btn ${
            selected === item
              ? "btn-warning"
              : "btn-outline-secondary"
          }`}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}

    </div>
  );
}