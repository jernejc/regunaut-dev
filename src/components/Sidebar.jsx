'use client';

import React, { useState, useMemo } from 'react';
import {
    Search, ChevronDown, GripVertical, ChevronRight, Pin,
    Type, File, Zap, Link, Mic,
    Send, Bell,
    Sparkles, CheckSquare,
    FileSearch, FileText, FolderOpen, ShieldCheck, BookOpen, ClipboardList,
    GitBranch, Route, Layers, ShieldAlert,
    SearchCheck, ListChecks, FileCheck, CalendarClock,
    Calculator, Clock,
    Database, Server, FlaskConical, Microscope, Archive,
    Globe, Scale, Building2,
    Radio, Pill, BookMarked, HeartPulse, TestTubes,
    Lock, Download, Upload, BriefcaseBusiness, AppWindow, Code2, Wrench,
} from 'lucide-react';
import { cn } from '../lib/utils';

const iconMap = {
    type: Type,
    file: File,
    zap: Zap,
    link: Link,
    mic: Mic,
    send: Send,
    bell: Bell,
    sparkles: Sparkles,
    checkSquare: CheckSquare,
    fileSearch: FileSearch,
    fileText: FileText,
    folderOpen: FolderOpen,
    shieldCheck: ShieldCheck,
    bookOpen: BookOpen,
    clipboardList: ClipboardList,
    gitBranch: GitBranch,
    route: Route,
    layers: Layers,
    shieldAlert: ShieldAlert,
    searchCheck: SearchCheck,
    listChecks: ListChecks,
    fileCheck: FileCheck,
    calendarClock: CalendarClock,
    calculator: Calculator,
    clock: Clock,
    database: Database,
    server: Server,
    flask: FlaskConical,
    microscope: Microscope,
    archive: Archive,
    globe: Globe,
    scale: Scale,
    building: Building2,
    radio: Radio,
    pill: Pill,
    bookMarked: BookMarked,
    heartPulse: HeartPulse,
    testTubes: TestTubes,
    lock: Lock,
};

const groupIconMap = {
    Inputs: Download,
    Outputs: Upload,
    'Core Nodes': BriefcaseBusiness,
    'Document Intelligence': AppWindow,
    Classifiers: Code2,
    Validators: Wrench,
    Calculators: Calculator,
    'Internal Systems': Database,
    Jurisdictions: Globe,
    Connectors: Link,
};

export const nodeGroups = [
    {
        name: 'Inputs',
        category: 'general',
        color: '#64748b',
        defaultOpen: true,
        nodes: [
            { type: 'custom', label: 'Input', icon: 'type', description: 'Text or data entry point' },
            { type: 'custom', label: 'Files', icon: 'file', description: 'Upload documents' },
            {
                type: 'custom',
                label: 'Trigger',
                icon: 'zap',
                description: 'Event-based trigger',
                disallowIncoming: true,
            },
            { type: 'custom', label: 'URL', icon: 'link', description: 'Fetch from URL' },
            { type: 'custom', label: 'Audio', icon: 'mic', description: 'Audio input' },
        ],
    },
    {
        name: 'Outputs',
        category: 'general',
        color: '#64748b',
        nodes: [
            { type: 'custom', label: 'Output', icon: 'send', description: 'Display or export results' },
            { type: 'custom', label: 'Send Notification', icon: 'bell', description: 'Email or SMS alert' },
        ],
    },
    {
        name: 'Core Nodes',
        category: 'general',
        color: '#64748b',
        nodes: [
            { type: 'custom', label: 'Ask AI', icon: 'sparkles', description: 'Query an LLM for structured output' },
            { type: 'custom', label: 'Review / Approve', icon: 'checkSquare', description: 'Human-in-the-loop review step' },
        ],
    },
    {
        name: 'Document Intelligence',
        category: 'pharma',
        color: '#3b82f6',
        description: 'Nodes that already know what your documents are',
        nodes: [
            { type: 'custom', label: 'CC Form', icon: 'clipboardList', description: 'Change control form parser' },
            { type: 'custom', label: 'SmPC/PIL', icon: 'fileText', description: 'QRD template-aware parser' },
            { type: 'custom', label: 'CTD Module', icon: 'folderOpen', description: 'CTD dossier section parser' },
            { type: 'custom', label: 'PSUR/PBRER', icon: 'shieldCheck', description: 'Periodic safety report parser' },
            { type: 'custom', label: 'RMP', icon: 'bookOpen', description: 'Risk management plan parser' },
            { type: 'custom', label: 'IND/CTA', icon: 'fileSearch', description: 'Clinical trial application parser' },
        ],
    },
    {
        name: 'Classifiers',
        category: 'pharma',
        color: '#8b5cf6',
        description: 'Decision engines for regulatory decisions',
        nodes: [
            { type: 'custom', label: 'Variation Type Classifier', icon: 'gitBranch', description: 'Classify variation types per jurisdiction' },
            { type: 'custom', label: 'Submission Route Selector', icon: 'route', description: 'Determine optimal submission route' },
            { type: 'custom', label: 'Variation Grouping Optimiser', icon: 'layers', description: 'Optimise variation grouping strategy' },
            { type: 'custom', label: 'Risk Classifier', icon: 'shieldAlert', description: 'Assess and classify risk levels' },
        ],
    },
    {
        name: 'Validators',
        category: 'pharma',
        color: '#f59e0b',
        description: 'Check against regulatory rule sets',
        nodes: [
            { type: 'custom', label: 'Dossier Gap Analysis', icon: 'searchCheck', description: 'Identify gaps in submission dossier' },
            { type: 'custom', label: 'Submission Completeness', icon: 'listChecks', description: 'Verify submission package completeness' },
            { type: 'custom', label: 'SmPC Consistency', icon: 'fileCheck', description: 'Cross-check SmPC content consistency' },
            { type: 'custom', label: 'Timeline Compliance', icon: 'calendarClock', description: 'Validate regulatory timeline adherence' },
        ],
    },
    {
        name: 'Calculators',
        category: 'pharma',
        color: '#10b981',
        description: 'Pure logic — structured inputs, precise outputs',
        nodes: [
            { type: 'custom', label: 'Submission Deadline', icon: 'clock', description: 'Calculate submission deadlines' },
            { type: 'custom', label: 'Regulatory Fee Estimator', icon: 'calculator', description: 'Estimate agency fees by jurisdiction' },
        ],
    },
    {
        name: 'Internal Systems',
        category: 'coming-soon',
        color: '#94a3b8',
        nodes: [
            { label: 'Veeva Vault', icon: 'database' },
            { label: 'SAP QM / ERP', icon: 'server' },
            { label: 'QMS', icon: 'flask' },
            { label: 'LIMS', icon: 'microscope' },
            { label: 'eTMF', icon: 'archive' },
        ],
    },
    {
        name: 'Jurisdictions',
        category: 'coming-soon',
        color: '#94a3b8',
        nodes: [
            { label: 'EMA', icon: 'globe' },
            { label: 'FDA', icon: 'scale' },
            { label: 'MHRA', icon: 'building' },
        ],
    },
    {
        name: 'Connectors',
        category: 'coming-soon',
        color: '#94a3b8',
        nodes: [
            { label: 'EPAR', icon: 'radio' },
            { label: 'Drugs@FDA', icon: 'pill' },
            { label: 'WHO INN', icon: 'bookMarked' },
            { label: 'EudraVigilance', icon: 'heartPulse' },
            { label: 'ClinicalTrials.gov', icon: 'testTubes' },
        ],
    },
];

function NodeGroup({ group, searchQuery }) {
    const [open, setOpen] = useState(group.defaultOpen ?? false);
    const isComingSoon = group.category === 'coming-soon';
    const GroupIcon = groupIconMap[group.name] || Layers;

    const filteredNodes = useMemo(() => {
        if (!searchQuery) return group.nodes;
        const q = searchQuery.toLowerCase();
        return group.nodes.filter(
            (n) =>
                n.label.toLowerCase().includes(q) ||
                (n.description && n.description.toLowerCase().includes(q))
        );
    }, [group.nodes, searchQuery]);

    if (searchQuery && filteredNodes.length === 0) return null;

    const isOpen = searchQuery ? true : open;

    const onDragStart = (event, node) => {
        if (isComingSoon) return;
        const nodeData = {
            ...node,
            categoryColor: group.color,
            categoryName: group.name,
        };
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className={cn(
                'rounded-xl border border-slate-200 bg-white overflow-hidden',
                isComingSoon && 'opacity-60'
            )}
        >
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full px-3 py-2.5 hover:bg-slate-50 transition-colors group"
            >
                <div className="flex items-center gap-2.5 min-w-0">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-600 shrink-0">
                        <GroupIcon size={14} />
                    </span>
                    <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider truncate">
                        {group.name}
                    </span>
                    {isComingSoon && (
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-100 rounded px-1.5 py-0.5 uppercase tracking-wide flex items-center gap-1">
                            <Lock size={9} />
                            Soon
                        </span>
                    )}
                </div>
                <ChevronDown
                    size={14}
                    className={cn(
                        'text-slate-400 transition-transform duration-200',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>

            {isOpen && (
                <div className="space-y-1 p-2 border-t border-slate-100">
                    {filteredNodes.map((node, i) => {
                        const Icon = iconMap[node.icon] || File;
                        return (
                            <div
                                key={i}
                                className={cn(
                                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors group/item border',
                                    isComingSoon
                                        ? 'cursor-default text-slate-400 border-transparent bg-slate-50/50'
                                        : 'cursor-grab active:cursor-grabbing hover:bg-slate-50 text-slate-700 border-transparent hover:border-slate-200'
                                )}
                                draggable={!isComingSoon}
                                onDragStart={(e) => onDragStart(e, node)}
                            >
                                <Icon
                                    size={16}
                                    style={!isComingSoon ? { color: group.color } : undefined}
                                    className={cn(isComingSoon && 'text-slate-300')}
                                />
                                <span className="flex-1 truncate">{node.label}</span>
                                {!isComingSoon && (
                                    <GripVertical
                                        size={14}
                                        className="text-slate-300 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <aside
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={cn(
                'bg-white border-r border-slate-200 flex flex-col h-full shrink-0 z-10 transition-[width] duration-200 ease-out',
                isExpanded ? 'w-80' : 'w-16'
            )}
        >
            {isExpanded ? (
                <>
                    <div className="p-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 relative">
                                <Search
                                    size={14}
                                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search nodes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors placeholder:text-slate-400"
                                />
                            </div>
                            <button
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                                title="Sidebar"
                            >
                                <Pin size={15} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {nodeGroups.map((group) => (
                            <NodeGroup key={group.name} group={group} searchQuery={searchQuery} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center py-3 gap-1.5">
                    <button
                        className="w-10 h-10 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors"
                        title="Search"
                    >
                        <Search size={18} />
                    </button>
                    <div className="w-8 h-px bg-slate-200 my-1" />
                    {nodeGroups.map((group) => {
                        const GroupIcon = groupIconMap[group.name] || ChevronRight;
                        return (
                            <button
                                key={group.name}
                                className="w-10 h-10 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors"
                                title={group.name}
                            >
                                <GroupIcon size={18} />
                            </button>
                        );
                    })}
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
