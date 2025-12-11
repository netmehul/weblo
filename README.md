# Weblo - AI-Powered Website Builder

Weblo is a modern, AI-powered website builder platform that enables users to create professional websites through an intuitive chat interface and guided wizard. Built with Next.js 16 and React 19, Weblo combines cutting-edge web technologies with a beautiful, user-friendly interface.

## ✨ Features

### 🤖 AI-Powered Chat Interface
- Interactive chat-based website creation
- Real-time implementation plan generation
- Smart plan selection and customization
- Seamless payment integration

### 🎨 Modern UI/UX
- Beautiful, responsive design with Tailwind CSS
- Premium glassmorphism effects and animations
- Dark mode support
- Radix UI components for accessibility

### 🔐 Authentication System
- Secure sign-in and sign-up pages
- Protected routes for dashboard and account pages
- Session management with localStorage
- Dynamic header based on authentication status

### 📊 Dashboard
- Comprehensive project overview
- Quick access to ongoing projects
- Build status tracking
- User account management

### 🧙‍♂️ Multi-Step Wizard
- Guided website creation process
- Business information collection
- Page selection and customization
- Style preferences
- Feature selection
- Plan selection with accordion UI
- Payment integration

### 💳 Payment Integration
- Secure payment processing
- Multiple plan options
- Transparent pricing

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/netmehul/weblo.git
cd weblo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
weblo/
├── app/
│   ├── account/          # User account management page
│   ├── chat/             # AI chat interface
│   ├── components/       # Shared components
│   │   ├── Header.js     # Dynamic navigation header
│   │   ├── ChatHeader.js # Chat page header
│   │   └── WizardLayout.js # Wizard layout wrapper
│   ├── dashboard/        # User dashboard
│   ├── payment/          # Payment processing page
│   ├── signin/           # Sign-in page
│   ├── signup/           # Sign-up page
│   ├── utils/            # Utility functions
│   │   ├── auth.js       # Authentication utilities
│   │   └── wizardData.js # Wizard data management
│   ├── wizard/           # Multi-step wizard
│   │   ├── page.js       # Step 1: Business info
│   │   ├── step2/        # Step 2: Page selection
│   │   ├── step3/        # Step 3: Style preferences
│   │   ├── step4/        # Step 4: Feature selection
│   │   ├── step5/        # Step 5: Review
│   │   └── plan/         # Plan selection
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Homepage
├── components/ui/        # Reusable UI components (Radix UI)
├── lib/                  # Utility libraries
├── public/               # Static assets
├── _legacy/              # Legacy HTML/CSS files
└── tailwind.config.js    # Tailwind configuration
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.8 (App Router)
- **React:** 19.2.1
- **Styling:** Tailwind CSS 3.4.17
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Utilities:** 
  - class-variance-authority
  - clsx
  - tailwind-merge
  - tailwindcss-animate

## 🎯 Key Pages

### Homepage (`/`)
Landing page with hero section, features showcase, and call-to-action to start building.

### Chat Interface (`/chat`)
AI-powered chat interface for creating websites through natural conversation.

### Wizard Flow (`/wizard/*`)
Multi-step guided process:
1. Business information
2. Page selection
3. Style preferences
4. Feature selection
5. Review and confirmation
6. Plan selection
7. Payment

### Dashboard (`/dashboard`)
Protected user dashboard showing projects, build status, and quick actions.

### Account (`/account`)
User account settings and profile management.

### Authentication (`/signin`, `/signup`)
Modern authentication pages with split-screen design.

## 🔒 Authentication

The application uses a client-side authentication system with localStorage:

- `isAuthenticated()` - Check authentication status
- `login(email, password)` - User login
- `logout()` - User logout
- Protected routes automatically redirect unauthenticated users

## 🎨 Design System

Weblo uses a custom design system built on Tailwind CSS with:
- Custom color palette with HSL variables
- Responsive typography
- Consistent spacing and sizing
- Smooth animations and transitions
- Glassmorphism effects
- Dark mode support

## 📝 License

This project is private and proprietary.

## 👥 Author

**Mehul** - [netmehul](https://github.com/netmehul)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- Tailwind CSS for the utility-first CSS framework
- Vercel for hosting and deployment platform

---

**Built with ❤️ using Next.js and React**
