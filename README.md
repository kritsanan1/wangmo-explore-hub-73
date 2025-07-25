# Wang Sam Mo Explorer Hub

A comprehensive tourism platform showcasing the authentic beauty and cultural heritage of Wang Sam Mo, Udon Thani, Thailand. This React-based web application provides visitors with information about local attractions, restaurants, services, and employment opportunities.

## 🌟 Features

- **Tourism Information**: Comprehensive guides to local attractions, temples, and cultural sites
- **Restaurant Directory**: Local dining establishments with booking capabilities
- **Service Listings**: Local businesses and service providers
- **Job Board**: Employment opportunities in the Wang Sam Mo area
- **SEO Optimized**: Advanced SEO tracking and analytics dashboard
- **Security Auditing**: Built-in security vulnerability scanning
- **Mobile-First Design**: Responsive design optimized for all devices
- **PWA Ready**: Progressive Web App capabilities for mobile installation

## 🛠 Technical Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/UI component library
- **Routing**: React Router v6
- **Backend**: Supabase integration
- **Analytics**: Custom SEO tracking with Lighthouse integration
- **Security**: OWASP ZAP integration for vulnerability scanning

## 📋 Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher (or yarn/pnpm equivalent)
- **Git**: For version control
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment template and configure your variables:

```bash
cp .env.example .env.local
```

Required environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_GOOGLE_SEARCH_CONSOLE_API_KEY`: Google Search Console API key (optional)
- `VITE_LIGHTHOUSE_API_KEY`: Lighthouse API key (optional)

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📜 Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `dev` | Start development server with hot reload | `npm run dev` |
| `build` | Build optimized production bundle | `npm run build` |
| `preview` | Preview production build locally | `npm run preview` |
| `lint` | Run ESLint for code quality | `npm run lint` |

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── common/         # Common components
│   ├── hero/           # Hero section components
│   ├── restaurants/    # Restaurant-specific components
│   ├── services/       # Service-specific components
│   └── jobs/           # Job-related components
├── pages/              # Page components (routes)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── assets/             # Static assets (images, etc.)
└── integrations/       # Third-party integrations
```

## 🎨 Development Guidelines

### Code Style

- **ESLint**: Follows React and TypeScript recommended rules
- **TypeScript**: Strict mode enabled for type safety
- **Import Organization**: Group imports (external, internal, relative)

### Component Conventions

- Use functional components with hooks
- Prefer TypeScript interfaces over types for component props
- Use the `cn()` utility for conditional className joining
- Follow the component pattern: Props interface → Component → Export

### Git Workflow

#### Branch Naming
- `feature/[ticket-number]-[description]`
- `bugfix/[ticket-number]-[description]`
- `hotfix/[ticket-number]-[description]`

#### Commit Messages
Follow conventional commits:
- `feat: add new attraction map component`
- `fix: resolve mobile navigation issue`
- `docs: update API documentation`
- `style: improve button hover states`

## 🌐 Deployment

### Using Lovable (Recommended)

1. Open [Lovable](https://lovable.dev/projects/f8b87c0c-008f-4f24-b218-015ce073681a)
2. Click Share → Publish
3. Configure custom domain in Project → Settings → Domains

### Manual Deployment

```bash
npm run build
```

The application can be deployed to:
- **Vercel** (recommended for Vite projects)
- **Netlify**
- **AWS S3 + CloudFront**
- **Any static hosting service**

## 📊 SEO & Analytics

### Built-in SEO Features

- **Meta Tags**: Dynamic meta tags per page
- **Structured Data**: JSON-LD for tourism destinations
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Optimized for search engines

### Analytics Dashboard

Access the SEO dashboard at `/seo-dashboard` to monitor:
- Page performance metrics
- Lighthouse audit scores
- Google Search Console data
- Mobile responsiveness scores

## 🔒 Security

### Security Audit Tool

The application includes a built-in security audit tool at `/seo-dashboard` that:
- Scans for common vulnerabilities
- Provides OWASP ZAP integration
- Generates detailed security reports
- Offers remediation guidance

## 🤝 Contributing

### Pull Request Template

```markdown
## Changes Made
- [ ] Feature/Bug description
- [ ] Files modified

## Testing
- [ ] Local testing completed
- [ ] Mobile responsiveness verified
- [ ] SEO impact assessed

## Screenshots
(If UI changes)

## Review Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] TypeScript compilation successful
```

## 🆘 Troubleshooting

### Common Issues

**Development server won't start**
- Check Node.js version (18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port availability (8080)

**Build failures**
- Run type checking with `npm run build`
- Check for unused imports
- Verify all dependencies are installed

**Supabase connection issues**
- Verify environment variables
- Check Supabase project status
- Confirm API keys are valid

## 📞 Support

For support and questions:
- Use [Lovable](https://lovable.dev/projects/f8b87c0c-008f-4f24-b218-015ce073681a) for AI-powered development assistance
- Create an issue in this repository
- Check the [Lovable documentation](https://docs.lovable.dev/)

---

Built with ❤️ for the Wang Sam Mo community using [Lovable](https://lovable.dev)
