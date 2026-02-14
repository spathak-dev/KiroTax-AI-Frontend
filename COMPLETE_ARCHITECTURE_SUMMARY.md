# 📊 KiroTax Console - Architecture, Wireframes & Technology Diagrams

## Executive Summary

This document provides a comprehensive overview of the **KiroTax Console** architecture, wireframes, and technology stack. KiroTax Console is a professional CA & GST automation platform designed for CA firms to manage document processing, GST compliance, and investment tracking with enterprise-grade role-based access control.

---

## 🎯 Project Overview

### What is KiroTax Console?

KiroTax Console is a **banking-grade dashboard** that streamlines the entire document processing workflow for Chartered Accountant firms, from document upload through OCR extraction, audit verification, and final approval, with comprehensive analytics and investment tracking capabilities.

### Key Capabilities

1. **Document Processing Automation**
   - Automated OCR extraction from invoices and bills
   - Multi-stage verification workflow
   - Approval management system

2. **Role-Based Access Control (RBAC)**
   - 6 distinct user roles with granular permissions
   - Hierarchical approval workflow
   - Secure authentication and authorization

3. **Investment Management**
   - Portfolio tracking for investors
   - Investment analytics
   - Broker statement processing

4. **Business Analytics**
   - Real-time financial dashboards
   - GST summary and compliance tracking
   - Performance metrics and reporting

---

## 🏗️ System Architecture

### Architecture Layers

```
┌─────────────────────────────────────────────┐
│         CLIENT TIER (Browser)               │
│  Next.js 14 + React 18 + TypeScript         │
└─────────────────┬───────────────────────────┘
                  │ HTTPS
┌─────────────────▼───────────────────────────┐
│         APPLICATION TIER                     │
│  • Authentication (JWT)                     │
│  • RBAC Engine                              │
│  • 6 Role-Specific Dashboards               │
│  • State Management (React Context)         │
└─────────────────┬───────────────────────────┘
                  │ REST API
┌─────────────────▼───────────────────────────┐
│         BACKEND TIER                         │
│  • FastAPI Server (Python)                  │
│  • OCR Processing Engine                    │
│  • Business Logic Layer                     │
│  • Analytics Engine                         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         DATA TIER                            │
│  • PostgreSQL/MongoDB (Primary DB)          │
│  • Redis (Cache)                            │
│  • S3/Cloud Storage (Documents)             │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         EXTERNAL SERVICES                    │
│  • OCR API (Cloud Vision/Tesseract)         │
│  • GST Portal Integration                   │
│  • Email/SMS Notifications                  │
└─────────────────────────────────────────────┘
```

### Visual Diagram

![System Architecture](system_architecture_diagram.png)

**Key Components:**
- **Client Tier:** Modern web application built with Next.js 14
- **Application Tier:** Authentication, RBAC, and role-specific business logic
- **Backend Tier:** FastAPI-based REST API with OCR and analytics
- **Data Tier:** Scalable database and storage solutions
- **External Services:** Third-party integrations for OCR and GST

---

## 💻 Technology Stack

### Complete Technology Stack Visualization

![Technology Stack](technology_stack_diagram.png)

### Layer-by-Layer Breakdown

#### **Layer 1: Frontend**
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with modern features
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Heroicons** - Professional icon set
- **React Context API** - State management

#### **Layer 2: State & Routing**
- **Next.js App Router** - File-based routing
- **React Context** - Authentication and permissions state
- **Client-side State Management** - Local state handling
- **Route Guards & RBAC** - Protected routes

#### **Layer 3: API Layer**
- **RESTful API Integration** - Standard HTTP APIs
- **Axios/Fetch** - HTTP client libraries
- **JWT Authentication** - Token-based auth
- **API Service Layer** - Centralized API calls

#### **Layer 4: Backend**
- **FastAPI** - Modern Python web framework
- **Pydantic Models** - Data validation
- **JWT Authentication** - Secure token handling
- **Business Logic** - Core application logic

#### **Layer 5: Data & Services**
- **PostgreSQL/MongoDB** - Primary database
- **Redis Cache** - Performance optimization
- **OCR Engine** - Document text extraction
- **File Storage (S3/Cloud)** - Document storage

#### **Layer 6: Infrastructure**
- **Vercel** - Frontend hosting
- **AWS/GCP** - Backend hosting
- **CDN** - Content delivery
- **CI/CD Pipeline** - Automated deployment

#### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git/GitHub** - Version control
- **npm/yarn** - Package management

---

## 👥 Role-Based Access Control (RBAC)

### Role Hierarchy Visualization

![RBAC Hierarchy](rbac_hierarchy_diagram.png)

### Role Definitions

#### **1. OWNER** (Top Level)
- **Permissions:** ALL (*)
- **Access:**
  - Complete system access
  - All client management
  - Analytics and reporting
  - Investment oversight
  - Team management

#### **2. PRACTICE HEAD** (Level 2)
- **Permissions:** 
  - `view_all_clients`
  - `approve_filing`
  - `view_investment_summary`
- **Access:**
  - View all clients
  - Approve filings
  - Investment summary
  - Team performance monitoring

#### **3. SENIOR CA** (Level 3)
- **Permissions:**
  - `view_assigned_clients`
  - `approve_documents`
- **Access:**
  - View assigned clients only
  - Approve verified documents
  - Send back for corrections

#### **4. ARTICLE** (Intern - Level 4)
- **Permissions:**
  - `upload_documents`
- **Access:**
  - Upload documents
  - Tag documents (purchase/sales/expense/import)
  - Track upload status

#### **5. AUDIT** (Level 4)
- **Permissions:**
  - `upload_audit_docs`
  - `verify_ocr_data`
- **Access:**
  - Verify OCR extracted data
  - Edit extracted fields
  - Flag mismatches
  - Add audit notes

#### **6. INVESTOR** (Level 4)
- **Permissions:**
  - `view_portfolio`
  - `add_investment`
  - `update_portfolio`
  - `view_analytics`
  - `upload_broker_statement`
- **Access:**
  - View portfolio
  - Add investments
  - Update portfolio
  - View analytics
  - Upload broker statements

---

## 🔄 Document Processing Workflow

### Complete Workflow Visualization

![Document Workflow](workflow_diagram.png)

### Stage-by-Stage Process

#### **Stage 1: UPLOAD** 🔵
- **Actor:** Article (Intern)
- **Actions:**
  1. Select document file (PDF/JPG/PNG)
  2. Choose document tag (Purchase/Sales/Expense/Import)
  3. Add optional description
  4. Submit upload
- **Output:** Document stored with metadata
- **Status:** PENDING

#### **Stage 2: OCR EXTRACTION** 🟣
- **Process:** Automated OCR Processing
- **Extracted Fields:**
  - Vendor Name
  - GST Number
  - Invoice Number
  - Invoice Date
  - Subtotal Amount
  - GST Amount
  - Total Amount
  - Line Items (Description, Quantity, Rate, Amount)
- **Output:** Structured OCR data
- **Status:** PENDING_VERIFICATION

#### **Stage 3: AUDIT VERIFICATION** 🟠
- **Actor:** Audit Team
- **Actions:**
  1. View document preview side-by-side with OCR data
  2. Verify each extracted field
  3. Edit incorrect fields
  4. Flag mismatches if found
  5. Add audit notes
  6. Mark as Verified or Flagged
- **Output:** Verified/Corrected OCR data
- **Status:** VERIFIED or FLAGGED

#### **Stage 4: CA APPROVAL** 🟢
- **Actor:** Senior CA
- **Actions:**
  1. Review verified documents
  2. Check audit notes
  3. Approve document OR
  4. Send back for correction
- **Output:** Final approval decision
- **Status:** APPROVED or SENT_BACK

#### **Stage 5: INTEGRATION** 🔵
- **Process:** Automated System Integration
- **Updates:**
  - Accounting records updated
  - Tax calculations performed
  - Analytics dashboard refreshed
  - Investor reports updated
  - GST summary recalculated
  - Financial ratios updated
- **Output:** System-wide data synchronization
- **Status:** INTEGRATED

### Feedback Loops

```
Stage 4 (CA Approval)
  ├─ APPROVED ──────────────→ Stage 5 (Integration)
  └─ SENT_BACK ─────────────→ Stage 3 (Audit)
                                    └─ Re-verify ──→ Stage 4

Stage 3 (Audit)
  └─ FLAGGED ──────────────→ Stage 1 (Upload)
                                    └─ Re-upload ──→ Stage 2
```

---

## 🎨 User Interface Wireframes

### Design Philosophy

**Banking-Grade Aesthetic:**
- Clean and minimal design
- Stripe/Razorpay-inspired
- Professional and accessible
- No flashy UI elements
- Focus on functionality and clarity

### Color Palette

```
Primary:    #2563eb (Blue-600)    - Main actions, links
Success:    #16a34a (Green-600)   - Approved, positive
Warning:    #f59e0b (Amber-500)   - Pending, alerts
Error:      #ef4444 (Red-500)     - Flagged, errors
Background: #ffffff (White)       - Main background
            #f9fafb (Gray-50)     - Secondary background
Text:       #111827 (Gray-900)    - Primary text
Border:     #e5e7eb (Gray-200)    - Borders, dividers
```

### Dashboard Wireframes

#### **1. Owner Dashboard**
- **Layout:** Full-featured analytics dashboard
- **Components:**
  - 4 KPI cards (Revenue, Expenses, GST, Net Profit)
  - Revenue vs Expenses bar chart
  - GST summary pie chart
  - Recent documents table
  - Pending approvals table
  - Activity feed
- **Purpose:** Complete business overview and analytics

#### **2. Practice Head Dashboard**
- **Layout:** Team and client management focus
- **Components:**
  - Team overview cards
  - All clients table
  - Team performance metrics
  - Investment summary
  - Approval queue
- **Purpose:** Team oversight and client management

#### **3. Senior CA Dashboard**
- **Layout:** Approval-focused interface
- **Components:**
  - Pending approvals queue (18 items)
  - Document review panel
  - OCR data display
  - Audit notes viewer
  - Quick action buttons (Approve/Send Back/Skip)
  - Assigned clients list
- **Purpose:** Document approval workflow

#### **4. Article (Intern) Dashboard**

![Article Upload Interface](article_upload_wireframe.png)

- **Layout:** Upload-focused interface
- **Components:**
  - Large drag-and-drop upload zone
  - Document tag selection dropdown
  - Optional description field
  - Upload/Cancel buttons
  - Recent uploads panel with status badges
- **Purpose:** Simple, focused document upload

#### **5. Audit Dashboard**

![Audit Verification Interface](audit_verification_wireframe.png)

- **Layout:** Split-view verification interface
- **Components:**
  - Document preview (40% width)
  - OCR data verification panel (60% width)
  - Editable vendor information fields
  - Financial details section
  - Line items table (add/remove rows)
  - Audit notes text area
  - Flag for review checkbox
  - Action buttons (Verify & Approve, Flag Mismatch, Save Draft)
  - Pending queue (horizontal scroll)
- **Purpose:** Efficient OCR data verification

#### **6. Investor Dashboard**
- **Layout:** Portfolio management interface
- **Components:**
  - Portfolio summary cards
  - Investment breakdown table
  - Add new investment form
  - Recent transactions list
  - Performance analytics charts
- **Purpose:** Investment tracking and management

### Common Components

#### **Navbar**
- Logo (left)
- Page title (center)
- User profile, notifications, settings (right)

#### **Sidebar**
- Icon + label navigation
- Active state highlighting
- Role-based menu items
- Collapsible on mobile

#### **Status Badges**
- ✅ Approved (Green)
- ⏳ Pending (Amber)
- 🚩 Flagged (Red)

#### **Upload Card**
- Drag & drop zone
- File type validation
- Browse button alternative

#### **OCR Fields Panel**
- Editable text inputs
- Real-time validation
- Visual indicators

---

## 🔐 Security Architecture

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
5. Frontend stores token (secure)
   ↓
6. Token included in Authorization header for all requests
   ↓
7. Backend validates token on each request
   ↓
8. Token refresh before expiration
```

### Security Layers

1. **Authentication**
   - JWT-based authentication
   - Secure token storage
   - Token expiration and refresh

2. **Authorization**
   - Role-based access control (RBAC)
   - Permission-based route guards
   - API endpoint protection

3. **Data Protection**
   - HTTPS encryption in transit
   - Encrypted data at rest
   - Secure file storage

4. **Input Validation**
   - Frontend form validation
   - Backend data validation (Pydantic)
   - File type and size validation

5. **API Security**
   - Rate limiting
   - CORS configuration
   - API key management

6. **Audit Logging**
   - User action logging
   - Document access tracking
   - Security event monitoring

---

## 📡 API Architecture

### RESTful API Endpoints

#### **Authentication**
```
POST   /api/auth/login      - User login
POST   /api/auth/logout     - User logout
POST   /api/auth/refresh    - Refresh JWT token
```

#### **Documents**
```
GET    /api/documents           - List all documents
POST   /api/documents/upload    - Upload new document
GET    /api/documents/{id}      - Get document details
PUT    /api/documents/{id}      - Update document
DELETE /api/documents/{id}      - Delete document
```

#### **OCR & Verification**
```
POST   /api/documents/{id}/verify    - Verify OCR data
POST   /api/documents/{id}/flag      - Flag document
PUT    /api/documents/{id}/ocr-data  - Update OCR data
```

#### **Approval Workflow**
```
POST   /api/documents/{id}/approve   - Approve document
POST   /api/documents/{id}/reject    - Reject document
```

#### **Analytics**
```
GET    /api/analytics                    - Get analytics data
GET    /api/analytics/gst-summary        - GST summary
GET    /api/analytics/financial-ratios   - Financial ratios
```

#### **Investments**
```
GET    /api/investments        - List investments
POST   /api/investments        - Add investment
PUT    /api/investments/{id}   - Update investment
DELETE /api/investments/{id}   - Delete investment
```

---

## 📱 Responsive Design

### Breakpoint Strategy

```
Mobile:  < 640px
  - Single-column layouts
  - Hidden sidebar (hamburger menu)
  - Stacked cards
  - Mobile-optimized forms
  - Bottom navigation bar

Tablet:  640px - 1024px
  - 2-column layouts
  - Collapsible sidebar
  - Responsive charts
  - Touch-friendly controls

Desktop: > 1024px
  - Full sidebar visible
  - Multi-column layouts
  - Expanded charts and tables
  - All features accessible
```

---

## 🚀 Deployment Architecture

### Production Deployment

```
┌─────────────────────────────────────┐
│     FRONTEND (Vercel)               │
│  • Next.js application              │
│  • Static asset CDN                 │
│  • Edge functions                   │
│  • Automatic HTTPS                  │
└──────────────┬──────────────────────┘
               │ API Calls
┌──────────────▼──────────────────────┐
│     BACKEND (AWS/GCP)                │
│  • FastAPI application              │
│  • Load balancer                    │
│  • Auto-scaling                     │
│  • Health monitoring                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     DATABASE CLUSTER                 │
│  • PostgreSQL/MongoDB (Primary)     │
│  • Read replicas                    │
│  • Automated backups                │
│  • Point-in-time recovery           │
└─────────────────────────────────────┘
```

---

## 📊 Performance Optimization

### Frontend Optimization
- Code splitting with Next.js dynamic imports
- Image optimization with Next.js Image component
- Static generation for public pages
- Server-side rendering for dynamic content
- Client-side caching

### Backend Optimization
- Database query optimization
- Redis caching layer
- Async processing for OCR
- Background job queues
- API response compression

---

## 📈 Scalability Considerations

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

## 🎯 Key Features Summary

### By Role

| Role | Key Features |
|------|-------------|
| **Owner** | Complete analytics, All clients, Investment oversight, Team management |
| **Practice Head** | All clients view, Team performance, Investment summary, Approvals |
| **Senior CA** | Assigned clients, Document approval, Send back corrections |
| **Article** | Document upload, Tag selection, Upload history |
| **Audit** | OCR verification, Field editing, Flag mismatches, Audit notes |
| **Investor** | Portfolio view, Add investments, Analytics, Broker statements |

---

## 📂 Project Structure

```
KiroTax-AI-Frontend-main/
├── app/                      # Next.js App Router
│   ├── dashboard/           # Role-specific dashboards
│   │   ├── owner/
│   │   ├── practice-head/
│   │   ├── senior-ca/
│   │   ├── article/
│   │   ├── audit/
│   │   └── investor/
│   ├── login/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/              # Reusable components
│   ├── DashboardLayout.tsx
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   ├── RoleGuard.tsx
│   ├── UploadCard.tsx
│   ├── OCRFieldsPanel.tsx
│   └── StatusBadge.tsx
│
├── lib/                     # Utilities
│   ├── auth-context.tsx
│   ├── permissions.ts
│   └── api.ts
│
├── types/                   # TypeScript definitions
│   └── index.ts
│
├── Documentation/           # Project documentation
│   ├── ARCHITECTURE.md      # ⭐ This file
│   ├── WIREFRAMES.md
│   ├── DIAGRAMS_INDEX.md
│   ├── README.md
│   ├── IMPLEMENTATION.md
│   ├── DEPLOYMENT.md
│   ├── PROJECT_SUMMARY.md
│   └── QUICK_START.md
│
└── Configuration files
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.9.0 or higher
- npm or yarn

### Quick Start
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### Demo Login
- **Email:** any@example.com
- **Password:** any password
- **Role:** Select from dropdown

---

## 📖 Documentation Index

1. **[DIAGRAMS_INDEX.md](DIAGRAMS_INDEX.md)** - Central index and quick reference
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete system architecture
3. **[WIREFRAMES.md](WIREFRAMES.md)** - UI/UX wireframes and mockups
4. **[QUICK_START.md](QUICK_START.md)** - 5-minute setup guide
5. **[IMPLEMENTATION.md](IMPLEMENTATION.md)** - Feature documentation
6. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide
7. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project statistics

---

## ✅ Deliverables Checklist

- [x] System Architecture Diagram
- [x] Technology Stack Diagram
- [x] RBAC Hierarchy Diagram
- [x] Document Processing Workflow Diagram
- [x] Article Upload Interface Wireframe
- [x] Audit Verification Interface Wireframe
- [x] Complete Architecture Documentation
- [x] Complete Wireframe Documentation
- [x] Diagrams Index with Quick Reference
- [x] Updated README with Documentation Links

---

## 📞 Support

**Maintained By:** KiroTax Development Team  
**Last Updated:** February 14, 2026  
**Version:** 1.0  
**Status:** ✅ Production-Ready

---

**End of Document**
