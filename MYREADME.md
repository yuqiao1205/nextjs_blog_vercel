# Lauren's Next.js Blog

A modern, full-stack blog application built with Next.js 16, featuring authentication, blog management, and a responsive design.

## Project Overview

This is a Next.js blog application that combines server-side rendering with client-side interactivity. The project includes user authentication, blog post management, and an admin panel for content management.

## Project Structure

### Frontend (Next.js App Router)
```
src/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication route group
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   └── forgot-password/     # Password reset (placeholder)
│   ├── admin/                   # Admin panel (protected)
│   ├── blog/                    # Blog pages
│   │   ├── [slug]/             # Individual blog post pages
│   │   └── page.tsx            # Blog listing page
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── api/                     # API routes
│   │   ├── auth/[...nextauth]/ # NextAuth.js API route
│   │   └── blog/               # Blog API routes
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── loading.tsx             # Loading UI
├── components/                  # React components
│   ├── navbar/                  # Navigation components
│   │   ├── links/              # Navigation links
│   │   └── navLink/            # Individual nav link
│   ├── footer/                 # Footer component
│   ├── PostCard/               # Blog post card component
│   ├── postUser/               # Post author component
│   ├── loginForm/              # Login form component
│   ├── registerForm/           # Registration form component
│   └── providers/              # Context providers (empty)
├── lib/                        # Utility libraries
│   ├── auth.config.ts          # NextAuth configuration
│   ├── auth.ts                 # NextAuth setup with providers
│   ├── action.js               # Server actions for auth
│   ├── data.js                 # Data access functions
│   ├── posts.js                # Blog posts data
│   └── users.js                # User data
└── middleware.ts               # NextAuth middleware
```

### Backend API
The backend consists of Next.js API routes that handle:
- **Authentication**: NextAuth.js integration with GitHub OAuth and credentials
- **Blog Management**: CRUD operations for blog posts
- **User Management**: User registration and authentication

## Component Hierarchy & TSX Files

### Parent Components (Top-level Layout)
- **`src/app/layout.tsx`** - Root layout component that wraps all pages. Contains the main HTML structure, navbar, and footer. Sets global metadata and applies the container styling.
- **`src/app/page.tsx`** - Home page component displaying the hero section with blog description and call-to-action buttons.

### Authentication Components
- **`src/app/(auth)/login/page.tsx`** - Login page that renders both GitHub OAuth button and credentials login form.
- **`src/app/(auth)/register/page.tsx`** - Registration page with form validation and user creation.

### Blog Components
- **`src/app/blog/page.tsx`** - Blog listing page that fetches and displays all blog posts using PostCard components.
- **`src/app/blog/[slug]/page.tsx`** - Individual blog post page with dynamic routing, displaying full post content with author information.

### Reusable Components

#### Navigation (Parent: Navbar)
- **`src/components/navbar/Navbar.tsx`** - Main navigation bar component (parent). Fetches user session and passes it to Links component.
- **`src/components/navbar/links/Links.tsx`** - Navigation links container (child of Navbar). Handles responsive menu logic and conditional rendering based on authentication status.
- **`src/components/navbar/links/navLink/navLink.tsx`** - Individual navigation link component (child of Links). Uses Next.js usePathname for active link styling.

#### Content Components
- **`src/components/PostCard/PostCard.tsx`** - Blog post preview card component used in blog listing. Displays post image, title, excerpt, and "Read More" link.
- **`src/components/postUser/PostUsers.tsx`** - Author information component used in individual post pages.
- **`src/components/footer/Footer.tsx`** - Simple footer component with copyright information.

#### Form Components
- **`src/components/loginForm/loginForm.tsx`** - Client-side login form with NextAuth integration and error handling.
- **`src/components/registerForm/registerForm.tsx`** - Client-side registration form using React Server Actions for form submission.

## TypeScript/JavaScript Files Explanation

### Authentication System
- **`src/lib/auth.config.ts`** - NextAuth configuration with custom types and authorization callbacks. Defines session/user type extensions and route protection rules.
- **`src/lib/auth.ts`** - NextAuth setup with GitHub and credentials providers. Includes custom sign-in logic and session management.
- **`src/middleware.ts`** - NextAuth middleware that runs on every request to enforce authentication rules.
- **`src/lib/action.js`** - Server actions for authentication operations (GitHub sign-in, logout, registration, login).

### Data Layer
- **`src/lib/data.js`** - Data access layer with functions for retrieving users and posts. Includes password hashing for user creation.
- **`src/lib/posts.js`** - Static blog posts data (currently hardcoded sample data).
- **`src/lib/users.js`** - Static user data with hashed passwords (currently hardcoded sample users).

### API Routes
- **`src/app/api/auth/[...nextauth]/route.ts`** - NextAuth API route handler that exports GET/POST handlers.
- **`src/app/api/blog/route.ts`** - Blog API route for fetching all posts (GET method).
- **`src/app/api/blog/[slug]/route.ts`** - Dynamic blog API route for individual posts (GET/DELETE methods).

## Core Files & Important Components

### Most Critical Files:
1. **`src/lib/auth.ts`** - Core authentication setup with providers and session management
2. **`src/lib/auth.config.ts`** - Authorization rules and session configuration
3. **`src/middleware.ts`** - Route protection middleware
4. **`src/app/layout.tsx`** - Root layout defining the app structure
5. **`src/lib/data.js`** - Data access layer connecting frontend to backend

### Key Components:
1. **`src/components/navbar/Navbar.tsx`** - Navigation with authentication state
2. **`src/components/PostCard/PostCard.tsx`** - Blog post display component
3. **`src/components/loginForm/loginForm.tsx`** - User authentication interface

## Authentication System Deep Dive

### Architecture
The authentication system uses **NextAuth.js v5** (beta) with multiple providers:

#### Providers:
1. **GitHub OAuth** - Social login integration
2. **Credentials Provider** - Username/password authentication

#### Key Features:
- **Session Management**: JWT-based sessions with custom user properties (`isAdmin`)
- **Route Protection**: Middleware-based authorization with role-based access
- **Password Security**: bcrypt hashing for credential storage
- **Admin Panel**: Restricted access for admin users only

### Authentication Flow

#### Registration:
1. User submits registration form (`registerForm.tsx`)
2. Server action (`register` in `action.js`) validates input
3. Password is hashed using bcrypt (`createUser` in `data.js`)
4. User data is stored in `users.js` file
5. User is redirected to login page

#### Login:
1. User submits login form (`loginForm.tsx`)
2. NextAuth credentials provider validates against stored users
3. Password comparison using bcrypt
4. JWT session created with user data
5. User redirected to home page

#### Authorization:
- **Middleware Protection**: `middleware.ts` runs on every request
- **Route Guards**: Admin routes require `isAdmin: true`
- **Session Callbacks**: Custom JWT/session handling in `auth.config.ts`
- **Conditional UI**: Navbar shows different links based on auth status

### Security Features:
- **Password Hashing**: bcrypt with salt rounds for secure storage
- **Session Encryption**: NextAuth handles JWT encryption
- **Route Protection**: Middleware prevents unauthorized access
- **CSRF Protection**: Built into NextAuth.js
- **OAuth Security**: GitHub handles OAuth flow security

### Admin Features:
- Admin users have `isAdmin: true` in their session
- Access to `/admin` route (currently basic placeholder)
- Conditional navigation links in navbar
- Future expansion for content management

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create `.env.local` with:
   ```
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Home: `http://localhost:3000`
   - Blog: `http://localhost:3000/blog`
   - Login: `http://localhost:3000/login`
   - Admin (admin users only): `http://localhost:3000/admin`

## Technologies Used

- **Framework**: Next.js 16 with App Router
- **Authentication**: NextAuth.js v5
- **Styling**: CSS Modules with responsive design
- **TypeScript**: Full type safety
- **Security**: bcrypt for password hashing
- **State Management**: React Server Components & Client Components

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Admin panel for content management
- Comment system
- User profiles and avatars
- Email notifications
- Search functionality
- Categories and tags
