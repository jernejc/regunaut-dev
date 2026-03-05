'use client';

import React from 'react';
import { Activity, AlertTriangle, FileCheck, FileWarning } from 'lucide-react';
import { cn } from '../../lib/utils';

const TABS = [
    { id: 'runs', label: 'Runs', icon: Activity },
    { id: 'escalations', label: 'Escalations', icon: AlertTriangle },
    { id: 'audit', label: 'Audit Trail', icon: FileCheck },
    { id: 'capa', label: 'CAPA', icon: FileWarning },
];

export const AnalyticsTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex items-center gap-1 border-b border-slate-200 bg-white px-1">
            {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            'px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors inline-flex items-center gap-2 -mb-px',
                            activeTab === tab.id
                                ? 'bg-slate-50 text-text border border-slate-200 border-b-white'
                                : 'text-slate-500 hover:text-text hover:bg-slate-50/50'
                        )}
                    >
                        <Icon size={16} />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};
