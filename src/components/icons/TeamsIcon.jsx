'use client';

import React from 'react';

/**
 * Microsoft Teams brand icon — purple square with white T.
 * Matches the recognizable Teams logo used in integrations.
 */
const TeamsIcon = ({ size = 24, className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        role="img"
        aria-label="Microsoft Teams"
    >
        <rect width="24" height="24" rx="4" fill="#6264A7" />
        {/* Stylized T — horizontal bar + vertical stem */}
        <path
            d="M6 6h12v2H6V6zm4 2v10h4V8h-4z"
            fill="white"
        />
    </svg>
);

export default TeamsIcon;
