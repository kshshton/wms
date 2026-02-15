# Warehouse Management System - Bachelor's Project

<div align="center">
  <img src="assets/architecture.drawio.svg" alt="Architecture" width="500"/>
</div>

## Overview

A comprehensive warehouse management system with multiple interfaces for administrators, employees, and customers. Built with modern web and mobile technologies.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Database** | PostgreSQL with Prisma ORM |
| **Backend** | Node.js + Express.js |
| **Admin Dashboard** | React + Vite |
| **Mobile Apps** | React Native |

## Project Structure

###  Core Components

#### **server/** - Backend API
- **Framework**: Node.js + Express
- **Database**: PostgreSQL with Prisma ORM
- **Purpose**: RESTful API serving all clients
- **Key Features**:
  - JWT authentication & authorization
  - Bcrypt password hashing
  - CORS support
  - Comprehensive test suite (Jest)
  - Nodemon for development mode
  - Cookie-based session management
- **Running**: 
pm run dev (development) or 
pm start (production)

#### **admin/** - Web Management Dashboard
- **Framework**: React + Vite
- **Purpose**: Main management interface for warehouse administration
- **Key Features**:
  - Material-UI (MUI) components with advanced data grid
  - QR code generation for inventory tracking
  - Responsive, modern dashboard UI
  - PDF export capabilities (html2canvas)
  - React Router for multi-page navigation
  - Real-time data visualization
- **Running**: 
pm run dev (starts Vite dev server on http://localhost:5173)
- **Building**: 
pm run build (production build)

#### **user/** - Employee Mobile App
- **Framework**: React Native
- **Purpose**: Employee view for warehouse operations and order fulfillment
- **Key Features**:
  - QR code scanning for inventory tracking
  - Camera integration for product identification
  - Bottom tab and stack navigation
  - AsyncStorage for local data persistence
  - JWT authentication (jwt-decode)
  - Axios for API communication
  - Mobile permissions handling
- **Platforms**: iOS & Android
- **Running**: 
pm start (Metro bundler)
  - **Android**: 
pm run android
  - **iOS**: 
pm run ios

#### **orders/** - Online Shop Mobile App
- **Framework**: React Native
- **Purpose**: Customer-facing mobile application for browsing and placing orders
- **Key Features**:
  - Formik-based form validation with Yup
  - React Navigation (stack navigation)
  - Gesture handlers for intuitive mobile UX
  - UUID generation for order tracking
  - Checkbox components for product selection
  - Environment configuration with dotenv
- **Platforms**: iOS & Android
- **Running**: 
pm start (Metro bundler)
  - **Android**: 
pm run android
  - **iOS**: 
pm run ios

#### **assets/** - Static Resources
- Shared media and documentation assets (e.g., architecture diagrams)

## Folder Structure Details

```
wms/
├── admin/              # React + Vite web dashboard
├── orders/             # React Native customer app
├── user/               # React Native employee app
├── server/             # Express.js backend API
├── assets/             # Shared static resources
└── README.md
```

### Directory Breakdown

| Directory | Purpose | Technology |
|-----------|---------|-----------|
| **admin/** | Web-based management dashboard | React, Vite, Material-UI |
| **orders/** | Customer mobile app for browsing and ordering | React Native, Formik |
| **user/** | Employee mobile app for warehouse operations | React Native, Expo |
| **server/** | Backend API and business logic | Node.js, Express, PostgreSQL |
| **assets/** | Shared static resources and documentation | Media files, diagrams |

## Installation & Setup

### Prerequisites
- Node.js v16+ 
- PostgreSQL database
- Android Studio (for Android development)
- Xcode (for iOS development)
- npm or yarn package manager

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Admin Dashboard Setup
```bash
cd admin
npm install
npm run dev
```

### Mobile Apps Setup
```bash
cd user
npm install
npm start

# In another terminal, choose your platform:
npm run android   # or
npm run ios
```

## API Endpoints

The server provides REST endpoints for:
- Authentication & user management
- Product management
- Order management
- Sector/warehouse management
- Customer management
- Address management

See server/routes/ for detailed endpoint definitions.

## Testing

Each module includes Jest test suites:
```bash
cd <module>
npm test
```

## Development

- **Environment Files**: Create .env files in server/ and client directories for configuration
- **Database Schema**: See server/prisma/schema.prisma for data model
- **API Documentation**: Review controller files in server/controllers/ for endpoint details
