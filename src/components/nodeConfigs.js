const JURISDICTIONS = [
    { value: 'ema', label: 'EMA (EU)' },
    { value: 'mhra', label: 'MHRA (UK)' },
    { value: 'fda', label: 'FDA (US)' },
    { value: 'pl', label: 'Poland' },
    { value: 'cz', label: 'Czech Republic' },
    { value: 'sk', label: 'Slovakia' },
    { value: 'lv', label: 'Latvia' },
    { value: 'ee', label: 'Estonia' },
    { value: 'bg', label: 'Bulgaria' },
    { value: 'ro', label: 'Romania' },
];

const PRODUCT_TYPES = [
    { value: 'chemical', label: 'Chemical' },
    { value: 'biological', label: 'Biological' },
    { value: 'atmp', label: 'ATMP' },
];

const OPERATING_MODES = [
    { value: 'extract', label: 'Extract — structured section data' },
    { value: 'validate', label: 'Validate — check against schema' },
    { value: 'compare', label: 'Compare — diff two versions' },
];

const AI_PROVIDER = { type: 'select', label: 'AI Provider', options: [
    { value: '', label: 'Select credential...' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'azure', label: 'Azure OpenAI' },
]};

const OCR_SERVICE = { type: 'select', label: 'OCR Service', options: [
    { value: '', label: 'Select credential...' },
    { value: 'azure-di', label: 'Azure Document Intelligence' },
    { value: 'aws-textract', label: 'AWS Textract' },
    { value: 'google-docai', label: 'Google Document AI' },
]};

const SUMMARY_LANGUAGE = { type: 'select', label: 'Summary Language', options: [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'German' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
]};


// ---------------------------------------------------------------------------
// Inputs group
// ---------------------------------------------------------------------------

const inputNode = {
    subtitle: 'A text or data entry point for the workflow.',
    canvasTags: [
        { key: 'inputType', defaultValue: 'text', options: [
            { value: 'text', label: 'Text' },
            { value: 'number', label: 'Number' },
            { value: 'json', label: 'JSON' },
            { value: 'expression', label: 'Expression' },
        ]},
    ],
    sections: [
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Input Type', options: [
                    { value: 'text', label: 'Text' },
                    { value: 'number', label: 'Number' },
                    { value: 'json', label: 'JSON' },
                    { value: 'expression', label: 'Expression' },
                ]},
                { type: 'text', label: 'Default Value', placeholder: 'Enter default value...' },
                { type: 'text', label: 'Variable Name', placeholder: 'e.g. patient_id' },
                { type: 'toggle', label: 'Required', defaultChecked: false },
            ],
        },
    ],
};

const filesNode = {
    subtitle: 'Upload one or more documents into the workflow.',
    canvasTags: [
        { key: 'acceptedFormats', defaultValue: 'all', options: [
            { value: 'all', label: 'All file types' },
            { value: 'pdf', label: 'PDF only' },
            { value: 'docs', label: 'Documents' },
            { value: 'spreadsheets', label: 'Spreadsheets' },
        ]},
    ],
    sections: [
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Accepted Formats', options: [
                    { value: 'all', label: 'All file types' },
                    { value: 'pdf', label: 'PDF only (.pdf)' },
                    { value: 'docs', label: 'Documents (.pdf, .docx)' },
                    { value: 'spreadsheets', label: 'Spreadsheets (.xlsx, .csv)' },
                ]},
                { type: 'select', label: 'Max File Size', options: [
                    { value: '5', label: '5 MB' },
                    { value: '10', label: '10 MB' },
                    { value: '25', label: '25 MB' },
                    { value: '50', label: '50 MB' },
                ]},
                { type: 'toggle', label: 'Allow Multiple Files', defaultChecked: false },
                { type: 'text', label: 'Variable Name', placeholder: 'e.g. uploaded_docs' },
            ],
        },
    ],
};

const triggerNode = {
    subtitle: 'Start the workflow based on an external event or schedule. Validates incoming data and routes to Accepted or Rejected.',
    handles: {
        sources: [
            { id: 'accepted', label: 'Accepted' },
            { id: 'rejected', label: 'Rejected' },
        ],
    },
    canvasTags: [
        { key: 'triggerType', defaultValue: 'webhook', options: [
            { value: 'webhook', label: 'Webhook' },
            { value: 'schedule', label: 'Schedule' },
            { value: 'event', label: 'Event' },
        ]},
    ],
    sections: [
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Trigger Type', options: [
                    { value: 'webhook', label: 'Webhook' },
                    { value: 'schedule', label: 'Schedule (cron)' },
                    { value: 'event', label: 'Event listener' },
                ]},
                { type: 'text', label: 'Schedule (cron)', placeholder: '0 9 * * MON-FRI' },
                { type: 'select', label: 'Event Source', options: [
                    { value: '', label: 'Select source...' },
                    { value: 'veeva', label: 'Veeva Vault' },
                    { value: 'email', label: 'Incoming email' },
                    { value: 'api', label: 'API call' },
                ]},
                { type: 'info', label: 'Webhook URL', value: 'Generated after publishing' },
            ],
        },
        {
            title: 'Validation', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Require Attachment', defaultChecked: false },
                { type: 'select', label: 'Required Format', options: [
                    { value: 'any', label: 'Any' },
                    { value: 'pdf', label: 'PDF' },
                    { value: 'docx', label: 'Word (.docx)' },
                ]},
                { type: 'text', label: 'Reject Message', placeholder: 'Please resubmit with the required attachment' },
            ],
        },
    ],
};

const urlNode = {
    subtitle: 'Fetch data from a URL and pass it downstream.',
    canvasTags: [
        { key: 'httpMethod', defaultValue: 'get', options: [
            { value: 'get', label: 'GET' },
            { value: 'post', label: 'POST' },
        ]},
    ],
    sections: [
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'text', label: 'URL', placeholder: 'https://...', required: true },
                { type: 'select', label: 'HTTP Method', options: [
                    { value: 'get', label: 'GET' },
                    { value: 'post', label: 'POST' },
                ]},
                { type: 'text', label: 'Headers', placeholder: '{"Authorization": "Bearer ..."}' },
                { type: 'select', label: 'Authentication', options: [
                    { value: 'none', label: 'None' },
                    { value: 'bearer', label: 'Bearer Token' },
                    { value: 'apikey', label: 'API Key' },
                ]},
                { type: 'select', label: 'Response Format', options: [
                    { value: 'json', label: 'JSON' },
                    { value: 'html', label: 'HTML' },
                    { value: 'text', label: 'Plain text' },
                ]},
            ],
        },
    ],
};

const audioNode = {
    subtitle: 'Capture or upload audio and transcribe it.',
    canvasTags: [
        { key: 'inputSource', defaultValue: 'upload', options: [
            { value: 'upload', label: 'File upload' },
            { value: 'stream', label: 'Live stream' },
            { value: 'url', label: 'URL' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                { type: 'select', label: 'Transcription Service', options: [
                    { value: '', label: 'Select credential...' },
                    { value: 'whisper', label: 'OpenAI Whisper' },
                    { value: 'azure-speech', label: 'Azure Speech Services' },
                    { value: 'google-stt', label: 'Google Speech-to-Text' },
                ]},
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Input Source', options: [
                    { value: 'upload', label: 'File upload' },
                    { value: 'stream', label: 'Live stream' },
                    { value: 'url', label: 'URL' },
                ]},
                { type: 'select', label: 'Language', options: [
                    { value: 'auto', label: 'Auto-detect' },
                    { value: 'en', label: 'English' },
                    { value: 'de', label: 'German' },
                    { value: 'fr', label: 'French' },
                ]},
                { type: 'select', label: 'Output Format', options: [
                    { value: 'text', label: 'Plain text' },
                    { value: 'timestamped', label: 'Timestamped transcript' },
                ]},
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Outputs group
// ---------------------------------------------------------------------------

const outputNode = {
    subtitle: 'Display or export workflow results.',
    canvasTags: [
        { key: 'outputFormat', defaultValue: 'text', options: [
            { value: 'text', label: 'Text' },
            { value: 'json', label: 'JSON' },
            { value: 'table', label: 'Table' },
            { value: 'pdf', label: 'PDF' },
        ]},
    ],
    sections: [
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Output Format', options: [
                    { value: 'text', label: 'Text' },
                    { value: 'json', label: 'JSON' },
                    { value: 'table', label: 'Table' },
                    { value: 'pdf', label: 'PDF document' },
                ]},
                { type: 'toggle', label: 'Use Template', defaultChecked: false },
                { type: 'text', label: 'Variable Mapping', placeholder: '{{ $json.result }}' },
            ],
        },
    ],
};

const sendNotificationNode = {
    subtitle: 'Send an email, SMS, or chat notification. Optionally await a response with timeout and escalation.',
    iconOverrides: {
        field: 'channel',
        map: { email: 'emailBrand', sms: 'smartphone', slack: 'messageSquare', teams: 'teamsBrand' },
    },
    handles: {
        sources: [
            { id: 'done', label: 'Done' },
            { id: 'timedOut', label: 'Timed Out' },
        ],
    },
    canvasTags: [
        { key: 'channel', defaultValue: 'email', options: [
            { value: 'email', label: 'Email' },
            { value: 'sms', label: 'SMS' },
            { value: 'slack', label: 'Slack' },
            { value: 'teams', label: 'Teams' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                { type: 'select', label: 'Provider', options: [
                    { value: '', label: 'Select credential...' },
                    { value: 'smtp', label: 'SMTP / Email' },
                    { value: 'twilio', label: 'Twilio (SMS)' },
                    { value: 'slack', label: 'Slack' },
                    { value: 'teams', label: 'Microsoft Teams' },
                ]},
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Channel', options: [
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'slack', label: 'Slack' },
                    { value: 'teams', label: 'Microsoft Teams' },
                ]},
                { type: 'text', label: 'Recipients', placeholder: 'email@company.com', required: true },
                { type: 'text', label: 'Subject', placeholder: 'Workflow notification' },
                { type: 'text', label: 'Message Template', placeholder: 'Step {{stepName}} completed...' },
                { type: 'toggle', label: 'Attach Results', defaultChecked: false },
            ],
        },
        {
            title: 'Response Handling', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Await Response', defaultChecked: false },
                { type: 'text', label: 'Timeout', placeholder: 'e.g. 48' },
                { type: 'select', label: 'Timeout Unit', options: [
                    { value: 'hours', label: 'Hours' },
                    { value: 'days', label: 'Days' },
                ]},
                { type: 'toggle', label: 'Resume with Response Data', defaultChecked: true },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Core Nodes group
// ---------------------------------------------------------------------------

const askAiNode = {
    subtitle: 'Query a large language model for structured or free-text output.',
    canvasTags: [
        { key: 'model', defaultValue: 'gpt-4o', options: [
            { value: 'gpt-4o', label: 'GPT-4o' },
            { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
            { value: 'claude-sonnet', label: 'Claude Sonnet' },
            { value: 'claude-haiku', label: 'Claude Haiku' },
        ]},
        { key: 'responseFormat', defaultValue: 'text', options: [
            { value: 'text', label: 'Free text' },
            { value: 'json', label: 'JSON' },
            { value: 'structured', label: 'Structured' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'text', label: 'System Prompt', placeholder: 'You are a regulatory affairs expert...' },
                { type: 'expression', label: 'User Prompt', placeholder: '{{ $json.change_description }}', required: true },
                { type: 'toggle', label: 'Include Context Documents', defaultChecked: false },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Model', options: [
                    { value: 'gpt-4o', label: 'GPT-4o' },
                    { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
                    { value: 'claude-sonnet', label: 'Claude 3.5 Sonnet' },
                    { value: 'claude-haiku', label: 'Claude 3.5 Haiku' },
                ]},
                { type: 'slider', label: 'Temperature', min: 0, max: 1, step: 0.1, defaultValue: 0.7 },
                { type: 'text', label: 'Max Tokens', placeholder: '4096' },
                { type: 'select', label: 'Response Format', options: [
                    { value: 'text', label: 'Free text' },
                    { value: 'json', label: 'JSON' },
                    { value: 'structured', label: 'Structured (schema)' },
                ]},
            ],
        },
    ],
};

const reviewApproveNode = {
    subtitle: 'Pause the workflow for human review and approval before continuing.',
    canvasTags: [
        { key: 'approvalType', defaultValue: 'single', options: [
            { value: 'single', label: 'Single approver' },
            { value: 'majority', label: 'Majority vote' },
            { value: 'unanimous', label: 'Unanimous' },
        ]},
    ],
    sections: [
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'text', label: 'Reviewer', placeholder: 'email or role (e.g. ra-lead@company.com)' },
                { type: 'text', label: 'Timeout (hours)', placeholder: '24', defaultValue: '24' },
                { type: 'select', label: 'Approval Type', options: [
                    { value: 'single', label: 'Single approver' },
                    { value: 'majority', label: 'Majority vote' },
                    { value: 'unanimous', label: 'Unanimous' },
                ]},
                { type: 'slider', label: 'Auto-approve above confidence', min: 0, max: 100, step: 5, defaultValue: 0 },
                { type: 'toggle', label: 'Send Notification', defaultChecked: true },
            ],
        },
    ],
};

const regunautApiNode = {
    subtitle: 'Create, update, or query case records in Regunaut — the central project-plan store for all downstream tasks.',
    iconOverrides: {
        field: 'operation',
        map: { create: 'circlePlus', update: 'pencil', get: 'eye', list: 'list' },
    },
    canvasTags: [
        { key: 'operation', defaultValue: 'create', options: [
            { value: 'create', label: 'Create case' },
            { value: 'update', label: 'Update case' },
            { value: 'get', label: 'Get case' },
            { value: 'list', label: 'List cases' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                { type: 'text', label: 'Regunaut Instance', placeholder: 'https://app.regunaut.com' },
                { type: 'select', label: 'Credential', options: [
                    { value: '', label: 'Select credential...' },
                    { value: 'api-key', label: 'API Key' },
                    { value: 'oauth', label: 'OAuth 2.0' },
                ]},
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'select', label: 'Operation', options: [
                    { value: 'create', label: 'Create case' },
                    { value: 'update', label: 'Update case' },
                    { value: 'get', label: 'Get case' },
                    { value: 'list', label: 'List cases' },
                ], required: true },
                { type: 'expression', label: 'Case ID', placeholder: '{{ $json.case_id }}' },
                { type: 'expression', label: 'Payload', placeholder: '{{ { title: $json.change_description, tasks: $json.tasks } }}' },
            ],
        },
        {
            title: 'Settings', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Retry on Failure', defaultChecked: true },
                { type: 'text', label: 'Timeout (seconds)', placeholder: '30', defaultValue: '30' },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Return Full Record', defaultChecked: true },
                { type: 'toggle', label: 'Return case_id Only', defaultChecked: false },
                { type: 'info', label: 'Output Schema', value: 'case_id · status · created_at · updated_at' },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Document Intelligence group
// ---------------------------------------------------------------------------

const ccFormNode = {
    subtitle: 'Upload a Change Control form. Extracts variation type, regulatory impact, and action tasks. Routes to Review when confidence is below threshold.',
    handles: {
        sources: [
            { id: 'passed', label: 'Passed' },
            { id: 'review', label: 'Review' },
        ],
    },
    canvasTags: [
        { key: 'jurisdiction', defaultValue: '', options: JURISDICTIONS },
        { key: 'extractionMode', defaultValue: 'full', options: [
            { value: 'full', label: 'Full extraction' },
            { value: 'summary', label: 'Summary only' },
            { value: 'tasks', label: 'Tasks only' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
                OCR_SERVICE,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'CC Document', accept: '.pdf,.docx', required: true },
                { type: 'select', label: 'Jurisdiction', options: JURISDICTIONS, required: true },
                { type: 'select', label: 'Extraction Mode', options: [
                    { value: 'full', label: 'Full extraction' },
                    { value: 'summary', label: 'Summary only' },
                    { value: 'tasks', label: 'Tasks only' },
                ]},
            ],
        },
        {
            title: 'Settings', defaultOpen: false, fields: [
                { type: 'toggle', label: 'OCR Enabled', defaultChecked: true },
                { type: 'slider', label: 'Confidence Threshold', min: 0, max: 100, step: 5, defaultValue: 70 },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Structured JSON Output', defaultChecked: true },
                { type: 'toggle', label: 'Plain-language Summary', defaultChecked: true },
            ],
        },
        {
            title: 'Output Schema', defaultOpen: false, fields: [
                { type: 'info', label: 'change_description', value: 'Plain-text summary of the change' },
                { type: 'info', label: 'regulatory_impact', value: 'Impact level: none / minor / major / critical' },
                { type: 'info', label: 'affected_products', value: 'Array of product names and MA numbers' },
                { type: 'info', label: 'implementation_date', value: 'ISO date the change takes effect' },
                { type: 'info', label: 'confidence_overall', value: '0–100 extraction confidence score' },
                { type: 'info', label: 'tasks', value: 'Array of { description, department, deadline }' },
            ],
        },
    ],
};

const smpcPilNode = {
    subtitle: 'Parse SmPC or PIL documents against the QRD template — extract, validate structure, or compare versions.',
    canvasTags: [
        { key: 'operatingMode', defaultValue: 'extract', options: [
            { value: 'extract', label: 'Extract' },
            { value: 'validate', label: 'Validate' },
            { value: 'compare', label: 'Compare' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
                OCR_SERVICE,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'SmPC / PIL Document', accept: '.pdf,.docx', required: true },
                { type: 'file', label: 'Comparison Document', accept: '.pdf,.docx' },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Operating Mode', options: OPERATING_MODES },
                { type: 'select', label: 'QRD Template Version', options: [
                    { value: 'latest', label: 'Latest (auto-update)' },
                    { value: 'v11', label: 'QRD Template v11' },
                    { value: 'v10.2', label: 'QRD Template v10.2' },
                ]},
                { type: 'toggle', label: 'Include Optional Sections', defaultChecked: false },
                { type: 'multiselect', label: 'Section Filter', options: [
                    { value: '1', label: '1. Name of the medicinal product' },
                    { value: '2', label: '2. Qualitative and quantitative composition' },
                    { value: '4.1', label: '4.1 Therapeutic indications' },
                    { value: '4.2', label: '4.2 Posology and method of administration' },
                    { value: '4.3', label: '4.3 Contraindications' },
                    { value: '4.4', label: '4.4 Special warnings and precautions' },
                    { value: '4.8', label: '4.8 Undesirable effects' },
                    { value: '5.1', label: '5.1 Pharmacodynamic properties' },
                ]},
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Structured JSON Output', defaultChecked: true },
                { type: 'toggle', label: 'Plain-language Summary', defaultChecked: true },
                SUMMARY_LANGUAGE,
            ],
        },
    ],
};

const ctdModuleNode = {
    subtitle: 'Parse CTD dossier modules — assess completeness of 2.3, 3.2.P, 3.2.S and other sections.',
    canvasTags: [
        { key: 'targetModule', defaultValue: 'full', options: [
            { value: 'full', label: 'Full dossier' },
            { value: '2.3', label: '2.3 QOS' },
            { value: '3.2.p', label: '3.2.P' },
            { value: '3.2.s', label: '3.2.S' },
            { value: '3.2.r', label: '3.2.R' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'CTD Documents', accept: '.pdf,.docx,.zip', multi: true, required: true },
                { type: 'select', label: 'Target Module', options: [
                    { value: 'full', label: 'Full dossier' },
                    { value: '2.3', label: '2.3 Quality Overall Summary' },
                    { value: '3.2.p', label: '3.2.P Drug Product' },
                    { value: '3.2.s', label: '3.2.S Drug Substance' },
                    { value: '3.2.r', label: '3.2.R Regional Information' },
                ]},
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Operating Mode', options: OPERATING_MODES },
                { type: 'slider', label: 'Completeness Threshold', min: 0, max: 100, step: 5, defaultValue: 80 },
                { type: 'toggle', label: 'Cross-reference Checks', defaultChecked: true },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Structured JSON Output', defaultChecked: true },
                { type: 'toggle', label: 'Plain-language Summary', defaultChecked: true },
                { type: 'toggle', label: 'Completeness Score', defaultChecked: true },
            ],
        },
    ],
};

const psurPbrerNode = {
    subtitle: 'Parse periodic safety reports (PSUR/PBRER) — extract safety signals, reporting data, and benefit-risk evaluation.',
    canvasTags: [
        { key: 'reportType', defaultValue: 'psur', options: [
            { value: 'psur', label: 'PSUR' },
            { value: 'pbrer', label: 'PBRER' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
                OCR_SERVICE,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'PSUR / PBRER Document', accept: '.pdf,.docx', required: true },
                { type: 'text', label: 'Data Lock Point', placeholder: 'e.g. 2025-06-30' },
                { type: 'file', label: 'Reference Safety Information', accept: '.pdf,.docx' },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Operating Mode', options: OPERATING_MODES },
                { type: 'select', label: 'Report Type', options: [
                    { value: 'psur', label: 'PSUR' },
                    { value: 'pbrer', label: 'PBRER' },
                ]},
                { type: 'slider', label: 'Signal Detection Sensitivity', min: 0, max: 100, step: 5, defaultValue: 75 },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Structured JSON Output', defaultChecked: true },
                { type: 'toggle', label: 'Plain-language Summary', defaultChecked: true },
                { type: 'toggle', label: 'Signal Alerts', defaultChecked: true },
            ],
        },
    ],
};

const rmpNode = {
    subtitle: 'Parse Risk Management Plans — extract risk categorisations, pharmacovigilance activities, and risk minimisation measures.',
    canvasTags: [
        { key: 'productType', defaultValue: 'chemical', options: PRODUCT_TYPES },
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'RMP Document', accept: '.pdf,.docx', required: true },
                { type: 'select', label: 'Product Type', options: PRODUCT_TYPES },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Operating Mode', options: OPERATING_MODES },
                { type: 'select', label: 'Risk Categorisation Framework', options: [
                    { value: 'meddra', label: 'MedDRA' },
                    { value: 'custom', label: 'Custom' },
                ]},
                { type: 'toggle', label: 'Cross-reference with SmPC', defaultChecked: true },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Structured JSON Output', defaultChecked: true },
                { type: 'toggle', label: 'Plain-language Summary', defaultChecked: true },
                { type: 'toggle', label: 'Risk Matrix', defaultChecked: true },
            ],
        },
    ],
};

const indCtaNode = {
    subtitle: 'Parse clinical trial applications (IND/CTA) — assess completeness against regulatory checklists per jurisdiction.',
    canvasTags: [
        { key: 'applicationType', defaultValue: 'initial', options: [
            { value: 'initial', label: 'Initial' },
            { value: 'amendment', label: 'Amendment' },
            { value: 'renewal', label: 'Renewal' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'CTA / IND Document', accept: '.pdf,.docx', required: true },
                { type: 'select', label: 'Application Type', options: [
                    { value: 'initial', label: 'Initial application' },
                    { value: 'amendment', label: 'Amendment' },
                    { value: 'renewal', label: 'Renewal' },
                ]},
                { type: 'select', label: 'Jurisdiction', options: JURISDICTIONS },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Operating Mode', options: OPERATING_MODES },
                { type: 'select', label: 'Regulatory Checklist Version', options: [
                    { value: 'latest', label: 'Latest' },
                    { value: '2024', label: '2024' },
                    { value: '2023', label: '2023' },
                ]},
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Structured JSON Output', defaultChecked: true },
                { type: 'toggle', label: 'Plain-language Summary', defaultChecked: true },
                { type: 'toggle', label: 'Checklist Completeness Score', defaultChecked: true },
            ],
        },
    ],
};

const ctdChecklistGeneratorNode = {
    subtitle: 'Generate a CTD document checklist based on variation type and jurisdiction — tells you exactly which documents to prepare.',
    canvasTags: [
        { key: 'ctdEdition', defaultValue: 'latest', options: [
            { value: 'latest', label: 'Latest' },
            { value: 'ich-m4', label: 'ICH M4' },
        ]},
        { key: 'format', defaultValue: 'checklist', options: [
            { value: 'checklist', label: 'Checklist' },
            { value: 'table', label: 'Table' },
            { value: 'json', label: 'JSON' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'expression', label: 'Variation Type', placeholder: '{{ $json.variation_type }}', required: true },
                { type: 'multiselect', label: 'Jurisdiction', options: JURISDICTIONS, required: true },
                { type: 'select', label: 'Product Type', options: PRODUCT_TYPES },
                { type: 'expression', label: 'Change Description', placeholder: '{{ $json.change_description }}' },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'CTD Edition', options: [
                    { value: 'latest', label: 'Latest (auto-update)' },
                    { value: 'ich-m4', label: 'ICH M4' },
                ]},
                { type: 'toggle', label: 'Include Optional Documents', defaultChecked: false },
                { type: 'select', label: 'Output Format', options: [
                    { value: 'checklist', label: 'Checklist' },
                    { value: 'table', label: 'Table' },
                    { value: 'json', label: 'JSON' },
                ]},
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Checklist Items', defaultChecked: true },
                { type: 'toggle', label: 'Gap Indicators', defaultChecked: true },
                { type: 'toggle', label: 'Estimated Effort per Document', defaultChecked: false },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Classifiers group
// ---------------------------------------------------------------------------

const variationTypeClassifierNode = {
    subtitle: 'Takes a change description and returns the variation type, regulatory basis, and submission timeline — per jurisdiction.',
    canvasTags: [
        { key: 'productType', defaultValue: 'chemical', options: PRODUCT_TYPES },
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'expression', label: 'Change Description', placeholder: '{{ $json.change_description }}', required: true },
                { type: 'multiselect', label: 'Jurisdiction', options: JURISDICTIONS, required: true },
                { type: 'select', label: 'Product Type', options: PRODUCT_TYPES },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'toggle', label: 'Rule-first Mode', defaultChecked: true },
                { type: 'toggle', label: 'Include Regulatory Basis', defaultChecked: true },
                { type: 'slider', label: 'Confidence Threshold', min: 0, max: 100, step: 5, defaultValue: 85 },
            ],
        },
        {
            title: 'Escalation', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Auto-escalate Low Confidence', defaultChecked: true },
                { type: 'select', label: 'Escalation Target', options: [
                    { value: 'review', label: 'Route to Review / Approve node' },
                    { value: 'notify', label: 'Send notification only' },
                    { value: 'pause', label: 'Pause workflow' },
                ]},
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Include Regulatory Basis', defaultChecked: true },
                { type: 'toggle', label: 'Include Prior Approval Flag', defaultChecked: true },
                { type: 'toggle', label: 'Include Submission Deadline', defaultChecked: true },
                { type: 'toggle', label: 'Include Confidence Score', defaultChecked: true },
            ],
        },
        {
            title: 'Output Schema', defaultOpen: false, fields: [
                { type: 'info', label: 'variation_type', value: 'e.g. "Type IA", "Type IB", "Type II"' },
                { type: 'info', label: 'regulatory_basis', value: 'Legal basis reference per jurisdiction' },
                { type: 'info', label: 'requires_prior_approval', value: 'Boolean — true if prior approval needed' },
                { type: 'info', label: 'submission_deadline', value: 'ISO date — latest permissible submission' },
                { type: 'info', label: 'confidence', value: '0–100 classification confidence score' },
            ],
        },
    ],
};

const submissionRouteSelectorNode = {
    subtitle: 'Determine the optimal submission route based on variation type, jurisdiction, urgency, and cost considerations.',
    canvasTags: [
        { key: 'urgency', defaultValue: 'standard', options: [
            { value: 'standard', label: 'Standard' },
            { value: 'urgent', label: 'Urgent' },
            { value: 'emergency', label: 'Emergency' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'expression', label: 'Variation Type', placeholder: '{{ $json.variation_type }}', required: true },
                { type: 'multiselect', label: 'Jurisdictions', options: JURISDICTIONS, required: true },
                { type: 'select', label: 'Urgency', options: [
                    { value: 'standard', label: 'Standard' },
                    { value: 'urgent', label: 'Urgent' },
                    { value: 'emergency', label: 'Emergency' },
                ]},
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'toggle', label: 'Include Cost Comparison', defaultChecked: false },
                { type: 'toggle', label: 'Include Timeline Comparison', defaultChecked: true },
                { type: 'toggle', label: 'Multi-route Analysis', defaultChecked: false },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Route Recommendation', defaultChecked: true },
                { type: 'toggle', label: 'Timeline Estimate', defaultChecked: true },
                { type: 'toggle', label: 'Cost Estimate', defaultChecked: false },
            ],
        },
    ],
};

const variationGroupingOptimiserNode = {
    subtitle: 'Group multiple variations to minimise cost, timeline, or both — while respecting regulatory grouping rules.',
    canvasTags: [
        { key: 'optimisationTarget', defaultValue: 'both', options: [
            { value: 'cost', label: 'Minimise cost' },
            { value: 'timeline', label: 'Minimise timeline' },
            { value: 'both', label: 'Balance both' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'expression', label: 'Variation List', placeholder: '{{ $json.variations }}', required: true },
                { type: 'multiselect', label: 'Jurisdictions', options: JURISDICTIONS },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Optimisation Target', options: [
                    { value: 'cost', label: 'Minimise cost' },
                    { value: 'timeline', label: 'Minimise timeline' },
                    { value: 'both', label: 'Balance both' },
                ]},
                { type: 'text', label: 'Max Group Size', placeholder: '5', defaultValue: '5' },
                { type: 'toggle', label: 'Enforce Regulatory Constraints', defaultChecked: true },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Grouped Variations', defaultChecked: true },
                { type: 'toggle', label: 'Savings Estimate', defaultChecked: false },
            ],
        },
    ],
};

const riskClassifierNode = {
    subtitle: 'Assess and classify regulatory risk levels for a proposed change — with justification and optional mitigation suggestions.',
    canvasTags: [
        { key: 'riskFramework', defaultValue: 'ema', options: [
            { value: 'ema', label: 'EMA Guidelines' },
            { value: 'ich-q9', label: 'ICH Q9' },
            { value: 'custom', label: 'Custom' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'expression', label: 'Change Description', placeholder: '{{ $json.change_description }}', required: true },
                { type: 'text', label: 'Product Context', placeholder: 'Product name, active substance, etc.' },
                { type: 'file', label: 'Historical Data', accept: '.csv,.xlsx,.json' },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'select', label: 'Risk Framework', options: [
                    { value: 'ema', label: 'EMA Guidelines' },
                    { value: 'ich-q9', label: 'ICH Q9' },
                    { value: 'custom', label: 'Custom' },
                ]},
                { type: 'select', label: 'Severity Levels', options: [
                    { value: '3', label: '3-level (Low / Medium / High)' },
                    { value: '5', label: '5-level (Very Low to Critical)' },
                ]},
                { type: 'toggle', label: 'Include Mitigation Suggestions', defaultChecked: true },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Risk Level', defaultChecked: true },
                { type: 'toggle', label: 'Justification', defaultChecked: true },
                { type: 'toggle', label: 'Mitigation Suggestions', defaultChecked: false },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Validators group
// ---------------------------------------------------------------------------

const dossierGapAnalysisNode = {
    subtitle: 'Check a dossier against the required data package for the variation type and jurisdiction. Returns Critical / Major / Minor gaps with suggested remedies.',
    canvasTags: [
        { key: 'changeType', defaultValue: '', options: [
            { value: 'mfg-site', label: 'Mfg site' },
            { value: 'spec', label: 'Specification' },
            { value: 'shelf-life', label: 'Shelf life' },
            { value: 'api-source', label: 'API source' },
            { value: 'formulation', label: 'Formulation' },
            { value: 'other', label: 'Other' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'Dossier Documents', accept: '.pdf,.docx,.zip', multi: true, required: true },
                { type: 'expression', label: 'Variation Type', placeholder: '{{ $json.variation_type }}', required: true },
                { type: 'multiselect', label: 'Jurisdiction', options: JURISDICTIONS, required: true },
                { type: 'select', label: 'Change Type', options: [
                    { value: 'mfg-site', label: 'Manufacturing site' },
                    { value: 'spec', label: 'Specification' },
                    { value: 'shelf-life', label: 'Shelf life' },
                    { value: 'api-source', label: 'API source' },
                    { value: 'formulation', label: 'Formulation' },
                    { value: 'other', label: 'Other' },
                ]},
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'toggle', label: 'Cross-document Consistency', defaultChecked: true },
                { type: 'toggle', label: 'Include Suggested Remediation', defaultChecked: true },
                { type: 'select', label: 'Output Format', options: [
                    { value: 'summary', label: 'Summary' },
                    { value: 'full', label: 'Full report' },
                    { value: 'gap-list', label: 'Gap list only' },
                ]},
            ],
        },
    ],
};

const submissionCompletenessNode = {
    subtitle: 'Verify that a submission package contains all required documents for the procedure type and jurisdiction.',
    canvasTags: [
        { key: 'submissionType', defaultValue: 'ia', options: [
            { value: 'ia', label: 'Type IA' },
            { value: 'ib', label: 'Type IB' },
            { value: 'ii', label: 'Type II' },
            { value: 'extension', label: 'Extension' },
        ]},
    ],
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'Submission Package', accept: '.pdf,.docx,.zip', multi: true, required: true },
                { type: 'select', label: 'Submission Type', options: [
                    { value: 'ia', label: 'Type IA' },
                    { value: 'ib', label: 'Type IB' },
                    { value: 'ii', label: 'Type II' },
                    { value: 'extension', label: 'Extension' },
                ]},
                { type: 'multiselect', label: 'Jurisdiction', options: JURISDICTIONS, required: true },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'toggle', label: 'Check eCTD Structure', defaultChecked: true },
                { type: 'toggle', label: 'Include Optional Documents', defaultChecked: false },
                { type: 'select', label: 'Severity Filter', options: [
                    { value: 'all', label: 'All issues' },
                    { value: 'critical-major', label: 'Critical & Major only' },
                    { value: 'critical', label: 'Critical only' },
                ]},
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Completeness Score', defaultChecked: true },
                { type: 'toggle', label: 'Detailed Gap List', defaultChecked: true },
                { type: 'toggle', label: 'Audit Report', defaultChecked: false },
            ],
        },
    ],
};

const smpcConsistencyNode = {
    subtitle: 'Cross-check SmPC content against RMP, package leaflet, and clinical data for internal consistency.',
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'file', label: 'SmPC Document', accept: '.pdf,.docx', required: true },
                { type: 'file', label: 'RMP Document', accept: '.pdf,.docx' },
                { type: 'file', label: 'Package Leaflet', accept: '.pdf,.docx' },
                { type: 'file', label: 'Module 5 Data', accept: '.pdf,.docx,.zip' },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'toggle', label: 'Check Adverse Reaction Consistency', defaultChecked: true },
                { type: 'toggle', label: 'Check Posology Consistency', defaultChecked: true },
                { type: 'toggle', label: 'Check Contraindications', defaultChecked: true },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Consistency Report', defaultChecked: true },
                { type: 'toggle', label: 'Issue Severity Breakdown', defaultChecked: false },
                { type: 'toggle', label: 'Cross-reference Matrix', defaultChecked: false },
            ],
        },
    ],
};

const timelineComplianceNode = {
    subtitle: 'Validate that a submission timeline meets regulatory deadlines and flag risks before they become critical.',
    sections: [
        {
            title: 'Connection', defaultOpen: true, fields: [
                AI_PROVIDER,
            ],
        },
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'text', label: 'Submission Date', placeholder: 'YYYY-MM-DD' },
                { type: 'expression', label: 'Variation Type', placeholder: '{{ $json.variation_type }}', required: true },
                { type: 'multiselect', label: 'Jurisdiction', options: JURISDICTIONS, required: true },
                { type: 'text', label: 'Implementation Deadline', placeholder: 'YYYY-MM-DD' },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'text', label: 'Buffer Days', placeholder: '10', defaultValue: '10' },
                { type: 'select', label: 'Holiday Calendar', options: [
                    { value: 'all', label: 'All applicable' },
                    { value: 'ema', label: 'EMA' },
                    { value: 'mhra', label: 'MHRA' },
                    { value: 'fda', label: 'FDA' },
                ]},
                { type: 'toggle', label: 'Regulatory Clock-stop Rules', defaultChecked: true },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Compliance Status', defaultChecked: true },
                { type: 'toggle', label: 'Risk Dates', defaultChecked: true },
                { type: 'toggle', label: 'Recommendations', defaultChecked: false },
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Calculators group
// ---------------------------------------------------------------------------

const submissionDeadlineNode = {
    subtitle: 'Calculate regulatory submission deadlines — working days, public holidays, and agency closures factored in.',
    canvasTags: [
        { key: 'submissionType', defaultValue: 'ia', options: [
            { value: 'ia', label: 'Type IA' },
            { value: 'ib', label: 'Type IB' },
            { value: 'ii', label: 'Type II' },
            { value: 'extension', label: 'Extension' },
        ]},
    ],
    sections: [
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'select', label: 'Submission Type', options: [
                    { value: 'ia', label: 'Type IA' },
                    { value: 'ib', label: 'Type IB' },
                    { value: 'ii', label: 'Type II' },
                    { value: 'extension', label: 'Extension' },
                ], required: true },
                { type: 'multiselect', label: 'Jurisdiction', options: JURISDICTIONS, required: true },
                { type: 'text', label: 'Reference Date', placeholder: 'YYYY-MM-DD' },
                { type: 'text', label: 'Implementation Deadline', placeholder: 'YYYY-MM-DD' },
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'toggle', label: 'Working Days Only', defaultChecked: true },
                { type: 'toggle', label: 'Include Public Holidays', defaultChecked: true },
                { type: 'toggle', label: 'Include Agency Closures', defaultChecked: true },
                { type: 'text', label: 'Buffer Days', placeholder: '5', defaultValue: '5' },
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Calendar View', defaultChecked: false },
                { type: 'toggle', label: 'Internal Action Dates', defaultChecked: true },
                { type: 'toggle', label: 'Critical Path', defaultChecked: false },
            ],
        },
    ],
};

const regulatoryFeeEstimatorNode = {
    subtitle: 'Estimate agency fees across jurisdictions — with SME discounts, currency conversion, and multi-product support.',
    canvasTags: [
        { key: 'variationType', defaultValue: 'ia', options: [
            { value: 'ia', label: 'Type IA' },
            { value: 'ib', label: 'Type IB' },
            { value: 'ii', label: 'Type II' },
            { value: 'extension', label: 'Extension' },
        ]},
    ],
    sections: [
        {
            title: 'Inputs', defaultOpen: true, fields: [
                { type: 'select', label: 'Variation Type', options: [
                    { value: 'ia', label: 'Type IA' },
                    { value: 'ib', label: 'Type IB' },
                    { value: 'ii', label: 'Type II' },
                    { value: 'extension', label: 'Extension' },
                ], required: true },
                { type: 'multiselect', label: 'Jurisdiction', options: JURISDICTIONS, required: true },
                { type: 'text', label: 'Number of Products', placeholder: '1' },
                { type: 'select', label: 'Procedure Type', options: [
                    { value: 'centralised', label: 'Centralised' },
                    { value: 'mrp', label: 'MRP' },
                    { value: 'dcp', label: 'DCP' },
                    { value: 'national', label: 'National' },
                ]},
            ],
        },
        {
            title: 'Settings', defaultOpen: true, fields: [
                { type: 'toggle', label: 'Include SME Reduction', defaultChecked: false },
                { type: 'select', label: 'Currency', options: [
                    { value: 'eur', label: 'EUR (€)' },
                    { value: 'gbp', label: 'GBP (£)' },
                    { value: 'usd', label: 'USD ($)' },
                ]},
                { type: 'select', label: 'Fee Schedule Version', options: [
                    { value: 'latest', label: 'Latest' },
                    { value: '2025', label: '2025' },
                    { value: '2024', label: '2024' },
                ]},
            ],
        },
        {
            title: 'Output', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Fee Breakdown', defaultChecked: true },
                { type: 'toggle', label: 'Total Cost', defaultChecked: true },
                { type: 'toggle', label: 'Multi-jurisdiction Comparison', defaultChecked: false },
            ],
        },
    ],
};


// ---------------------------------------------------------------------------
// Logic group
// ---------------------------------------------------------------------------

const ifElseNode = {
    subtitle: 'Evaluate a condition and route data to the True or False output.',
    handles: {
        sources: [
            { id: 'true', label: 'True' },
            { id: 'false', label: 'False' },
        ],
    },
    canvasTags: [
        { key: 'mode', defaultValue: 'expression', options: [
            { value: 'expression', label: 'Expression' },
            { value: 'value', label: 'Value check' },
        ]},
    ],
    sections: [
        {
            title: 'Condition', defaultOpen: true, fields: [
                { type: 'select', label: 'Mode', options: [
                    { value: 'expression', label: 'Expression — evaluate a JS expression' },
                    { value: 'value', label: 'Value check — compare a field' },
                ]},
                { type: 'expression', label: 'Condition', placeholder: '{{ $json.confidence > 70 }}', required: true },
            ],
        },
        {
            title: 'Settings', defaultOpen: false, fields: [
                { type: 'toggle', label: 'Strict Type Checking', defaultChecked: false },
                { type: 'toggle', label: 'Pass Input Data to Both Outputs', defaultChecked: true },
            ],
        },
    ],
};

const switchNode = {
    subtitle: 'Route data to different outputs based on a field value or set of rules.',
    handles: {
        sources: [
            { id: 'case-1', label: '1' },
            { id: 'case-2', label: '2' },
            { id: 'case-3', label: '3' },
            { id: 'fallback', label: '⌀' },
        ],
    },
    canvasTags: [
        { key: 'mode', defaultValue: 'rules', options: [
            { value: 'rules', label: 'Rules' },
            { value: 'expression', label: 'Expression value' },
        ]},
    ],
    sections: [
        {
            title: 'Routing', defaultOpen: true, fields: [
                { type: 'select', label: 'Mode', options: [
                    { value: 'rules', label: 'Match rules — evaluate per-case conditions' },
                    { value: 'expression', label: 'Expression value — route by exact match' },
                ]},
                { type: 'expression', label: 'Routing Key', placeholder: '{{ $json.department }}', required: true },
            ],
        },
        {
            title: 'Cases', defaultOpen: true, fields: [
                { type: 'text', label: 'Output 1', placeholder: 'e.g. RA' },
                { type: 'text', label: 'Output 2', placeholder: 'e.g. CMC' },
                { type: 'text', label: 'Output 3', placeholder: 'e.g. QA' },
            ],
        },
        {
            title: 'Fallback', defaultOpen: false, fields: [
                { type: 'select', label: 'On No Match', options: [
                    { value: 'fallback', label: 'Route to Fallback output' },
                    { value: 'error', label: 'Throw error' },
                    { value: 'ignore', label: 'Drop silently' },
                ]},
            ],
        },
    ],
};

// ---------------------------------------------------------------------------
// Export the full map keyed by node label
// ---------------------------------------------------------------------------

export const nodeConfigs = {
    // Inputs
    'Input': inputNode,
    'Files': filesNode,
    'Trigger': triggerNode,
    'URL': urlNode,
    'Audio': audioNode,

    // Outputs
    'Output': outputNode,
    'Send Notification': sendNotificationNode,

    // Core Nodes
    'Ask AI': askAiNode,
    'Review / Approve': reviewApproveNode,
    'Regunaut API': regunautApiNode,

    // Document Intelligence
    'CC Form': ccFormNode,
    'SmPC/PIL': smpcPilNode,
    'CTD Module': ctdModuleNode,
    'PSUR/PBRER': psurPbrerNode,
    'RMP': rmpNode,
    'IND/CTA': indCtaNode,
    'CTD Checklist Generator': ctdChecklistGeneratorNode,

    // Classifiers
    'Variation Type Classifier': variationTypeClassifierNode,
    'Submission Route Selector': submissionRouteSelectorNode,
    'Variation Grouping Optimiser': variationGroupingOptimiserNode,
    'Risk Classifier': riskClassifierNode,

    // Validators
    'Dossier Gap Analysis': dossierGapAnalysisNode,
    'Submission Completeness': submissionCompletenessNode,
    'SmPC Consistency': smpcConsistencyNode,
    'Timeline Compliance': timelineComplianceNode,

    // Calculators
    'Submission Deadline': submissionDeadlineNode,
    'Regulatory Fee Estimator': regulatoryFeeEstimatorNode,

    // Logic
    'If/Else': ifElseNode,
    'Switch': switchNode,
};
