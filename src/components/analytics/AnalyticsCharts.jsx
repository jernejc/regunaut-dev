'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export const StatusBreakdownChart = ({ runs }) => {
    const byStatus = runs.reduce((acc, r) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
    }, {});
    const data = Object.entries(byStatus).map(([name, value]) => ({ name, value }));

    return (
        <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ fontSize: 12, borderRadius: 8 }}
                        formatter={(value) => [value, 'Runs']}
                    />
                    <Bar dataKey="value" fill="#5271FF" radius={[4, 4, 0, 0]} name="Runs" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// Mock daily run counts for the last 7 days
const DAILY_RUNS = [
    { date: 'Feb 28', runs: 14, completed: 12 },
    { date: 'Mar 1', runs: 18, completed: 16 },
    { date: 'Mar 2', runs: 22, completed: 19 },
    { date: 'Mar 3', runs: 19, completed: 17 },
    { date: 'Mar 4', runs: 24, completed: 20 },
];

export const RunsOverTimeChart = () => {
    return (
        <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DAILY_RUNS} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ fontSize: 12, borderRadius: 8 }}
                        formatter={(value, name) => [value, name === 'runs' ? 'Total' : 'Completed']}
                    />
                    <Bar dataKey="runs" fill="#94a3b8" radius={[4, 4, 0, 0]} name="runs" />
                    <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="completed" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const EscalationReasonsChart = ({ escalations }) => {
    const byReason = escalations.reduce((acc, e) => {
        acc[e.reason] = (acc[e.reason] || 0) + 1;
        return acc;
    }, {});
    const data = Object.entries(byReason).map(([name, value]) => ({ name, value }));

    if (data.length === 0) return null;

    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" allowDecimals={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} name="Count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const CAPAStatusChart = ({ capaItems }) => {
    const byStatus = capaItems.reduce((acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1;
        return acc;
    }, {});
    const data = Object.entries(byStatus).map(([name, value]) => ({ name, value }));

    if (data.length === 0) return null;

    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" allowDecimals={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Bar dataKey="value" fill="var(--color-accent)" radius={[4, 4, 0, 0]} name="Count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
