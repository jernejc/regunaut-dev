/**
 * Export utilities for Analytics — Flow Report and Audit Log (21 CFR Part 11 friendly)
 */
/* global Blob */

export const exportAuditLog = (auditEvents, format = 'csv') => {
    if (format === 'json') {
        const blob = new Blob([JSON.stringify(auditEvents, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        return;
    }

    // CSV format
    const headers = ['Timestamp', 'Actor', 'Action', 'Entity Type', 'Entity ID', 'Details', 'Reason', 'Source'];
    const rows = auditEvents.map((e) => [
        e.timestamp,
        e.actor,
        e.action,
        e.entityType,
        e.entityId,
        `"${(e.details || '').replace(/"/g, '""')}"`,
        e.reason || '',
        e.source,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
};

export const exportFlowReport = (runs, workflowName = 'Untitled Workflow') => {
    const report = {
        generatedAt: new Date().toISOString(),
        workflow: workflowName,
        summary: {
            totalRuns: runs.length,
            completed: runs.filter((r) => r.status === 'Completed').length,
            pendingReview: runs.filter((r) => r.status === 'Pending Review').length,
            escalated: runs.filter((r) => r.status === 'Escalated').length,
            failed: runs.filter((r) => r.status === 'Failed').length,
            capaOpen: runs.filter((r) => r.status === 'CAPA Open').length,
        },
        runs: runs.map((r) => ({
            runId: r.runId,
            caseId: r.caseId,
            status: r.status,
            documentType: r.documentType,
            jurisdiction: r.jurisdiction,
            created: r.created,
            lastModifiedBy: r.lastModifiedBy,
        })),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
        type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flow-report-${workflowName.replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
};
