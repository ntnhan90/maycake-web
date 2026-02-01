type SearchInputProps = {
    value?: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function SearchInput({
    value = "",
    onChange,
    placeholder = "Search...",
}: SearchInputProps) {
    return (
        <input
        className="form-control mb-3"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
    )
}
