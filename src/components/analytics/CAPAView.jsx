'use client';

import React from 'react';
import { UserPlus, ExternalLink, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { CAPAStatusChart } from './AnalyticsCharts';

const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

export const CAPAView = ({ capaItems }) => {
    const openCount = capaItems.filter((c) => c.status === 'Open').length;
    const overdueCount = capaItems.filter((c) => {
        if (!c.dueDate) return false;
        return new Date(c.dueDate) < new Date() && c.status !== 'Closed';
    }).length;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                    { title: 'Open CAPA Items', value: openCount, detail: 'Requiring corrective action' },
                    { title: 'Overdue', value: overdueCount, detail: 'Past due date' },
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

            {capaItems.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-medium text-slate-600 mb-3">CAPA by status</h3>
                    <CAPAStatusChart capaItems={capaItems} />
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
                    </div>
                    <button
                        type="button"
                        className="h-9 px-3 border border-accent text-accent rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors"
                    >
                        Link to CAPA system
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-600">
                                <th className="px-4 py-2.5 font-medium">CAPA ID</th>
                                <th className="px-4 py-2.5 font-medium">Run ID</th>
                                <th className="px-4 py-2.5 font-medium">Error Description</th>
                                <th className="px-4 py-2.5 font-medium">
                                    <span className="inline-flex items-center gap-1.5">
                                        Detected At
                                        <ArrowUpDown size={12} />
                                    </span>
                                </th>
                                <th className="px-4 py-2.5 font-medium">Status</th>
                                <th className="px-4 py-2.5 font-medium">Assigned To</th>
                                <th className="px-4 py-2.5 font-medium">Due Date</th>
                                <th className="px-4 py-2.5 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {capaItems.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                                >
                                    <td className="px-4 py-3 font-medium text-text">{row.id}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.runId}</td>
                                    <td className="px-4 py-3 text-slate-600 max-w-[280px]">
                                        {row.errorDesc}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{formatDate(row.detectedAt)}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={row.status} />
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {row.assignedTo || (
                                            <span className="text-amber-600">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{row.dueDate}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
                                                title="Assign"
                                            >
                                                <UserPlus size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
                                                title="Update status"
                                            >
                                                <ExternalLink size={14} />
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
