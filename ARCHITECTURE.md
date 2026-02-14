# 🏗️ KiroTax Console - System Architecture Documentation

## Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Data Flow Architecture](#data-flow-architecture)
4. [Document Processing Workflow](#document-processing-workflow)
5. [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
6. [Component Architecture](#component-architecture)
7. [API Integration Layer](#api-integration-layer)
8. [Security Architecture](#security-architecture)

---

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT TIER (Browser)                     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Next.js 14 Frontend Application            │    │
│  │  (React 18 + TypeScript + TailwindCSS)            │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION TIER                           │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Authentication  │  │  RBAC Engine     │                │
│  │  (JWT-based)     │  │  (Permissions)   │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Role-Specific Dashboard Modules              │  │
│  │  Owner | Practice Head | Senior CA                   │  │
│  │  Article | Audit | Investor                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ REST API
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND TIER                              │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  FastAPI Server  │  │  OCR Processing  │                │
│  │  (Python)        │  │  Engine          │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Business Logic  │  │  Analytics       │                │
│  │  Layer           │  │  Engine          │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                     DATA TIER                                │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  PostgreSQL/     │  │  Redis Cache     │                │
│  │  MongoDB         │  │                  │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  File Storage    │  │  Document Store  │                │
│  │  (S3/Cloud)      │  │                  │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                           │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │  OCR API     │ │  GST Portal  │ │  Email/SMS   │       │
│  │  (Cloud)     │ │  Integration │ │  Service     │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend Layer
```
┌─────────────────────────────────────────────┐
│           FRONTEND TECHNOLOGIES              │
├─────────────────────────────────────────────┤
│ • Next.js 14 (App Router)                   │
│ • React 18                                  │
│ • TypeScript 5.x                            │
│ • TailwindCSS 3.x                           │
│ • Heroicons                                 │
│ • React Context API (State Management)     │
└─────────────────────────────────────────────┘
```

### State & Routing Layer
```
┌─────────────────────────────────────────────┐
│        STATE & ROUTING LAYER                 │
├─────────────────────────────────────────────┤
│ • Next.js App Router (File-based routing)   │
│ • React Context (Auth, Permissions)         │
│ • Client-side State Management              │
│ • Route Guards & RBAC                       │
│ • Protected Routes                          │
└─────────────────────────────────────────────┘
```

### API Integration Layer
```
┌─────────────────────────────────────────────┐
│          API INTEGRATION LAYER               │
├─────────────────────────────────────────────┤
│ • RESTful API Integration                   │
│ • Fetch API / Axios                         │
│ • JWT Token Management                      │
│ • API Service Layer (lib/api.ts)            │
│ • Error Handling & Retry Logic              │
└─────────────────────────────────────────────┘
```

### Backend Layer
```
┌─────────────────────────────────────────────┐
│           BACKEND TECHNOLOGIES               │
├─────────────────────────────────────────────┤
│ • FastAPI (Python)                          │
│ • Pydantic Models (Data Validation)         │
│ • JWT Authentication                        │
│ • Business Logic Layer                      │
│ • OCR Integration                           │
└─────────────────────────────────────────────┘
```

### Data & Services Layer
```
┌─────────────────────────────────────────────┐
│         DATA & SERVICES LAYER                │
├─────────────────────────────────────────────┤
│ • PostgreSQL / MongoDB (Primary DB)         │
│ • Redis (Caching & Session Management)      │
│ • OCR Engine (Tesseract / Cloud Vision)     │
│ • File Storage (AWS S3 / Google Cloud)      │
│ • Document Processing Pipeline              │
└─────────────────────────────────────────────┘
```

### Infrastructure Layer
```
┌─────────────────────────────────────────────┐
│          INFRASTRUCTURE LAYER                │
├─────────────────────────────────────────────┤
│ • Vercel (Frontend Hosting)                 │
│ • AWS / GCP (Backend Services)              │
│ • CDN (Static Asset Delivery)               │
│ • CI/CD Pipeline (GitHub Actions)           │
│ • Monitoring & Logging                      │
└─────────────────────────────────────────────┘
```

### Development Tools
```
┌─────────────────────────────────────────────┐
│          DEVELOPMENT TOOLS                   │
├─────────────────────────────────────────────┤
│ • ESLint (Code Linting)                     │
│ • Prettier (Code Formatting)                │
│ • Git / GitHub (Version Control)            │
│ • npm / yarn (Package Management)           │
│ • TypeScript Compiler                       │
└─────────────────────────────────────────────┘
```

---

## Data Flow Architecture

### Complete System Data Flow

```
┌──────────────┐
│   ARTICLE    │ (Upload Document)
│   (Intern)   │
└──────┬───────┘
       │
       ↓ 1. Upload Document + Tag
┌──────────────────────────────────────┐
│      FRONTEND (Next.js)              │
│  - File validation                   │
│  - Tag selection (purchase/sales/    │
│    expense/import)                   │
│  - Upload to backend                 │
└──────┬───────────────────────────────┘
       │
       ↓ 2. POST /api/documents/upload
┌──────────────────────────────────────┐
│      BACKEND API (FastAPI)           │
│  - Authenticate user                 │
│  - Validate file                     │
│  - Store in file storage             │
│  - Create document record            │
└──────┬───────────────────────────────┘
       │
       ↓ 3. Trigger OCR Processing
┌──────────────────────────────────────┐
│      OCR PROCESSING ENGINE           │
│  - Extract text from document        │
│  - Parse vendor information          │
│  - Extract GST number                │
│  - Parse line items                  │
│  - Calculate totals                  │
└──────┬───────────────────────────────┘
       │
       ↓ 4. Store OCR Data
┌──────────────────────────────────────┐
│      DATABASE                        │
│  - Document metadata                 │
│  - OCR extracted data                │
│  - Status: PENDING                   │
└──────┬───────────────────────────────┘
       │
       ↓ 5. Notify Audit Team
┌──────────────┐
│  AUDIT TEAM  │ (Verify OCR Data)
└──────┬───────┘
       │
       ↓ 6. Review & Edit OCR Fields
┌──────────────────────────────────────┐
│      FRONTEND (Audit Dashboard)      │
│  - View document preview             │
│  - Edit OCR fields                   │
│  - Flag mismatches                   │
│  - Add audit notes                   │
└──────┬───────────────────────────────┘
       │
       ↓ 7. PUT /api/documents/{id}/verify
┌──────────────────────────────────────┐
│      BACKEND API                     │
│  - Update OCR data                   │
│  - Save audit notes                  │
│  - Update status: VERIFIED/FLAGGED   │
└──────┬───────────────────────────────┘
       │
       ↓ 8. Notify Senior CA
┌──────────────┐
│  SENIOR CA   │ (Approve Document)
└──────┬───────┘
       │
       ↓ 9. Review & Approve
┌──────────────────────────────────────┐
│      FRONTEND (Senior CA Dashboard)  │
│  - Review verified documents         │
│  - Approve or send back              │
└──────┬───────────────────────────────┘
       │
       ↓ 10. POST /api/documents/{id}/approve
┌──────────────────────────────────────┐
│      BACKEND API                     │
│  - Update status: APPROVED           │
│  - Trigger analytics update          │
│  - Update accounting records         │
└──────┬───────────────────────────────┘
       │
       ↓ 11. Update Analytics
┌──────────────────────────────────────┐
│      ANALYTICS ENGINE                │
│  - Calculate revenue/expenses        │
│  - Update GST summary                │
│  - Generate financial ratios         │
│  - Update investor reports           │
└──────┬───────────────────────────────┘
       │
       ↓ 12. Display in Dashboards
┌──────────────────────────────────────┐
│  OWNER / PRACTICE HEAD / INVESTOR    │
│  - View updated analytics            │
│  - Access financial reports          │
│  - Monitor business metrics          │
└──────────────────────────────────────┘
```

---

## Document Processing Workflow

### Stage-by-Stage Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    STAGE 1: UPLOAD                           │
├─────────────────────────────────────────────────────────────┤
│ Actor: Article (Intern)                                     │
│ Actions:                                                     │
│  1. Select document file (PDF/JPG/PNG)                      │
│  2. Choose tag (Purchase/Sales/Expense/Import)              │
│  3. Add optional description                                │
│  4. Submit upload                                           │
│                                                              │
│ Output: Document stored with metadata                       │
│ Status: PENDING                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 STAGE 2: OCR EXTRACTION                      │
├─────────────────────────────────────────────────────────────┤
│ Process: Automated OCR                                      │
│ Extracted Fields:                                           │
│  • Vendor Name                                              │
│  • GST Number                                               │
│  • Invoice Number                                           │
│  • Invoice Date                                             │
│  • Subtotal Amount                                          │
│  • GST Amount                                               │
│  • Total Amount                                             │
│  • Line Items (Description, Qty, Rate, Amount)              │
│                                                              │
│ Output: Structured OCR data                                 │
│ Status: PENDING_VERIFICATION                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│               STAGE 3: AUDIT VERIFICATION                    │
├─────────────────────────────────────────────────────────────┤
│ Actor: Audit Team                                           │
│ Actions:                                                     │
│  1. View document preview side-by-side with OCR data        │
│  2. Verify each extracted field                             │
│  3. Edit incorrect fields                                   │
│  4. Flag mismatches if found                                │
│  5. Add audit notes                                         │
│  6. Mark as Verified or Flagged                             │
│                                                              │
│ Output: Verified/Corrected OCR data                         │
│ Status: VERIFIED or FLAGGED                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  STAGE 4: CA APPROVAL                        │
├─────────────────────────────────────────────────────────────┤
│ Actor: Senior CA                                            │
│ Actions:                                                     │
│  1. Review verified documents                               │
│  2. Check audit notes                                       │
│  3. Approve document OR                                     │
│  4. Send back for correction                                │
│                                                              │
│ Output: Final approval decision                             │
│ Status: APPROVED or SENT_BACK                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              STAGE 5: SYSTEM INTEGRATION                     │
├─────────────────────────────────────────────────────────────┤
│ Process: Automated                                          │
│ Updates:                                                     │
│  • Accounting records updated                               │
│  • Tax calculations performed                               │
│  • Analytics dashboard refreshed                            │
│  • Investor reports updated                                 │
│  • GST summary recalculated                                 │
│  • Financial ratios updated                                 │
│                                                              │
│ Output: System-wide data synchronization                    │
│ Status: INTEGRATED                                          │
└─────────────────────────────────────────────────────────────┘
```

### Rejection/Feedback Loop

```
STAGE 4 (CA Approval)
       │
       ├─ APPROVED ──────────────────────────→ STAGE 5 (Integration)
       │
       └─ SENT_BACK ─────────────────────────→ STAGE 3 (Audit)
                                                      │
                                                      └─ Re-verify ──→ STAGE 4
```

---

## Role-Based Access Control (RBAC)

### Role Hierarchy

```
                        ┌─────────────┐
                        │    OWNER    │
                        │ (ALL PERMS) │
                        └──────┬──────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
            ┌───────▼────────┐    ┌──────▼─────────┐
            │ PRACTICE HEAD  │    │   INVESTOR     │
            └───────┬────────┘    └────────────────┘
                    │
            ┌───────▼────────┐
            │   SENIOR CA    │
            └───────┬────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐      ┌──────▼─────────┐
│    ARTICLE     │      │     AUDIT      │
│   (Intern)     │      │                │
└────────────────┘      └────────────────┘
```

### Role Permissions Matrix

| Role | Permissions | Access Level |
|------|-------------|--------------|
| **OWNER** | `*` (All) | • Complete system access<br>• View all clients<br>• Analytics dashboard<br>• Investment oversight<br>• Team management |
| **PRACTICE_HEAD** | `view_all_clients`<br>`approve_filing`<br>`view_investment_summary` | • View all clients<br>• Approve filings<br>• Investment summary<br>• Team performance monitoring |
| **SENIOR_CA** | `view_assigned_clients`<br>`approve_documents` | • View assigned clients only<br>• Approve verified documents<br>• Send back for corrections |
| **ARTICLE** | `upload_documents` | • Upload documents<br>• Tag documents<br>• Track upload status |
| **AUDIT** | `upload_audit_docs`<br>`verify_ocr_data` | • Verify OCR data<br>• Edit extracted fields<br>• Flag mismatches<br>• Add audit notes |
| **INVESTOR** | `view_portfolio`<br>`add_investment`<br>`update_portfolio`<br>`view_analytics`<br>`upload_broker_statement` | • View portfolio<br>• Add investments<br>• Update portfolio<br>• View analytics<br>• Upload broker statements |

### Permission Implementation

```typescript
// lib/permissions.ts
export const rolePermissions: Record<Role, Permission[]> = {
  OWNER: ['*'],
  PRACTICE_HEAD: [
    'view_all_clients',
    'approve_filing',
    'view_investment_summary'
  ],
  SENIOR_CA: ['view_assigned_clients'],
  ARTICLE: ['upload_documents'],
  AUDIT: ['upload_audit_docs'],
  INVESTOR: [
    'view_portfolio',
    'add_investment',
    'update_portfolio',
    'view_analytics',
    'upload_broker_statement'
  ]
};

export function hasPermission(role: Role, permission: Permission): boolean {
  const permissions = rolePermissions[role];
  return permissions.includes('*') || permissions.includes(permission);
}
```

---

## Component Architecture

### Frontend Component Hierarchy

```
App (layout.tsx)
│
├── AuthProvider (lib/auth-context.tsx)
│   └── Authentication state management
│
├── Login Page (app/login/page.tsx)
│   └── Role-based login
│
└── Dashboard Routes (app/dashboard/*)
    │
    ├── RoleGuard (components/RoleGuard.tsx)
    │   └── Route protection based on role
    │
    └── DashboardLayout (components/DashboardLayout.tsx)
        │
        ├── Navbar (components/Navbar.tsx)
        │   ├── User profile
        │   ├── Notifications
        │   └── Logout
        │
        ├── Sidebar (components/Sidebar.tsx)
        │   ├── Navigation menu
        │   └── Role-based menu items
        │
        └── Main Content Area
            │
            ├── Owner Dashboard
            │   ├── Analytics cards
            │   ├── Charts
            │   └── Activity feed
            │
            ├── Practice Head Dashboard
            │   ├── Client overview
            │   ├── Team performance
            │   └── Investment summary
            │
            ├── Senior CA Dashboard
            │   ├── Pending approvals
            │   └── Assigned clients
            │
            ├── Article Dashboard
            │   ├── UploadCard (components/UploadCard.tsx)
            │   └── Upload history
            │
            ├── Audit Dashboard
            │   ├── Document preview
            │   ├── OCRFieldsPanel (components/OCRFieldsPanel.tsx)
            │   └── Pending queue
            │
            └── Investor Dashboard
                ├── Portfolio view
                ├── Investment form
                └── Analytics
```

### Shared Components

```
components/
│
├── DashboardLayout.tsx
│   └── Main layout wrapper with sidebar and navbar
│
├── Navbar.tsx
│   └── Top navigation bar with user profile
│
├── Sidebar.tsx
│   └── Left navigation sidebar with role-based menu
│
├── RoleGuard.tsx
│   └── Route protection component
│
├── UploadCard.tsx
│   └── Document upload component with drag-and-drop
│
├── OCRFieldsPanel.tsx
│   └── OCR data display and editing panel
│
└── StatusBadge.tsx
    └── Status indicator component (pending/approved/flagged)
```

---

## API Integration Layer

### API Service Structure

```typescript
// lib/api.ts

class APIService {
  private baseURL: string;
  private token: string | null;

  // Authentication
  async login(email: string, password: string, role: Role): Promise<User>
  async logout(): Promise<void>
  async refreshToken(): Promise<string>

  // Document Management
  async uploadDocument(file: File, tag: DocumentTag): Promise<Document>
  async getDocuments(filters?: DocumentFilters): Promise<Document[]>
  async getDocument(id: string): Promise<Document>
  async updateDocument(id: string, data: Partial<Document>): Promise<Document>
  async deleteDocument(id: string): Promise<void>

  // OCR Operations
  async verifyOCRData(documentId: string, ocrData: OCRData): Promise<void>
  async flagDocument(documentId: string, notes: string): Promise<void>

  // Approval Workflow
  async approveDocument(documentId: string): Promise<void>
  async rejectDocument(documentId: string, reason: string): Promise<void>

  // Analytics
  async getAnalytics(dateRange?: DateRange): Promise<AnalyticsData>
  async getGSTSummary(): Promise<GSTSummary>
  async getFinancialRatios(): Promise<FinancialRatios>

  // Investment Management
  async getPortfolio(investorId: string): Promise<InvestmentRecord[]>
  async addInvestment(investment: InvestmentRecord): Promise<void>
  async updateInvestment(id: string, data: Partial<InvestmentRecord>): Promise<void>
}
```

### API Endpoints

```
Authentication:
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh

Documents:
GET    /api/documents
POST   /api/documents/upload
GET    /api/documents/{id}
PUT    /api/documents/{id}
DELETE /api/documents/{id}

OCR & Verification:
POST   /api/documents/{id}/verify
POST   /api/documents/{id}/flag
PUT    /api/documents/{id}/ocr-data

Approval Workflow:
POST   /api/documents/{id}/approve
POST   /api/documents/{id}/reject

Analytics:
GET    /api/analytics
GET    /api/analytics/gst-summary
GET    /api/analytics/financial-ratios

Investments:
GET    /api/investments
POST   /api/investments
PUT    /api/investments/{id}
DELETE /api/investments/{id}

Users & Clients:
GET    /api/users
GET    /api/clients
GET    /api/clients/{id}
```

---

## Security Architecture

### Authentication Flow

```
1. User Login
   ↓
2. Frontend sends credentials to /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. Backend generates JWT token
   ↓
5. Frontend stores token in memory/localStorage
   ↓
6. Frontend includes token in Authorization header for all requests
   ↓
7. Backend validates token on each request
   ↓
8. Token refresh before expiration
```

### Security Measures

```
┌─────────────────────────────────────────────┐
│          SECURITY LAYERS                     │
├─────────────────────────────────────────────┤
│ 1. Authentication                           │
│    • JWT-based authentication               │
│    • Secure token storage                   │
│    • Token expiration and refresh           │
│                                              │
│ 2. Authorization                            │
│    • Role-based access control (RBAC)       │
│    • Permission-based route guards          │
│    • API endpoint protection                │
│                                              │
│ 3. Data Protection                          │
│    • HTTPS encryption in transit            │
│    • Encrypted data at rest                 │
│    • Secure file storage                    │
│                                              │
│ 4. Input Validation                         │
│    • Frontend form validation               │
│    • Backend data validation (Pydantic)     │
│    • File type and size validation          │
│                                              │
│ 5. API Security                             │
│    • Rate limiting                          │
│    • CORS configuration                     │
│    • API key management                     │
│                                              │
│ 6. Audit Logging                            │
│    • User action logging                    │
│    • Document access tracking               │
│    • Security event monitoring              │
└─────────────────────────────────────────────┘
```

---

## Deployment Architecture

### Production Deployment

```
┌─────────────────────────────────────────────┐
│              FRONTEND (Vercel)               │
│  • Next.js application                      │
│  • Static asset CDN                         │
│  • Edge functions                           │
│  • Automatic HTTPS                          │
└──────────────┬──────────────────────────────┘
               │
               ↓ API Calls
┌─────────────────────────────────────────────┐
│          BACKEND (AWS/GCP)                   │
│  • FastAPI application                      │
│  • Load balancer                            │
│  • Auto-scaling                             │
│  • Health monitoring                        │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│           DATABASE CLUSTER                   │
│  • Primary database (PostgreSQL/MongoDB)    │
│  • Read replicas                            │
│  • Automated backups                        │
│  • Point-in-time recovery                   │
└─────────────────────────────────────────────┘
```

---

## Performance Optimization

### Frontend Optimization
- Code splitting with Next.js dynamic imports
- Image optimization with Next.js Image component
- Static generation for public pages
- Server-side rendering for dynamic content
- Client-side caching with React Query/SWR

### Backend Optimization
- Database query optimization
- Redis caching layer
- Async processing for OCR
- Background job queues
- API response compression

---

## Monitoring & Logging

```
┌─────────────────────────────────────────────┐
│         MONITORING STACK                     │
├─────────────────────────────────────────────┤
│ • Application Performance Monitoring (APM)  │
│ • Error tracking (Sentry)                   │
│ • Log aggregation (CloudWatch/Stackdriver)  │
│ • Uptime monitoring                         │
│ • User analytics                            │
│ • Database performance monitoring           │
└─────────────────────────────────────────────┘
```

---

## Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Load balancing across multiple instances
- Database read replicas
- CDN for static assets

### Vertical Scaling
- Database optimization
- Caching strategies
- Async processing
- Resource allocation

---

**Document Version**: 1.0  
**Last Updated**: February 14, 2026  
**Maintained By**: KiroTax Development Team
