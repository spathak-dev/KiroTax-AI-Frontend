/**
 * API Configuration
 * Update these values when connecting to your FastAPI backend
 */

export const API_CONFIG = {
    // Base URL for API endpoints
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',

    // API timeout in milliseconds
    timeout: 30000,

    // Enable/disable request logging
    enableLogging: process.env.NODE_ENV === 'development',
};

/**
 * API Endpoints
 * Centralized endpoint definitions
 */
export const API_ENDPOINTS = {
    // Authentication
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        me: '/auth/me',
        refresh: '/auth/refresh',
    },

    // Documents
    documents: {
        list: '/documents',
        upload: '/documents/upload',
        get: (id: string) => `/documents/${id}`,
        updateStatus: (id: string) => `/documents/${id}/status`,
        ocr: (id: string) => `/documents/${id}/ocr`,
    },

    // Audit
    audit: {
        queue: '/audit/queue',
        verify: (id: string) => `/audit/${id}/verify`,
        flag: (id: string) => `/audit/${id}/flag`,
    },

    // Approvals
    approvals: {
        pending: '/approvals/pending',
        approve: (id: string) => `/approvals/${id}/approve`,
        reject: (id: string) => `/approvals/${id}/reject`,
    },

    // Investments
    investments: {
        list: '/investments',
        create: '/investments',
        get: (id: string) => `/investments/${id}`,
        portfolio: '/investments/portfolio',
    },

    // Analytics
    analytics: {
        overview: '/analytics/overview',
        gst: '/analytics/gst',
        financials: '/analytics/financials',
    },

    // Clients
    clients: {
        list: '/clients',
        get: (id: string) => `/clients/${id}`,
    },
};

/**
 * HTTP Headers
 */
export const getAuthHeaders = (token?: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

/**
 * API Error Handler
 */
export class APIError extends Error {
    constructor(
        public status: number,
        public message: string,
        public data?: any
    ) {
        super(message);
        this.name = 'APIError';
    }
}

/**
 * Generic API Request Function
 * 
 * Example usage:
 * ```typescript
 * const data = await apiRequest<Document[]>('/documents', {
 *   method: 'GET',
 *   token: user.token,
 * });
 * ```
 */
export async function apiRequest<T>(
    endpoint: string,
    options: {
        method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
        body?: any;
        token?: string;
        headers?: Record<string, string>;
    } = {}
): Promise<T> {
    const { method = 'GET', body, token, headers = {} } = options;

    const url = `${API_CONFIG.baseURL}${endpoint}`;

    const config: RequestInit = {
        method,
        headers: {
            ...getAuthHeaders(token),
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    if (API_CONFIG.enableLogging) {
        console.log(`[API] ${method} ${url}`, body || '');
    }

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new APIError(
                response.status,
                errorData.message || response.statusText,
                errorData
            );
        }

        const data = await response.json();

        if (API_CONFIG.enableLogging) {
            console.log(`[API] Response:`, data);
        }

        return data;
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }

        throw new APIError(
            500,
            error instanceof Error ? error.message : 'Network error',
            error
        );
    }
}

/**
 * File Upload Function
 * 
 * Example usage:
 * ```typescript
 * const result = await uploadFile(file, 'purchase', user.token);
 * ```
 */
export async function uploadFile(
    file: File,
    tag: string,
    token: string
): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tag', tag);

    const url = `${API_CONFIG.baseURL}${API_ENDPOINTS.documents.upload}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(
            response.status,
            errorData.message || 'Upload failed',
            errorData
        );
    }

    return response.json();
}
