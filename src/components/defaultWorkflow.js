// Default CC Change Control workflow — 16 nodes, implicit branching.

const EDGE_STYLE = { stroke: '#94a3b8', strokeWidth: 2.5 };

function edge(id, source, target, opts = {}) {
    return {
        id,
        source,
        target,
        type: 'smoothstep',
        style: EDGE_STYLE,
        markerEnd: undefined,
        ...opts,
    };
}

function node(id, label, icon, categoryColor, categoryName, position, extra = {}) {
    return {
        id,
        type: 'custom',
        position,
        data: { type: 'custom', label, icon, categoryColor, categoryName, description: extra.description || '', ...extra },
    };
}

const INPUT  = { color: '#64748b', name: 'Inputs' };
const OUTPUT = { color: '#64748b', name: 'Outputs' };
const CORE   = { color: '#64748b', name: 'Core Nodes' };
const LOGIC  = { color: '#06b6d4', name: 'Logic' };
const DOCINT = { color: '#3b82f6', name: 'Document Intelligence' };
const CLASS  = { color: '#8b5cf6', name: 'Classifiers' };
const CALC   = { color: '#10b981', name: 'Calculators' };

// ──────────────────────────────────────────────
// PHASE 1: INGEST (2 nodes)
// ──────────────────────────────────────────────

const n1_trigger = node('n1', 'Trigger', 'zap', INPUT.color, INPUT.name,
    { x: 0, y: 300 },
    { description: 'Email Monitor — shared RA mailbox', disallowIncoming: true },
);

const n2_replyReject = node('n2', 'Send Notification', 'bell', OUTPUT.color, OUTPUT.name,
    { x: 450, y: 500 },
    { description: 'Reply: resubmit with PDF attachment', channel: 'email' },
);

// ──────────────────────────────────────────────
// PHASE 2: EXTRACT & CLASSIFY (4 nodes)
// ──────────────────────────────────────────────

const n3_ccForm = node('n3', 'CC Form', 'clipboardList', DOCINT.color, DOCINT.name,
    { x: 450, y: 200 },
    { description: 'Extract change description, impact, products, date, confidence' },
);

const n4_emailRaLead = node('n4', 'Send Notification', 'bell', OUTPUT.color, OUTPUT.name,
    { x: 900, y: 50 },
    { description: 'Email RA Lead: manual review form — await response', channel: 'email' },
);

const n5_varClassifier = node('n5', 'Variation Type Classifier', 'gitBranch', CLASS.color, CLASS.name,
    { x: 1350, y: 200 },
    { description: 'Classify variation type, regulatory basis, approval, deadline' },
);

const n6_createCase = node('n6', 'Regunaut API', 'database', CORE.color, CORE.name,
    { x: 1800, y: 200 },
    { description: 'CREATE Case Record (project plan) — case_id returned', operation: 'create' },
);

// ──────────────────────────────────────────────
// PHASE 3: ROUTE & ASSIGN — Switch + 3 branches
// ──────────────────────────────────────────────

const n7_switch = node('n7', 'Switch', 'route', LOGIC.color, LOGIC.name,
    { x: 2250, y: 200 },
    { description: 'Route tasks by department: RA, CMC, Other' },
);

// RA branch (3 nodes)
const n8_deadlineRA = node('n8', 'Submission Deadline', 'clock', CALC.color, CALC.name,
    { x: 2700, y: -50 },
    { description: 'Calculate RA submission deadlines' },
);

const n9_updateRA = node('n9', 'Regunaut API', 'database', CORE.color, CORE.name,
    { x: 3150, y: -50 },
    { description: 'UPDATE Case: RA tasks + deadlines', operation: 'update' },
);

const n10_teamsRA = node('n10', 'Send Notification', 'bell', OUTPUT.color, OUTPUT.name,
    { x: 3600, y: -50 },
    { description: 'Teams → RA channel notification', channel: 'teams' },
);

// CMC branch (4 nodes)
const n11_deadlineCMC = node('n11', 'Submission Deadline', 'clock', CALC.color, CALC.name,
    { x: 2700, y: 200 },
    { description: 'Calculate CMC submission deadlines' },
);

const n12_ctdChecklist = node('n12', 'CTD Checklist Generator', 'clipboardCheck', DOCINT.color, DOCINT.name,
    { x: 3150, y: 200 },
    { description: 'Generate CTD document checklist for CMC' },
);

const n13_updateCMC = node('n13', 'Regunaut API', 'database', CORE.color, CORE.name,
    { x: 3600, y: 200 },
    { description: 'UPDATE Case: CMC tasks + CTD checklist', operation: 'update' },
);

const n14_teamsCMC = node('n14', 'Send Notification', 'bell', OUTPUT.color, OUTPUT.name,
    { x: 4050, y: 200 },
    { description: 'Teams → CMC channel notification', channel: 'teams' },
);

// Other depts branch (2 nodes)
const n15_emailDepts = node('n15', 'Send Notification', 'bell', OUTPUT.color, OUTPUT.name,
    { x: 2700, y: 480 },
    { description: 'Email each dept: tasks + deadlines — await 48h', channel: 'email' },
);

const n16_escalation = node('n16', 'Send Notification', 'bell', OUTPUT.color, OUTPUT.name,
    { x: 3150, y: 620 },
    { description: 'Escalation email to RA Lead', channel: 'email' },
);

// ──────────────────────────────────────────────
// FINAL (1 node)
// ──────────────────────────────────────────────

const n17_confirmEmail = node('n17', 'Send Notification', 'bell', OUTPUT.color, OUTPUT.name,
    { x: 4500, y: 200 },
    { description: 'Email CC sender: case confirmed, link to Regunaut dashboard', channel: 'email' },
);

// ──────────────────────────────────────────────
// Export
// ──────────────────────────────────────────────

export const defaultNodes = [
    n1_trigger, n2_replyReject,
    n3_ccForm, n4_emailRaLead, n5_varClassifier, n6_createCase,
    n7_switch,
    n8_deadlineRA, n9_updateRA, n10_teamsRA,
    n11_deadlineCMC, n12_ctdChecklist, n13_updateCMC, n14_teamsCMC,
    n15_emailDepts, n16_escalation,
    n17_confirmEmail,
];

export const defaultEdges = [
    // Phase 1: Ingest — Trigger validates, routes accepted/rejected
    edge('e1-2', 'n1', 'n2', { sourceHandle: 'rejected', label: 'Rejected' }),
    edge('e1-3', 'n1', 'n3', { sourceHandle: 'accepted', label: 'Accepted' }),

    // Phase 2: Extract & Classify — CC Form routes passed/review
    edge('e3-4', 'n3', 'n4', { sourceHandle: 'review',  label: 'Review' }),
    edge('e3-5', 'n3', 'n5', { sourceHandle: 'passed',  label: 'Passed' }),
    edge('e4-5', 'n4', 'n5', { sourceHandle: 'done',    label: 'Done' }),
    edge('e5-6', 'n5', 'n6'),
    edge('e6-7', 'n6', 'n7'),

    // Phase 3: Switch routes by department
    edge('e7-8',  'n7', 'n8',  { sourceHandle: 'case-1', label: 'RA' }),
    edge('e7-11', 'n7', 'n11', { sourceHandle: 'case-2', label: 'CMC' }),
    edge('e7-15', 'n7', 'n15', { sourceHandle: 'case-3', label: 'Other' }),

    // RA branch
    edge('e8-9',   'n8',  'n9'),
    edge('e9-10',  'n9',  'n10'),
    edge('e10-17', 'n10', 'n17', { sourceHandle: 'done' }),

    // CMC branch
    edge('e11-12', 'n11', 'n12'),
    edge('e12-13', 'n12', 'n13'),
    edge('e13-14', 'n13', 'n14'),
    edge('e14-17', 'n14', 'n17', { sourceHandle: 'done' }),

    // Other depts branch — await response with escalation on timeout
    edge('e15-16', 'n15', 'n16', { sourceHandle: 'timedOut', label: 'Timed Out' }),
    edge('e15-17', 'n15', 'n17', { sourceHandle: 'done',    label: 'Done' }),
];
