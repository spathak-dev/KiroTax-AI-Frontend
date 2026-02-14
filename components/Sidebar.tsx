'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { hasPermission } from '@/lib/permissions';
import {
    HomeIcon,
    DocumentArrowUpIcon,
    ClipboardDocumentCheckIcon,
    CheckCircleIcon,
    ChartBarIcon,
    BanknotesIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    permission?: string;
}

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();

    if (!user) return null;

    const baseNavItems: NavItem[] = [
        {
            label: 'Dashboard',
            href: `/dashboard/${user.role.toLowerCase().replace('_', '-')}`,
            icon: HomeIcon,
        },
    ];

    const roleSpecificItems: NavItem[] = [];

    // Add role-specific navigation items
    if (user.role === 'ARTICLE') {
        roleSpecificItems.push({
            label: 'Upload Documents',
            href: `/dashboard/${user.role.toLowerCase().replace('_', '-')}/upload`,
            icon: DocumentArrowUpIcon,
        });
    }

    if (user.role === 'AUDIT') {
        roleSpecificItems.push({
            label: 'Audit Queue',
            href: `/dashboard/${user.role.toLowerCase().replace('_', '-')}/audit`,
            icon: ClipboardDocumentCheckIcon,
        });
    }

    if (user.role === 'SENIOR_CA' || user.role === 'PRACTICE_HEAD') {
        roleSpecificItems.push({
            label: 'Approvals',
            href: `/dashboard/${user.role.toLowerCase().replace('_', '-')}/approval`,
            icon: CheckCircleIcon,
        });
    }

    if (user.role === 'INVESTOR' || user.role === 'OWNER' || user.role === 'PRACTICE_HEAD') {
        roleSpecificItems.push({
            label: 'Investments',
            href: `/dashboard/${user.role.toLowerCase().replace('_', '-')}/investments`,
            icon: BanknotesIcon,
        });
    }

    if (user.role === 'OWNER' || user.role === 'PRACTICE_HEAD' || hasPermission(user.role, 'view_analytics')) {
        roleSpecificItems.push({
            label: 'Analytics',
            href: `/dashboard/${user.role.toLowerCase().replace('_', '-')}/analytics`,
            icon: ChartBarIcon,
        });
    }

    if (user.role === 'OWNER') {
        roleSpecificItems.push({
            label: 'Accounting',
            href: `/dashboard/${user.role.toLowerCase().replace('_', '-')}/accounting`,
            icon: DocumentTextIcon,
        });
    }

    const navItems = [...baseNavItems, ...roleSpecificItems];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-900">KiroTax Console</h1>
                <p className="text-sm text-gray-500 mt-1">{user.name}</p>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                    Role: <span className="font-medium text-gray-700">{user.role.replace('_', ' ')}</span>
                </p>
            </div>
        </aside>
    );
}
