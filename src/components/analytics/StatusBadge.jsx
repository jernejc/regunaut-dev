'use client';

import React from 'react';
import { FileWarning } from 'lucide-react';

const statusConfig = {
    Completed: { class: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: null },
    'Pending Review': { class: 'bg-amber-50 text-amber-700 border-amber-200', icon: null },
    Escalated: { class: 'bg-orange-50 text-orange-700 border-orange-200', icon: null },
    Failed: { class: 'bg-red-50 text-red-700 border-red-200', icon: null },
    'CAPA Open': { class: 'bg-red-50 text-red-700 border-red-200', icon: FileWarning },
    Open: { class: 'bg-amber-50 text-amber-700 border-amber-200', icon: null },
    'In progress': { class: 'bg-blue-50 text-blue-700 border-blue-200', icon: null },
    Closed: { class: 'bg-slate-100 text-slate-600 border-slate-200', icon: null },
};

export const StatusBadge = ({ status, size = 'default' }) => {
    const config = statusConfig[status] || {
        class: 'bg-slate-100 text-slate-600 border-slate-200',
        icon: null,
    };
    const Icon = config.icon;
    const sizeClass = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs';

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full font-medium border ${config.class} ${sizeClass}`}
        >
            {Icon && <Icon size={size === 'sm' ? 10 : 12} className="shrink-0" />}
            {status}
        </span>
    );
};
