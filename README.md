# KiroTax Console

A professional CA & GST automation platform built with Next.js 14, TypeScript, and TailwindCSS.

## Overview

KiroTax Console is a banking-grade dashboard for CA firms to manage document processing, GST compliance, and investment tracking with role-based access control.

## 📚 Documentation

### Architecture & Design Documentation

This project includes comprehensive documentation with visual diagrams:

- **[DIAGRAMS_INDEX.md](DIAGRAMS_INDEX.md)** - Central index for all diagrams and quick reference guide
  - Visual architecture diagrams
  - Technology stack visualization
  - RBAC hierarchy
  - Workflow diagrams
  - Quick reference for all roles and permissions

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete system architecture documentation
  - System architecture overview
  - Technology stack details
  - Data flow architecture
  - Document processing workflow
  - Component architecture
  - API integration layer
  - Security architecture
  - Deployment architecture

- **[WIREFRAMES.md](WIREFRAMES.md)** - Comprehensive UI/UX wireframes and mockups
  - All 6 role-specific dashboard wireframes
  - Common component designs
  - Responsive design specifications
  - Accessibility features
  - Design system guidelines

- **[QUICK_START.md](QUICK_START.md)** - 5-minute setup guide
- **[IMPLEMENTATION.md](IMPLEMENTATION.md)** - Detailed feature documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project statistics and achievements

### Visual Diagrams Included

✅ System Architecture Diagram  
✅ Technology Stack Diagram  
✅ RBAC Hierarchy Diagram  
✅ Document Processing Workflow  
✅ Article Upload Interface Wireframe  
✅ Audit Verification Interface Wireframe  
✅ Data Flow Diagrams  

## Features

- **Role-Based Access Control (RBAC)**: 6 distinct roles with granular permissions
- **Document Management**: Upload, OCR extraction, audit, and approval workflow
- **Investment Tracking**: Portfolio management for investors
- **Analytics Dashboard**: Comprehensive business insights for owners
- **Clean UI**: Stripe/Razorpay-inspired minimal design

## Roles & Permissions

### OWNER
- Full system access
- Analytics and reporting
- All client management
- Investment oversight

### PRACTICE_HEAD
- View all clients
- Approve filings
- Investment summary access
- Team performance monitoring

### SENIOR_CA
- View assigned clients
- Approve verified documents
- Send back for corrections

### ARTICLE (Intern)
- Upload documents
- Tag documents (purchase/sales/expense/import)
- Track upload status

### AUDIT
- Verify OCR extracted data
- Edit extracted fields
- Flag mismatches
- Add audit notes

### INVESTOR
- View portfolio
- Add investments
- Update portfolio
- View analytics
- Upload broker statements

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Heroicons
- **State Management**: React Context API
- **Authentication**: JWT-based (placeholder)

## Project Structure

```
├── app/
│   ├── dashboard/
│   │   ├── owner/
│   │   ├── practice-head/
│   │   ├── senior-ca/
│   │   ├── article/
│   │   ├── audit/
│   │   └── investor/
│   ├── login/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── DashboardLayout.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── RoleGuard.tsx
│   ├── UploadCard.tsx
│   ├── OCRFieldsPanel.tsx
│   └── StatusBadge.tsx
├── lib/
│   ├── auth-context.tsx
│   └── permissions.ts
└── types/
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Login

The application is in demo mode. Use any email/password combination and select your role from the dropdown to access the corresponding dashboard.

## Workflow

### Document Processing Flow

1. **Article (Intern)** uploads bill with tag (purchase/sales/expense/import)
2. **OCR System** extracts fields (vendor, GST, amount, date, invoice no, items)
3. **Audit Team** verifies extracted data, can edit fields or flag mismatches
4. **Senior CA** reviews and approves or sends back for correction
5. **Approved documents** appear in accounting, tax, analytics, and investor dashboards

## Design Philosophy

- **Banking-Grade**: Clean, minimal, professional
- **No Flashy UI**: Focused on functionality and clarity
- **Stripe/Razorpay Inspired**: Neutral colors, strong hierarchy
- **Accessibility**: Clear typography, proper contrast
- **Responsive**: Works on all screen sizes

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Backend Integration

The frontend is ready to connect to a FastAPI backend. Update the following:

1. Replace mock data in dashboard pages with API calls
2. Update `lib/auth-context.tsx` with actual authentication endpoint
3. Add API service layer in `lib/api.ts`
4. Configure environment variables for API base URL

## License

Proprietary - KiroTax Console
