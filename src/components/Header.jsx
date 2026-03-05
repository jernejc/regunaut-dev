'use client';

import React, { useState } from 'react';
import {
    Play,
    RefreshCw,
    MoreHorizontal,
    Circle,
    Download,
    FileText,
    Settings2,
} from 'lucide-react';
import { cn } from '../lib/utils';

const navTabs = ['Workflow', 'Analytics'];

export const Header = ({
    activeTab = 'Workflow',
    onTabChange = () => {},
    onFlowReport,
    onDownloadLogs,
}) => {
    const [running, setRunning] = useState(false);
    const [status] = useState('Draft');
    const isAnalyticsView = activeTab === 'Analytics';

    const handleRun = () => {
        setRunning(true);
        setTimeout(() => setRunning(false), 2000);
    };

    return (
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 shrink-0 z-50">
            <div className="flex items-center gap-3 min-w-0">
                <img
                    src="/Regunaut_Color.svg"
                    alt="Regunaut"
                    className="h-6 w-auto shrink-0"
                />
                <div className="h-5 w-px bg-slate-200" />
                <span className="text-sm text-slate-500 truncate">Personal Folder</span>
                <input
                    type="text"
                    defaultValue="Untitled Workflow"
                    className="text-sm font-semibold text-text bg-transparent border-none outline-none hover:bg-slate-100 focus:bg-slate-100 rounded px-1.5 py-0.5 -ml-1.5 min-w-0 max-w-[180px]"
                />
            </div>

            <nav className="flex items-center gap-1 mx-auto">
                {navTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={cn(
                            'px-4 py-1.5 text-sm rounded-lg transition-colors',
                            activeTab === tab
                                ? 'bg-slate-100 font-semibold text-text'
                                : 'text-slate-500 hover:text-text hover:bg-slate-50'
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
                {isAnalyticsView ? (
                    <>
                        <button
                            onClick={() => onFlowReport?.()}
                            className="h-8 px-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                        >
                            <FileText size={14} />
                            Flow Report
                        </button>
                        <button
                            onClick={() => onDownloadLogs?.()}
                            className="h-8 px-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                        >
                            <Download size={14} />
                            Download Logs
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <Settings2 size={16} />
                        </button>
                    </>
                ) : (
                    <>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-full px-3 py-1">
                            <Circle size={8} className="fill-amber-400 text-amber-400" />
                            {status}
                        </span>

                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <RefreshCw size={16} />
                        </button>

                        <button
                            onClick={handleRun}
                            className={cn(
                                'h-8 px-4 bg-text text-white rounded-lg text-sm font-medium',
                                'flex items-center gap-1.5 transition-all hover:bg-slate-800',
                                running && 'opacity-70 pointer-events-none'
                            )}
                        >
                            <Play size={14} className={cn('fill-current', running && 'animate-spin')} />
                            {running ? 'Running...' : 'Run'}
                        </button>

                        <button className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Publish
                        </button>

                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <MoreHorizontal size={16} />
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
