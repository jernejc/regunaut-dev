'use client';

import React, { useState } from 'react';
import {
    UserPlus,
    Eye,
    Check,
    X,
    ArrowUpRight,
    FileWarning,
    ChevronDown,
    SlidersHorizontal,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { EscalationReasonsChart } from './AnalyticsCharts';

const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const EscalationsView = ({ escalations, onInitiateCAPA }) => {
    const [assigningId, setAssigningId] = useState(null);

    const openCount = escalations.filter((e) => e.status === 'Open').length;
    const overdueCount = escalations.filter((e) => e.overdue).length;
    const resolvedToday = 0; // mock

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: 'Open Escalations', value: openCount, detail: 'Awaiting action' },
                    { title: 'Overdue', value: overdueCount, detail: '>24h without response' },
                    { title: 'Resolved Today', value: resolvedToday, detail: 'Closed in last 24h' },
                ].map((card) => (
                    <article
                        key={card.title}
                        className="rounded-xl border border-slate-200 bg-white min-h-28"
                    >
                        <div className="border-b border-slate-200 px-4 py-2.5 text-sm text-slate-600">
                            {card.title}
                        </div>
                        <div className="px-4 py-4">
                            <div className="text-2xl font-semibold text-text">{card.value}</div>
                            <p className="mt-1 text-xs text-slate-500">{card.detail}</p>
                        </div>
                    </article>
                ))}
            </div>

            {escalations.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <h3 className="text-sm font-medium text-slate-600 mb-4">Escalations by reason</h3>
                    <EscalationReasonsChart escalations={escalations} />
                </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="p-3 border-b border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5"
                        >
                            <SlidersHorizontal size={14} />
                            Filters
                        </button>
                        <select className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white">
                            <option>All reasons</option>
                            <option>Low confidence</option>
                            <option>Risk flag</option>
                            <option>Timeout</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-600">
                                <th className="px-4 py-2.5 font-medium">Run ID</th>
                                <th className="px-4 py-2.5 font-medium">Case ID</th>
                                <th className="px-4 py-2.5 font-medium">Document Type</th>
                                <th className="px-4 py-2.5 font-medium">Reason</th>
                                <th className="px-4 py-2.5 font-medium">Escalated At</th>
                                <th className="px-4 py-2.5 font-medium">Assigned To</th>
                                <th className="px-4 py-2.5 font-medium">Status</th>
                                <th className="px-4 py-2.5 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {escalations.map((row) => (
                                <tr
                                    key={row.id}
                                    className={`border-b border-slate-100 last:border-0 hover:bg-slate-50/50 ${
                                        row.overdue ? 'bg-amber-50/30' : ''
                                    }`}
                                >
                                    <td className="px-4 py-3 font-medium text-text">{row.runId}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.caseId}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.documentType}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.reason}</td>
                                    <td className="px-4 py-3 text-slate-600">{formatDate(row.escalatedAt)}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {row.assignedTo || (
                                            <span className="text-amber-600">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={row.status} />
                                        {row.overdue && (
                                            <span className="ml-1 text-xs text-amber-600">Overdue</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <button
                                                type="button"
                                                className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
                                                title="Assign"
                                                onClick={() => setAssigningId(assigningId === row.id ? null : row.id)}
                                            >
                                                <UserPlus size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
                                                title="View context"
                                            >
                                                <Eye size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                                title="Approve"
                                            >
                                                <Check size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Reject"
                                            >
                                                <X size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
                                                title="Escalate further"
                                            >
                                                <ArrowUpRight size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onInitiateCAPA?.(row)}
                                                className="p-1.5 text-accent hover:bg-accent/10 rounded transition-colors"
                                                title="Initiate CAPA"
                                            >
                                                <FileWarning size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
