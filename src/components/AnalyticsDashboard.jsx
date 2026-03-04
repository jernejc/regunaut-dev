'use client';

import React from 'react';
import {
    CalendarDays,
    ChevronDown,
    CircleAlert,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
} from 'lucide-react';

const kpiCards = [
    { title: 'Runs', value: 128, detail: '97% completed without intervention' },
    { title: 'Users', value: 24, detail: '12 active in last 24h' },
    { title: 'Errors', value: 5, detail: '2 require CAPA follow-up' },
    { title: 'Tokens', value: '2.34M', detail: 'Up 8.3% vs prior 7 days' },
];

const tableRows = [
    {
        runId: 'RUN-2026-0304-011',
        conversationId: 'CNV-8Q2H7K',
        created: 'Mar 4, 2026 21:42',
        status: 'Completed',
        inputs: 'SOP extraction + policy check',
        outputs: 'Compliant summary generated',
        latency: '2.1s',
    },
    {
        runId: 'RUN-2026-0304-010',
        conversationId: 'CNV-8Q2F4M',
        created: 'Mar 4, 2026 20:31',
        status: 'Review needed',
        inputs: 'Batch deviation notes',
        outputs: 'Risk flags: sterility + traceability',
        latency: '3.4s',
    },
    {
        runId: 'RUN-2026-0304-009',
        conversationId: 'CNV-8Q1Z9D',
        created: 'Mar 4, 2026 19:05',
        status: 'Completed',
        inputs: 'Change control packet',
        outputs: 'Audit trail and rationale exported',
        latency: '1.9s',
    },
    {
        runId: 'RUN-2026-0304-008',
        conversationId: 'CNV-8Q1V3P',
        created: 'Mar 4, 2026 17:54',
        status: 'Failed',
        inputs: 'Validation protocol draft',
        outputs: 'Model timeout on attachment parsing',
        latency: '5.8s',
    },
];

const statusClasses = {
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Review needed': 'bg-amber-50 text-amber-700 border-amber-200',
    Failed: 'bg-red-50 text-red-700 border-red-200',
};

const AnalyticsDashboard = () => {
    return (
        <section className="flex-1 min-h-0 overflow-auto bg-slate-50 p-3">
            <div className="max-w-[1400px] mx-auto space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <button className="h-9 px-3 border border-slate-200 bg-white rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5">
                            Last 7 days
                            <ChevronDown size={14} />
                        </button>
                        <button className="h-9 px-3 border border-slate-200 bg-white rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            Feb 26, 2026 - Mar 04, 2026
                        </button>
                    </div>
                    <div className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                        <CircleAlert size={14} />
                        Visibility-first audit dashboard with mock data
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                    {kpiCards.map((card) => (
                        <article key={card.title} className="rounded-xl border border-slate-200 bg-white min-h-32">
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
                            <button className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5">
                                <SlidersHorizontal size={14} />
                                Filters
                            </button>
                            <button className="h-9 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5">
                                Columns
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[920px] text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-600">
                                    <th className="px-4 py-2.5 font-medium">Run ID</th>
                                    <th className="px-4 py-2.5 font-medium">Conversation ID</th>
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
                                    <th className="px-4 py-2.5 font-medium">Input(s)</th>
                                    <th className="px-4 py-2.5 font-medium">Output(s)</th>
                                    <th className="px-4 py-2.5 font-medium">
                                        <span className="inline-flex items-center gap-1.5">
                                            Latency
                                            <ArrowUpDown size={12} />
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row) => (
                                    <tr key={row.runId} className="border-b border-slate-100 last:border-0">
                                        <td className="px-4 py-3 font-medium text-text">{row.runId}</td>
                                        <td className="px-4 py-3 text-slate-600">{row.conversationId}</td>
                                        <td className="px-4 py-3 text-slate-600">{row.created}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium border ${statusClasses[row.status]}`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">{row.inputs}</td>
                                        <td className="px-4 py-3 text-slate-600">{row.outputs}</td>
                                        <td className="px-4 py-3 text-slate-600">{row.latency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsDashboard;
