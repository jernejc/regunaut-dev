'use client';

import React, { useRef, useCallback } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import Header from './Header';
import CustomNode from './CustomNode';
import CanvasToolbar from './CanvasToolbar';
import NodeDetailPanel from './NodeDetailPanel';
import AnalyseDocumentModal from './AnalyseDocumentModal';
import AnalyticsDashboard from './AnalyticsDashboard';

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { custom: CustomNode };
const EDGE_STYLE = { stroke: '#94a3b8', strokeWidth: 2.5 };
const isTriggerNode = (node) => node?.data?.disallowIncoming || node?.data?.label === 'Trigger';

const WorkflowBuilder = () => {
    const reactFlowWrapper = useRef(null);
    const [activeTab, setActiveTab] = React.useState('Workflow');
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
    const [activeModalNode, setActiveModalNode] = React.useState(null);
    const [selectedNodeId, setSelectedNodeId] = React.useState(null);
    const selectedNode = React.useMemo(
        () => nodes.find(n => n.id === selectedNodeId) || null,
        [nodes, selectedNodeId]
    );
    const styledEdges = React.useMemo(
        () =>
            edges.map((edge) => ({
                ...edge,
                type: 'smoothstep',
                style: { ...EDGE_STYLE, ...(edge.style || {}) },
                markerEnd: undefined,
            })),
        [edges]
    );
    React.useEffect(() => {
        // Keep graph direction valid: trigger-like nodes must not have incoming edges.
        setEdges((eds) => {
            const valid = eds.filter((edge) => {
                const targetNode = nodes.find((node) => node.id === edge.target);
                return !isTriggerNode(targetNode);
            });
            return valid.length === eds.length ? eds : valid;
        });
    }, [nodes, setEdges]);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNodeId(node.id);
        if (node.data.label === 'Analyse document') {
            setActiveModalNode(node);
        }
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNodeId(null);
    }, []);

    const onFieldChange = useCallback((nodeId, key, value) => {
        setNodes(nds => nds.map(n =>
            n.id === nodeId ? { ...n, data: { ...n.data, [key]: value } } : n
        ));
    }, [setNodes]);

    const handleSaveModal = (nodeId, updatedData) => {
        setNodes((nds) =>
            nds.map((n) => {
                if (n.id === nodeId) {
                    return { ...n, data: updatedData };
                }
                return n;
            })
        );
        setActiveModalNode(null);
    };

    const onConnect = useCallback(
        (params) => {
            const targetNode = nodes.find((node) => node.id === params.target);
            if (isTriggerNode(targetNode)) {
                return;
            }
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        type: 'smoothstep',
                        style: EDGE_STYLE,
                        markerEnd: undefined,
                    },
                    eds
                )
            );
        },
        [nodes, setEdges],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const typeData = event.dataTransfer.getData('application/reactflow');
            if (!typeData) return;

            const nodeData = JSON.parse(typeData);
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            setNodes((nds) => {
                const maxStep = Math.max(...nds.map(n => n.data?.stepNumber || 0), 0);
                const newNode = {
                    id: getId(),
                    type: nodeData.type,
                    position,
                    data: { ...nodeData, stepNumber: maxStep + 1 },
                };
                return nds.concat(newNode);
            });
        },
        [reactFlowInstance, setNodes],
    );

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 selection:bg-primary/20">
            <Header activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'Workflow' ? (
                <div className="relative flex-1 min-h-0" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={styledEdges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={{
                            type: 'smoothstep',
                            style: EDGE_STYLE,
                            markerEnd: undefined,
                            interactionWidth: 28,
                        }}
                        fitView
                        proOptions={{ hideAttribution: true }}
                        className="bg-slate-50"
                        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
                    >
                        <Background color="#e2e8f0" gap={16} size={1} />
                    </ReactFlow>

                    <div className="absolute inset-y-0 left-0 z-30 pointer-events-none">
                        <div className="h-full pointer-events-auto">
                            <Sidebar />
                        </div>
                    </div>

                    {selectedNode && (
                        <div className="absolute inset-y-0 right-0 z-30 pointer-events-none">
                            <div className="h-full pointer-events-auto">
                                <NodeDetailPanel
                                    node={selectedNode}
                                    onClose={() => setSelectedNodeId(null)}
                                    onFieldChange={onFieldChange}
                                />
                            </div>
                        </div>
                    )}

                    <CanvasToolbar />

                    {activeModalNode && (
                        <div className="absolute inset-0 z-50 pointer-events-none">
                            <div className="pointer-events-auto">
                                <AnalyseDocumentModal
                                    node={activeModalNode}
                                    onClose={() => setActiveModalNode(null)}
                                    onSave={handleSaveModal}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <AnalyticsDashboard />
            )}
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <WorkflowBuilder />
    </ReactFlowProvider>
);
