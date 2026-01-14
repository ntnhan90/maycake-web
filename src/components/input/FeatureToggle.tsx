'use client';

import { Controller, Control } from 'react-hook-form';

interface FeatureToggleProps {
    control: Control<any>;
    name: string;
    label?: string;
    disabled?: boolean;
}

export default function FeatureToggle({
    control,
    name,
    label = 'Is featured?',
    disabled = false,
}: FeatureToggleProps) {
    return (
        <Controller
        control={control}
        name={name}
        render={({ field }) => {
            const checked = field.value === 1;

            return (
            <label
                style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: disabled ? 'not-allowed' : 'pointer',
                }}
            >
                <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) =>
                    field.onChange(e.target.checked ? 1 : 0)
                }
                style={{ display: 'none' }}
                />

                {/* switch */}
                <span
                style={{
                    width: 42,
                    height: 22,
                    background: checked ? '#2563eb' : '#d1d5db',
                    borderRadius: 999,
                    position: 'relative',
                    transition: '0.2s',
                }}
                >
                <span
                    style={{
                    width: 18,
                    height: 18,
                    background: '#fff',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 2,
                    left: checked ? 22 : 2,
                    transition: '0.2s',
                    }}
                />
                </span>

                {label && <span>{label}</span>}
            </label>
            );
        }}
        />
    );
}
