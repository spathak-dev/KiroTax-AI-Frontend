import React from 'react';
import { DocumentStatus } from '@/types';

interface StatusBadgeProps {
    status: DocumentStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusStyles = () => {
        switch (status) {
            case 'approved':
                return 'status-badge status-approved';
            case 'pending':
                return 'status-badge status-pending';
            case 'flagged':
                return 'status-badge status-flagged';
            default:
                return 'status-badge';
        }
    };

    const getStatusText = () => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return <span className={getStatusStyles()}>{getStatusText()}</span>;
}
