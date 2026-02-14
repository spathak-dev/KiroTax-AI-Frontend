import { Role, Permission } from '@/types';

export const rolePermissions: Record<Role, Permission[]> = {
    OWNER: ['*'],
    PRACTICE_HEAD: [
        'view_all_clients',
        'approve_filing',
        'view_investment_summary',
    ],
    SENIOR_CA: ['view_assigned_clients'],
    ARTICLE: ['upload_documents'],
    AUDIT: ['upload_audit_docs'],
    INVESTOR: [
        'view_portfolio',
        'add_investment',
        'update_portfolio',
        'view_analytics',
        'upload_broker_statement',
    ],
};

export function hasPermission(userRole: Role, action: Permission): boolean {
    const permissions = rolePermissions[userRole];

    // OWNER has all permissions
    if (permissions.includes('*')) {
        return true;
    }

    return permissions.includes(action);
}

export function getRoleDashboardPath(role: Role): string {
    return `/dashboard/${role.toLowerCase().replace('_', '-')}`;
}

export const roleLabels: Record<Role, string> = {
    OWNER: 'Owner',
    PRACTICE_HEAD: 'Practice Head',
    SENIOR_CA: 'Senior CA',
    ARTICLE: 'Article',
    AUDIT: 'Audit',
    INVESTOR: 'Investor',
};
