'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import {
    MoreVertical, ChevronDown,
    Type, File, Zap, Link, Mic,
    Send, Bell,
    Sparkles, CheckSquare,
    FileSearch, FileText, FolderOpen, ShieldCheck, BookOpen, ClipboardList,
    GitBranch, GitFork, Route, Layers, ShieldAlert,
    SearchCheck, ListChecks, FileCheck, CalendarClock,
    Calculator, Clock,
    Copy, Eye, EyeOff, Trash2,
    ClipboardCheck, Database,
    Mail, Smartphone, MessageSquare, Users,
    CirclePlus, Pencil, List,
} from 'lucide-react';
import { nodeConfigs } from './nodeConfigs';
import TeamsIcon from './icons/TeamsIcon';
import EmailIcon from './icons/EmailIcon';

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
    gitFork: GitFork,
    shieldAlert: ShieldAlert,
    searchCheck: SearchCheck,
    listChecks: ListChecks,
    fileCheck: FileCheck,
    calendarClock: CalendarClock,
    calculator: Calculator,
    clock: Clock,
    clipboardCheck: ClipboardCheck,
    database: Database,
    mail: Mail,
    emailBrand: EmailIcon,
    teamsBrand: TeamsIcon,
    smartphone: Smartphone,
    messageSquare: MessageSquare,
    users: Users,
    circlePlus: CirclePlus,
    pencil: Pencil,
    eye: Eye,
    list: List,
};

const FALLBACK_COLOR = '#64748b';

function resolveTagLabel(tag, value) {
    const match = tag.options.find(o => o.value === value);
    return match?.label || null;
}

const CustomNode = ({ id, data, selected }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [resultsOpen, setResultsOpen] = useState(false);
    const [stickyVisible, setStickyVisible] = useState(false);
    const menuRef = useRef(null);
    const { getNode, addNodes, deleteElements } = useReactFlow();

    const color = data.categoryColor || FALLBACK_COLOR;
    const config = nodeConfigs[data.label];
    const disallowIncoming = data.disallowIncoming || data.label === 'Trigger';

    const Icon = useMemo(() => {
        if (config?.iconOverrides) {
            const { field, map } = config.iconOverrides;
            const tag = config.canvasTags?.find(t => t.key === field);
            const value = data[field] ?? tag?.defaultValue;
            if (value && map[value]) return iconMap[map[value]] || iconMap[data.icon] || File;
        }
        return iconMap[data.icon] || File;
    }, [config, data]);

    const canvasTags = useMemo(() => {
        if (!config?.canvasTags) return [];
        return config.canvasTags.map(tag => {
            const raw = data[tag.key];
            const value = raw !== undefined ? raw : tag.defaultValue;
            const label = resolveTagLabel(tag, value);
            const isDefault = raw === undefined || raw === tag.defaultValue;
            return label ? { label, isDefault } : null;
        }).filter(Boolean);
    }, [config, data]);

    const menuItems = useMemo(() => [
        { label: 'Duplicate', icon: Copy, action: 'duplicate' },
        {
            label: stickyVisible ? 'Hide Sticky Note' : 'Show Sticky Note',
            icon: stickyVisible ? EyeOff : Eye,
            action: 'hideNote',
        },
        { type: 'divider' },
        { label: 'Delete', icon: Trash2, action: 'delete', danger: true },
    ], [stickyVisible]);

    useEffect(() => {
        if (!menuOpen) return;
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler, true);
        return () => document.removeEventListener('mousedown', handler, true);
    }, [menuOpen]);

    const handleMenuAction = (action) => (e) => {
        e.stopPropagation();
        setMenuOpen(false);
        switch (action) {
            case 'delete':
                deleteElements({ nodes: [{ id }] });
                break;
            case 'duplicate': {
                const node = getNode(id);
                if (!node) return;
                addNodes({
                    ...node,
                    id: `dndnode_${Date.now()}`,
                    position: { x: node.position.x + 50, y: node.position.y + 50 },
                    data: { ...node.data },
                    selected: false,
                });
                break;
            }
            case 'hideNote':
                setStickyVisible(v => !v);
                break;
        }
    };

    return (
        <div className="relative w-72">
            {/* Sticky note above the card */}
            {stickyVisible && (
                <div
                    className="absolute bottom-full left-0 right-0 mb-2 px-4 py-2.5 rounded-lg border border-l-[3px]"
                    style={{
                        backgroundColor: `${color}08`,
                        borderColor: `${color}20`,
                        borderLeftColor: color,
                    }}
                >
                    <h4 className="text-xs font-bold text-slate-700">
                        {data.label}
                    </h4>
                    {(() => {
                        const activeConfigs = canvasTags.filter(t => !t.isDefault);
                        if (activeConfigs.length > 0) {
                            return (
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                                    {activeConfigs.map(t => t.label).join(' · ')}
                                </p>
                            );
                        }
                        if (config?.subtitle || data.description) {
                            return (
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                                    {config?.subtitle || data.description}
                                </p>
                            );
                        }
                        return null;
                    })()}
                </div>
            )}

            {/* Main node card */}
            <div className={`bg-white rounded-xl shadow-sm border transition-all duration-150 hover:shadow-md ${
                selected ? 'border-primary shadow-md ring-2 ring-primary/10' : 'border-slate-200'
            }`}>
                {/* Header */}
                <div className="px-4 pt-3.5 pb-2">
                    <div className="flex items-center gap-2.5">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                        >
                            {data.label === 'Regunaut API' ? (
                                <img src="/regunaut_logo.jpeg" alt="Regunaut" className="w-6 h-6 object-contain" />
                            ) : (
                                <Icon size={24} style={{ color }} />
                            )}
                        </div>
                        <h3 className="flex-1 min-w-0 text-sm font-semibold text-slate-900 truncate">
                            {data.label}
                        </h3>
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <MoreVertical size={16} />
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
                                    {menuItems.map((item, i) => {
                                        if (item.type === 'divider') {
                                            return <div key={i} className="h-px bg-slate-100 my-1" />;
                                        }
                                        const ItemIcon = item.icon;
                                        return (
                                            <button
                                                key={i}
                                                onClick={handleMenuAction(item.action)}
                                                className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors ${
                                                    item.danger
                                                        ? 'text-red-500 hover:bg-red-50'
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <ItemIcon size={15} />
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                {data.description && (
                    <div className="px-4 pb-2">
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {data.description}
                        </p>
                    </div>
                )}

                {canvasTags.length > 0 && (
                    <div className="px-4 pb-3">
                        <p className="text-xs leading-relaxed">
                            {canvasTags.map((tag, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <span className="text-slate-300 mx-1.5">·</span>}
                                    <span className={tag.isDefault ? 'text-slate-400' : 'text-slate-600 font-medium'}>
                                        {tag.label}
                                    </span>
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                )}

                {/* View Results */}
                <div className="border-t border-slate-100">
                    <button
                        onClick={(e) => { e.stopPropagation(); setResultsOpen(!resultsOpen); }}
                        className="flex items-center gap-1.5 w-full px-4 py-2 text-xs text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <ChevronDown
                            size={12}
                            className={`transition-transform duration-200 ${resultsOpen ? '' : '-rotate-90'}`}
                        />
                        <span>View Results</span>
                        <span className="ml-auto text-[10px] text-slate-400 tabular-nums">
                            0.00 sec
                        </span>
                    </button>
                    {resultsOpen && (
                        <div className="px-4 pb-3">
                            <p className="text-[11px] text-slate-400 italic">Run this node to see results</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Connection handles */}
            {(() => {
                const multiTargets = config?.handles?.targets;
                if (multiTargets) {
                    const count = multiTargets.length;
                    return multiTargets.map((h, i) => (
                        <React.Fragment key={h.id}>
                            <Handle
                                type="target"
                                position={Position.Left}
                                id={h.id}
                                style={{ top: `${((i + 1) / (count + 1)) * 100}%` }}
                                className="handle-plus !w-5 !h-5 !bg-white !border !border-slate-200 !-left-2.5 !rounded-full !shadow-sm"
                            />
                            <span
                                className="absolute text-[9px] font-semibold text-slate-400 pointer-events-none select-none"
                                style={{ left: 12, top: `calc(${((i + 1) / (count + 1)) * 100}% - 7px)` }}
                            >
                                {h.label}
                            </span>
                        </React.Fragment>
                    ));
                }
                if (!disallowIncoming) {
                    return (
                        <Handle
                            type="target"
                            position={Position.Left}
                            className="handle-plus !w-5 !h-5 !bg-white !border !border-slate-200 !-left-2.5 !rounded-full !shadow-sm"
                        />
                    );
                }
                return null;
            })()}
            {(() => {
                const multiSources = config?.handles?.sources;
                if (multiSources) {
                    const count = multiSources.length;
                    return multiSources.map((h, i) => (
                        <React.Fragment key={h.id}>
                            <Handle
                                type="source"
                                position={Position.Right}
                                id={h.id}
                                style={{ top: `${((i + 1) / (count + 1)) * 100}%` }}
                                className="handle-plus !w-5 !h-5 !bg-white !border !border-slate-200 !-right-2.5 !rounded-full !shadow-sm"
                            />
                            <span
                                className="absolute text-[9px] font-semibold text-slate-400 pointer-events-none select-none right-3"
                                style={{ top: `calc(${((i + 1) / (count + 1)) * 100}% - 7px)` }}
                            >
                                {h.label}
                            </span>
                        </React.Fragment>
                    ));
                }
                return (
                    <Handle
                        type="source"
                        position={Position.Right}
                        className="handle-plus !w-5 !h-5 !bg-white !border !border-slate-200 !-right-2.5 !rounded-full !shadow-sm"
                    />
                );
            })()}
        </div>
    );
};

export default CustomNode;
