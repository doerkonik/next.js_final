# dTech Hosting Platform

A modern, full-stack hosting platform built with Next.js 14, featuring domain registration, hosting plans, VPS services, and a comprehensive admin dashboard.

## 🚀 Features

- **Domain Management** - Browse and register domain names
- **Hosting Plans** - Various hosting packages with detailed features
- **VPS Services** - Virtual private server offerings
- **Admin Dashboard** - Full CRUD operations for content management
- **Authentication** - Secure user authentication with role-based access
- **Responsive Design** - Mobile-first design with dark mode support
- **Modern UI** - Glass morphism effects and smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom glass morphism effects
- **Deployment**: Ready for Vercel/Netlify deployment

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-jwt-key-here-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# External API (if needed)
NEXT_PUBLIC_EXTERNAL_API_URL="https://your-api-url.com/api/v1"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed the database with initial data
npm run db:seed
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication routes
│   │   │   ├── domains/       # Domain management API
│   │   │   ├── hosting/       # Hosting plans API
│   │   │   └── vps/           # VPS plans API
│   │   ├── domain/            # Domain listing page
│   │   ├── hosting/           # Hosting plans page
│   │   ├── signin/            # Sign in page
│   │   ├── signup/            # Sign up page
│   │   ├── vps/               # VPS plans page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx         # Navigation component
│   │   ├── ThemeProvider.tsx  # Theme provider
│   │   └── UI.tsx             # UI components
│   ├── hooks/                 # Custom hooks
│   │   └── useAuthForms.ts    # Authentication hooks
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client
│   │   └── api.ts             # Axios configuration
│   └── types/                 # TypeScript type definitions
│       └── next-auth.d.ts     # NextAuth type extensions
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts               # Database seeding script
│   └── migrations/           # Database migrations
├── public/                   # Static assets
├── .env                      # Environment variables
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:seed      # Seed database with initial data
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client

# Type checking
npm run type-check   # Run TypeScript type checking
```

## 🔐 Authentication

The application uses NextAuth.js for authentication with the following features:

- **Credentials Provider**: Email/password authentication
- **Role-based Access**: Admin and regular user roles
- **JWT Sessions**: Secure token-based sessions
- **Protected Routes**: Admin dashboard requires authentication

### Default Admin Account

After seeding the database, you can log in with:

- **Email**: `admin@dtech.com`
- **Password**: `admin123`

## 🎨 Styling

The application uses Tailwind CSS with custom glass morphism effects:

- **Dark Mode Support**: Automatic theme switching
- **Responsive Design**: Mobile-first approach
- **Custom Components**: Reusable UI components
- **Glass Morphism**: Modern frosted glass effects

## 📊 Admin Dashboard

The admin dashboard provides full CRUD operations for:

- **Domains**: Add, edit, delete domain extensions and pricing
- **Hosting Plans**: Manage hosting packages and features
- **VPS Plans**: Configure virtual private server offerings

Access the admin dashboard at `/admin` after logging in with admin credentials.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## 🔧 Configuration

### Database Configuration

Update your `DATABASE_URL` in the `.env` file to point to your PostgreSQL database.

### NextAuth Configuration

- `NEXTAUTH_SECRET`: A secure random string for JWT encryption
- `NEXTAUTH_URL`: Your application's URL (important for production)

### Environment Variables

```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_SECRET="your-secure-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_EXTERNAL_API_URL="https://api.yourdomain.com"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/your-repo/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [PostgreSQL](https://postgresql.org/) - Database

---

Built with ❤️ using Next.js and modern web technologies.
