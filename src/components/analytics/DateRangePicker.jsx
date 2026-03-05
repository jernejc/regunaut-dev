'use client';

import React, { useState } from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';

const PRESETS = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 14 days', value: '14d' },
    { label: 'Last 30 days', value: '30d' },
];

export const DateRangePicker = ({ value = '7d', onChange, displayRange = 'Feb 26, 2026 - Mar 04, 2026' }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="h-9 px-3 border border-slate-200 bg-white rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5"
                >
                    {PRESETS.find((p) => p.value === value)?.label || 'Last 7 days'}
                    <ChevronDown size={14} className={open ? 'rotate-180' : ''} />
                </button>
                <button
                    type="button"
                    className="h-9 px-3 border border-slate-200 bg-white rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5"
                >
                    <CalendarDays size={14} />
                    {displayRange}
                </button>
            </div>
            {open && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute top-full left-0 mt-1 z-20 py-1 bg-white border border-slate-200 rounded-lg shadow-lg min-w-[140px]">
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.value}
                                type="button"
                                onClick={() => {
                                    onChange?.(preset.value);
                                    setOpen(false);
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                                    value === preset.value ? 'bg-slate-50 font-medium' : ''
                                }`}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
