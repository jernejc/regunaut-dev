'use client';

import React from 'react';
import {
    Sparkles, Plus,
    Undo2, Redo2,
    ZoomIn, ZoomOut, Maximize2,
    Map, Grid3X3, Camera,
} from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { cn } from '../lib/utils';

function ToolbarButton({ children, label, className, ...props }) {
    return (
        <button
            title={label}
            className={cn(
                'p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <div className="w-px h-6 bg-slate-200 mx-0.5" />;
}

const CanvasToolbar = () => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-white border border-slate-200 rounded-xl shadow-lg px-2 py-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/5 rounded-lg transition-colors">
                <Sparkles size={14} />
                Ask AI
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
                <Plus size={14} />
                Add
            </button>

            <Divider />

            <ToolbarButton label="Undo">
                <Undo2 size={16} />
            </ToolbarButton>
            <ToolbarButton label="Redo">
                <Redo2 size={16} />
            </ToolbarButton>

            <Divider />

            <ToolbarButton label="Zoom in" onClick={() => zoomIn()}>
                <ZoomIn size={16} />
            </ToolbarButton>
            <ToolbarButton label="Zoom out" onClick={() => zoomOut()}>
                <ZoomOut size={16} />
            </ToolbarButton>
            <ToolbarButton label="Fit view" onClick={() => fitView({ padding: 0.2 })}>
                <Maximize2 size={16} />
            </ToolbarButton>

            <Divider />

            <ToolbarButton label="Minimap">
                <Map size={16} />
            </ToolbarButton>
            <ToolbarButton label="Grid">
                <Grid3X3 size={16} />
            </ToolbarButton>
            <ToolbarButton label="Screenshot">
                <Camera size={16} />
            </ToolbarButton>
        </div>
    );
};

export default CanvasToolbar;
