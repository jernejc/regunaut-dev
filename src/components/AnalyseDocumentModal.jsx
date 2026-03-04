'use client';

import React, { useState } from 'react';
import { Mail, ChevronDown, Check, X } from 'lucide-react';

const mockEmails = [
    'john.doe@organization.com',
    'jane.smith@organization.com',
    'admin@organization.com',
    'compliance@organization.com',
    'legal@organization.com'
];

export const AnalyseDocumentModal = ({ node, onClose, onSave }) => {
    const defaultVal = node?.data?.notificationEmail || '';
    const [selectedEmail, setSelectedEmail] = useState(defaultVal);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSave = () => {
        onSave(node.id, { ...node.data, notificationEmail: selectedEmail });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="glass-panel w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-text/50 hover:text-text transition-colors p-1"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-accent/10 text-accent rounded-lg">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-text">Analyse Document</h2>
                        <p className="text-sm text-text/60">Configure notification settings</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">
                            Notification Recipient
                        </label>
                        <p className="text-xs text-text/60 mb-3">
                            Select the person in our organization to notify when this step completes.
                        </p>

                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-white/50 border border-slate-200 rounded-xl hover:border-primary/50 hover:bg-white text-left transition-all outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <span className={selectedEmail ? "text-text" : "text-text/40"}>
                                    {selectedEmail || "Select an email..."}
                                </span>
                                <ChevronDown size={18} className={`text-text/50 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden z-20 animate-in slide-in-from-top-2">
                                    <div className="max-h-60 overflow-y-auto overflow-x-hidden p-1">
                                        {mockEmails.map((email) => (
                                            <button
                                                key={email}
                                                onClick={() => {
                                                    setSelectedEmail(email);
                                                    setDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 transition-colors ${selectedEmail === email ? 'text-primary font-medium bg-primary/5' : 'text-text'
                                                    }`}
                                            >
                                                <span>{email}</span>
                                                {selectedEmail === email && <Check size={16} className="text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200/50">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-semibold text-text/70 hover:text-text hover:bg-slate-100 rounded-xl transition-all"
                        >
                            Dismiss
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-[#405fe6] rounded-xl shadow-[0_8px_16px_rgba(82,113,255,0.2)] hover:shadow-[0_8px_20px_rgba(82,113,255,0.3)] hover:-translate-y-0.5 transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyseDocumentModal;
