'use client';

import React from 'react';
import { Search, SlidersHorizontal, ChevronDown, ExternalLink, ArrowUpRight, ArrowUpDown } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { StatusBreakdownChart, RunsOverTimeChart } from './AnalyticsCharts';

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

export const RunsView = ({ runs, onViewAuditTrail }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                {[
                    {
                        title: 'Runs',
                        value: runs.length,
                        detail: `${Math.round((runs.filter((r) => r.status === 'Completed').length / runs.length) * 100)}% completed without intervention`,
                    },
                    {
                        title: 'Pending Review',
                        value: runs.filter((r) => r.status === 'Pending Review').length,
                        detail: 'Awaiting human approval',
                    },
                    {
                        title: 'Escalations',
                        value: runs.filter((r) => r.status === 'Escalated').length,
                        detail: 'Require QA or RA lead review',
                    },
                    {
                        title: 'CAPA Items',
                        value: runs.filter((r) => r.status === 'CAPA Open').length,
                        detail: 'Errors requiring follow-up',
                    },
                ].map((card) => (
                    <article
                        key={card.title}
                        className="rounded-xl border border-slate-200 bg-white min-h-32"
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-medium text-slate-600 mb-3">Runs by status</h3>
                    <StatusBreakdownChart runs={runs} />
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-medium text-slate-600 mb-3">Runs over time</h3>
                    <RunsOverTimeChart />
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="p-3 border-b border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-500 inline-flex items-center gap-1.5 bg-slate-50">
                            <Search size={14} />
                            Input(s)
                        </div>
                        <div className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-500 inline-flex items-center gap-1.5 bg-slate-50">
                            <Search size={14} />
                            Output(s)
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5"
                        >
                            <SlidersHorizontal size={14} />
                            Filters
                        </button>
                        <button
                            type="button"
                            className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5"
                        >
                            Columns
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-600">
                                <th className="px-4 py-2.5 font-medium">Run ID</th>
                                <th className="px-4 py-2.5 font-medium">Case ID</th>
                                <th className="px-4 py-2.5 font-medium">Document Type</th>
                                <th className="px-4 py-2.5 font-medium">Jurisdiction</th>
                                <th className="px-4 py-2.5 font-medium">
                                    <span className="inline-flex items-center gap-1.5">
                                        Created
                                        <ArrowUpDown size={12} />
                                    </span>
                                </th>
                                <th className="px-4 py-2.5 font-medium">
                                    <span className="inline-flex items-center gap-1.5">
                                        Status
                                        <ArrowUpDown size={12} />
                                    </span>
                                </th>
                                <th className="px-4 py-2.5 font-medium">Conf.</th>
                                <th className="px-4 py-2.5 font-medium">Last Modified By</th>
                                <th className="px-4 py-2.5 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {runs.map((row) => (
                                <tr
                                    key={row.runId}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                                >
                                    <td className="px-4 py-3 font-medium text-text">{row.runId}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {row.caseId ? (
                                            <a
                                                href="#"
                                                className="text-primary hover:underline inline-flex items-center gap-0.5"
                                            >
                                                {row.caseId}
                                                <ExternalLink size={12} />
                                            </a>
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{row.documentType}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.jurisdiction}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {formatDate(row.created)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={row.status} />
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {row.confidence != null ? `${row.confidence}%` : '—'}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 text-xs">
                                        {row.lastModifiedBy}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => onViewAuditTrail?.(row.runId)}
                                                className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors"
                                                title="View audit trail"
                                            >
                                                <ArrowUpRight size={14} />
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
