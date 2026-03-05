'use client';

import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';

const formatTimestamp = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

const ACTION_TYPES = ['Run started', 'Approved', 'Escalated', 'CAPA initiated', 'Run failed'];

export const AuditTrailView = ({ auditEvents, onExport }) => {
    const [actorFilter, setActorFilter] = useState('');
    const [actionFilter, setActionFilter] = useState('');

    const filtered = auditEvents.filter((e) => {
        if (actorFilter && e.actor !== actorFilter) return false;
        if (actionFilter && e.action !== actionFilter) return false;
        return true;
    });

    const actors = [...new Set(auditEvents.map((e) => e.actor))];

    return (
        <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-600">
                    Immutable audit log — 21 CFR Part 11 / EU Annex 11 compliant. Records who, what, when, and why for all workflow events.
                </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="p-3 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                        <select
                            value={actorFilter}
                            onChange={(e) => setActorFilter(e.target.value)}
                            className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white"
                        >
                            <option value="">All actors</option>
                            {actors.map((a) => (
                                <option key={a} value={a}>
                                    {a}
                                </option>
                            ))}
                        </select>
                        <select
                            value={actionFilter}
                            onChange={(e) => setActionFilter(e.target.value)}
                            className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white"
                        >
                            <option value="">All actions</option>
                            {ACTION_TYPES.map((a) => (
                                <option key={a} value={a}>
                                    {a}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Run ID or Case ID..."
                            className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 w-40"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => onExport?.(filtered)}
                        className="h-9 px-3 bg-primary hover:opacity-90 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Export audit log
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-600">
                                <th className="px-4 py-2.5 font-medium">
                                    <span className="inline-flex items-center gap-1.5">
                                        Timestamp
                                        <ArrowUpDown size={12} />
                                    </span>
                                </th>
                                <th className="px-4 py-2.5 font-medium">Actor</th>
                                <th className="px-4 py-2.5 font-medium">Action</th>
                                <th className="px-4 py-2.5 font-medium">Entity</th>
                                <th className="px-4 py-2.5 font-medium">Details</th>
                                <th className="px-4 py-2.5 font-medium">Reason</th>
                                <th className="px-4 py-2.5 font-medium">Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                                >
                                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                                        {formatTimestamp(row.timestamp)}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{row.actor}</td>
                                    <td className="px-4 py-3 font-medium text-text">{row.action}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {row.entityType} {row.entityId}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate" title={row.details}>
                                        {row.details}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{row.reason || '—'}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
