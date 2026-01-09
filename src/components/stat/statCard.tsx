type StatCardProps = {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
    borderColor?: string;
};

export function StatCard({
    title,
    value,
    icon,
    iconBg,
    borderColor,
}: StatCardProps) {
    return (
        <div
        className="card h-100"
        style={{
            borderBottom: borderColor ? `3px solid ${borderColor}` : undefined,
        }}
        >
        <div className="card-body d-flex align-items-center gap-3">
            <div
            className="d-flex align-items-center justify-content-center rounded"
            style={{
                width: 42,
                height: 42,
                backgroundColor: iconBg,
                color: '#fff',
            }}
            >
            {icon}
            </div>

            <div>
            <div className="text-muted small">{title}</div>
            <h4 className="mb-0">{value}</h4>
            </div>
        </div>
        </div>
    );
}
