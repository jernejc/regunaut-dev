'use client';

import React, { useState } from 'react';
import { DateRangePicker } from './analytics/DateRangePicker';
import { AnalyticsTabs } from './analytics/AnalyticsTabs';
import { RunsView } from './analytics/RunsView';
import { EscalationsView } from './analytics/EscalationsView';
import { AuditTrailView } from './analytics/AuditTrailView';
import { CAPAView } from './analytics/CAPAView';

const AnalyticsDashboard = ({
    runs = [],
    escalations = [],
    auditEvents = [],
    capaItems = [],
    onInitiateCAPA,
    onExportAuditLog,
}) => {
    const [activeSubTab, setActiveSubTab] = useState('runs');
    const [dateRange, setDateRange] = useState('7d');

    return (
        <section className="flex-1 min-h-0 overflow-auto bg-slate-50 p-6 flex flex-col">
            <div className="w-full flex-1 flex flex-col min-w-0">
                <div className="flex items-center justify-between gap-3 mb-4">
                    <DateRangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        displayRange="Feb 26, 2026 - Mar 04, 2026"
                    />
                </div>

                <div className="flex-1 flex flex-col min-h-0 border border-slate-200 rounded-xl bg-white overflow-hidden">
                    <AnalyticsTabs activeTab={activeSubTab} onTabChange={setActiveSubTab} />
                    <div className="flex-1 overflow-auto p-6 bg-slate-50">
                        {activeSubTab === 'runs' && (
                            <RunsView
                                runs={runs}
                                onViewAuditTrail={() => setActiveSubTab('audit')}
                            />
                        )}
                        {activeSubTab === 'escalations' && (
                            <EscalationsView
                                escalations={escalations}
                                onInitiateCAPA={onInitiateCAPA}
                            />
                        )}
                        {activeSubTab === 'audit' && (
                            <AuditTrailView
                                auditEvents={auditEvents}
                                onExport={onExportAuditLog}
                            />
                        )}
                        {activeSubTab === 'capa' && <CAPAView capaItems={capaItems} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsDashboard;
