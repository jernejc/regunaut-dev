'use client';

import React from 'react';
import {
    X, MoreVertical, ChevronDown, ChevronRight, Upload,
    Type, File, Zap, Link, Mic,
    Send, Bell,
    Sparkles, CheckSquare,
    FileSearch, FileText, FolderOpen, ShieldCheck, BookOpen, ClipboardList,
    GitBranch, Route, Layers, ShieldAlert,
    SearchCheck, ListChecks, FileCheck, CalendarClock,
    Calculator, Clock,
    Link2, ArrowDownToLine, Settings, ArrowUpFromLine, TriangleAlert, History,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { nodeConfigs } from './nodeConfigs';

function labelToKey(label) {
    return label
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .trim()
        .split(/\s+/)
        .map((w, i) => {
            const lower = w.toLowerCase();
            return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

const iconMap = {
    type: Type, file: File, zap: Zap, link: Link, mic: Mic,
    send: Send, bell: Bell, sparkles: Sparkles, checkSquare: CheckSquare,
    fileSearch: FileSearch, fileText: FileText, folderOpen: FolderOpen,
    shieldCheck: ShieldCheck, bookOpen: BookOpen, clipboardList: ClipboardList,
    gitBranch: GitBranch, route: Route, layers: Layers, shieldAlert: ShieldAlert,
    searchCheck: SearchCheck, listChecks: ListChecks, fileCheck: FileCheck,
    calendarClock: CalendarClock, calculator: Calculator, clock: Clock,
};

// ---------------------------------------------------------------------------
// Field components
// ---------------------------------------------------------------------------

function FieldLabel({ children, required }) {
    return (
        <label className="block text-xs font-medium text-slate-500 mb-1.5">
            {children}
            {required && <span className="text-amber-500 ml-1">*</span>}
        </label>
    );
}

function TextInput({ field }) {
    return (
        <div className="mb-3 last:mb-0">
            <FieldLabel required={field.required}>{field.label}</FieldLabel>
            <input
                type="text"
                placeholder={field.placeholder}
                defaultValue={field.defaultValue}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
            />
        </div>
    );
}

function ExpressionInput({ field }) {
    return (
        <div className="mb-3 last:mb-0">
            <FieldLabel required={field.required}>{field.label}</FieldLabel>
            <div className="relative">
                <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 text-sm bg-violet-50/50 border border-violet-200 rounded-lg outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 transition-colors font-mono text-violet-700"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-violet-400 bg-violet-100 rounded px-1.5 py-0.5">
                    expr
                </span>
            </div>
        </div>
    );
}

function SelectInput({ field, value, onChange }) {
    const effectiveValue = value !== undefined ? value : (field.defaultValue ?? field.options?.[0]?.value ?? '');
    return (
        <div className="mb-3 last:mb-0">
            <FieldLabel required={field.required}>{field.label}</FieldLabel>
            <select
                value={effectiveValue}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors appearance-none"
            >
                {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

function MultiSelectInput({ field }) {
    const [selected, setSelected] = React.useState([]);
    const toggle = (value) => {
        setSelected((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };
    return (
        <div className="mb-3 last:mb-0">
            <FieldLabel required={field.required}>{field.label}</FieldLabel>
            <div className="flex flex-wrap gap-1.5">
                {field.options.map((opt) => {
                    const active = selected.includes(opt.value);
                    return (
                        <button
                            key={opt.value}
                            onClick={() => toggle(opt.value)}
                            className={cn(
                                'px-2.5 py-1 text-xs rounded-md border transition-colors',
                                active
                                    ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                            )}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function Toggle({ field }) {
    const [checked, setChecked] = React.useState(field.defaultChecked ?? false);
    return (
        <div className="flex items-center justify-between mb-3 last:mb-0">
            <span className="text-sm text-slate-700">{field.label}</span>
            <button
                onClick={() => setChecked(!checked)}
                className={cn(
                    'w-9 h-5 rounded-full transition-colors relative',
                    checked ? 'bg-primary' : 'bg-slate-200'
                )}
            >
                <span className={cn(
                    'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform',
                    checked ? 'left-[18px]' : 'left-0.5'
                )} />
            </button>
        </div>
    );
}

function Slider({ field }) {
    const [value, setValue] = React.useState(field.defaultValue ?? field.min);
    return (
        <div className="mb-3 last:mb-0">
            <div className="flex items-center justify-between mb-1.5">
                <FieldLabel>{field.label}</FieldLabel>
                <span className="text-xs font-semibold text-primary tabular-nums">{value}</span>
            </div>
            <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm"
            />
        </div>
    );
}

function FileUpload({ field }) {
    return (
        <div className="mb-3 last:mb-0">
            <FieldLabel required={field.required}>{field.label}</FieldLabel>
            <div className="flex items-center gap-2 px-3 py-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-slate-400 hover:border-primary/40 hover:text-primary/60 transition-colors cursor-pointer">
                <Upload size={16} />
                <span className="text-xs">
                    {field.multi ? 'Drop files or click to upload' : 'Drop file or click to upload'}
                </span>
            </div>
            {field.accept && (
                <span className="text-[10px] text-slate-400 mt-1 block">{field.accept}</span>
            )}
        </div>
    );
}

function InfoField({ field }) {
    return (
        <div className="mb-3 last:mb-0">
            <FieldLabel>{field.label}</FieldLabel>
            <div className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-400 italic">
                {field.value}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Generic field renderer
// ---------------------------------------------------------------------------

function renderField(field, index, nodeData, onFieldChange) {
    const key = `${field.label}-${index}`;
    switch (field.type) {
        case 'text':        return <TextInput key={key} field={field} />;
        case 'expression':  return <ExpressionInput key={key} field={field} />;
        case 'select': {
            const dataKey = labelToKey(field.label);
            return (
                <SelectInput
                    key={key}
                    field={field}
                    value={nodeData?.[dataKey]}
                    onChange={(v) => onFieldChange?.(dataKey, v)}
                />
            );
        }
        case 'multiselect': return <MultiSelectInput key={key} field={field} />;
        case 'toggle':      return <Toggle key={key} field={field} />;
        case 'slider':      return <Slider key={key} field={field} />;
        case 'file':        return <FileUpload key={key} field={field} />;
        case 'info':        return <InfoField key={key} field={field} />;
        default:            return null;
    }
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

const sectionIconMap = {
    'Connection': Link2,
    'Inputs': ArrowDownToLine,
    'Settings': Settings,
    'Output': ArrowUpFromLine,
    'Outputs': ArrowUpFromLine,
    'Escalation': TriangleAlert,
    'Run History': History,
};

function Section({ title, hasRequired, defaultOpen = true, children }) {
    const [open, setOpen] = React.useState(defaultOpen);
    const SectionIcon = sectionIconMap[title];
    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 w-full px-5 py-3 hover:bg-slate-50 transition-colors"
            >
                {SectionIcon && <SectionIcon size={14} className="text-slate-400 shrink-0" />}
                <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">{title}</span>
                {hasRequired && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 border border-amber-200/60 rounded px-1.5 py-0.5 normal-case tracking-normal">
                        <TriangleAlert size={10} />
                        Has required fields
                    </span>
                )}
                <ChevronDown
                    size={14}
                    className={`ml-auto text-slate-400 transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
                />
            </button>
            {open && <div className="px-5 pb-4">{children}</div>}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Panel
// ---------------------------------------------------------------------------

const NodeDetailPanel = ({ node, onClose, onFieldChange }) => {
    if (!node) return null;

    const { data } = node;
    const color = data.categoryColor || '#64748b';
    const Icon = iconMap[data.icon] || File;
    const config = nodeConfigs[data.label];

    const handleFieldChange = (dataKey, value) => {
        onFieldChange?.(node.id, dataKey, value);
    };

    return (
        <div className="w-96 bg-white border-l border-slate-200 flex flex-col h-full shrink-0 z-20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-slate-900 truncate">{data.label}</h2>
                    {data.categoryName && (
                        <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color }}>
                            {data.categoryName}
                        </span>
                    )}
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <MoreVertical size={16} />
                </button>
                <button
                    onClick={onClose}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Subtitle */}
            {(config?.subtitle || data.description) && (
                <div className="px-5 py-3 border-b border-slate-100 shrink-0">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        {config?.subtitle || data.description}
                    </p>
                </div>
            )}

            {/* Config sections */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                {config ? (
                    config.sections.map((section, si) => (
                        <Section
                            key={si}
                            title={section.title}
                            defaultOpen={section.defaultOpen ?? true}
                            hasRequired={section.fields.some(f => f.required)}
                        >
                            {section.fields.map((field, fi) => renderField(field, fi, data, handleFieldChange))}
                        </Section>
                    ))
                ) : (
                    <>
                        <Section title="Settings">
                            <TextInput field={{ label: 'Node Label', placeholder: 'Node name', defaultValue: data.label }} />
                            <TextInput field={{ label: 'Description', placeholder: 'Optional description', defaultValue: data.description }} />
                        </Section>
                        <Section title="Inputs" defaultOpen={false}>
                            <p className="text-xs text-slate-400 italic">Connect an edge to configure inputs</p>
                        </Section>
                        <Section title="Outputs" defaultOpen={false}>
                            <p className="text-xs text-slate-400 italic">Connect an edge to configure outputs</p>
                        </Section>
                    </>
                )}

                <Section title="Run History" defaultOpen={false}>
                    <p className="text-xs text-slate-400 italic">Run this node to see results</p>
                </Section>
            </div>
        </div>
    );
};

export default NodeDetailPanel;
