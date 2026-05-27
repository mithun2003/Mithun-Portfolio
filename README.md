# Mithun Thomas - Full Stack Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A modern, high-performance portfolio website showcasing Full Stack Development and AI integration expertise. Built with cutting-edge web technologies and optimized for SEO, performance, and user experience.

**🌐 Live Site:** [mithunthomas](https://mithunthomas.vercel.app)

---

## ✨ Features

### 🎨 **Modern Design**
- Sleek dark theme with gradient accents
- Smooth animations and transitions (Framer Motion)
- 3D cube visualization for project showcase
- Custom cursor follower effect
- Floating particle background animation

### 📱 **Fully Responsive**
- Mobile-first design approach
- Optimized for all screen sizes (mobile, tablet, desktop)
- Touch-friendly navigation
- Adaptive layouts

### ⚡ **Performance Optimized**
- Next.js 16.2.6 with Turbopack
- Static site generation (SSG)
- Image optimization (Next.js Image)
- Code splitting and lazy loading
- Minimal CSS-in-JS overhead

### 🔍 **SEO Friendly**
- Comprehensive meta tags
- JSON-LD structured data
- Sitemap auto-generation
- Robots.txt configuration
- Open Graph & Twitter Card support
- PWA manifest for app-like experience

### 📊 **Analytics & Monitoring**
- Vercel Analytics integration
- Real-time performance tracking
- User engagement metrics
- Core Web Vitals monitoring

### 🚀 **Production Ready**
- TypeScript for type safety
- ESLint configuration
- Accessibility (a11y) optimizations
- Security best practices
- Semantic HTML

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16.2.6
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animations:** Framer Motion
- **Graphics:** GSAP + Three.js (for 3D effects)
- **Icons:** Lucide React

### Backend & APIs
- **API Routes:** Next.js API Routes
- **GitHub Integration:** GitHub API
- **Vercel Analytics:** Performance monitoring

### Development Tools
- **Package Manager:** pnpm
- **Build Tool:** Turbopack
- **Code Quality:** ESLint
- **Font Loading:** Google Fonts (Geist family)

### Deployment
- **Hosting:** Vercel
- **CDN:** Vercel Edge Network
- **Monitoring:** Vercel Analytics

---

## 📁 Project Structure

```
mithun-portfolio/
├── app/
│   ├── api/                    # API routes
│   │   └── github/            # GitHub stats endpoint
│   ├── layout.tsx             # Root layout with metadata & JSON-LD
│   ├── page.tsx               # Home page
│   ├── globals.css            # Global styles & Tailwind
│   ├── sitemap.ts             # SEO sitemap generation
│   └── robots.ts              # Robots.txt configuration
├── components/
│   ├── navbar.tsx             # Navigation with mobile menu
│   ├── hero-section.tsx       # Hero/landing section
│   ├── about-section.tsx      # About me section
│   ├── work-section.tsx       # Projects showcase (3D cube)
│   ├── experience-section.tsx # Work experience timeline
│   ├── services-section.tsx   # Services offered
│   ├── stack-section.tsx      # Tech stack display
│   ├── skills-section.tsx     # Skills section
│   ├── credentials-section.tsx # Certifications
│   ├── github-stats-section.tsx # GitHub statistics
│   ├── contact-section.tsx    # Contact form
│   ├── footer.tsx             # Footer
│   ├── cursor-follower.tsx    # Custom cursor effect
│   ├── floating-particles.tsx # Animated background
│   ├── theme-provider.tsx     # Theme context
│   └── ui/                    # UI components (shadcn/ui)
├── lib/
│   ├── data.ts               # Content data (projects, experience, etc)
│   └── utils.ts              # Utility functions
├── hooks/                     # Custom React hooks
├── styles/                    # Global CSS
├── public/
│   ├── favicon.ico           # Favicon
│   ├── robots.txt            # Robots.txt for crawlers
│   ├── manifest.json         # PWA manifest
│   ├── mithun_hero.webp       # Hero image
│   ├── mithun_about.webp      # About section image
│   └── artistkashi-hero.webp  # ArtistKashi project image
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- pnpm 8.0 or higher (or npm/yarn)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mithun2003/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Create environment variables**
```bash
cp .env.example .env.local
```

Configure required variables:
```env
# GitHub API
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username

# Optional: Vercel Analytics (auto-enabled if deployed on Vercel)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

4. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:3000` to see your site.

---

## 📦 Available Scripts

```bash
# Development
pnpm dev              # Start dev server on http://localhost:3000

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues

# Type Checking
pnpm typecheck        # Run TypeScript checks
```

---

## 🎨 Customization

### Update Personal Information
Edit `/lib/data.ts`:
```typescript
export const personalInfo = {
  name: 'Your Name',
  firstName: 'FIRST',
  lastName: 'NAME',
  role: 'Your Role',
  email: 'your-email@example.com',
  phone: '+1234567890',
  location: 'Your City, Country',
  // ... more info
}
```

### Add Projects
Update `projects` array in `/lib/data.ts`:
```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: 'Project Title',
    category: 'Category',
    year: '2024',
    description: 'Project description',
    tech: ['React', 'Next.js', 'TypeScript'],
    image: '/project-image.webp',
    link: 'https://project-link.com',
  },
  // ... more projects
]
```

### Customize Colors
Edit `styles/globals.css` to change the color scheme:
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... more variables */
}
```

### Update Images
Replace images in `/public/`:
- `mithun_hero.webp` - Hero section image
- `mithun_about.webp` - About section image
- `favicon.ico` - Website favicon

---

## 📊 SEO & Analytics

### Vercel Analytics
Analytics are automatically tracked in production via `@vercel/analytics/next`. Monitor:
- Web Vitals (LCP, FID, CLS)
- Page performance
- User engagement
- Real user metrics

**Dashboard:** [Vercel Dashboard](https://vercel.com/dashboard)

### Search Engine Optimization

#### Auto-Generated Files
- `/sitemap.xml` - Automatically generated sitemap
- `/robots.txt` - Crawler directives
- `/manifest.json` - PWA manifest

#### Structured Data
JSON-LD schemas included:
- Person (with contact & social profiles)
- WebSite (with search capability)

#### Meta Tags
All pages include:
- OpenGraph tags (Facebook, LinkedIn)
- Twitter Card
- Canonical URLs
- Language alternatives

**Setup Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://yourdomain.com`
3. Add verification code to `/app/layout.tsx`

---

## 🔧 Configuration

### Environment Variables
`.env.local` template:
```env
# GitHub API
NEXT_PUBLIC_GITHUB_USERNAME=your-username

# Optional: Google verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-code

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Next.js Configuration
`next.config.mjs`:
- Image optimization
- Font loading
- Environment variables
- Custom webpack config

---

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Configure environment variables
   - Deploy

3. **Add Custom Domain**
   - In Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records

### Deploy on Other Platforms

**Netlify:**
```bash
pnpm build
# Deploy the `.next` folder
```

**Self-hosted:**
```bash
pnpm build
pnpm start
```

---

## 📱 Mobile Optimization

### Features
- ✅ Responsive design (mobile-first)
- ✅ Touch-friendly navigation
- ✅ PWA support (installable app)
- ✅ Fast loading (optimized images)
- ✅ Accessible (WCAG guidelines)

### Testing Mobile
- Chrome DevTools (F12 → Toggle device toolbar)
- iOS: Safari DevTools
- Android: Chrome DevTools

---

## ♿ Accessibility

### Implemented Standards
- WCAG 2.1 Level AA compliance
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast ratios
- Alt text for images

### Testing
- Use screen readers (NVDA, JAWS)
- Check keyboard navigation (Tab, Enter)
- Verify color contrast (Lighthouse)

---

## 🐛 Troubleshooting

### Build Issues

**Error: "Module not found"**
```bash
pnpm install
pnpm build
```

**Error: "Port 3000 already in use"**
```bash
# Use different port
pnpm dev -- -p 3001
```

### Performance Issues

**Slow load time:**
- Check Vercel Analytics
- Optimize images (use WebP)
- Minimize third-party scripts
- Check Core Web Vitals

**High bundle size:**
```bash
pnpm analyze  # Check bundle analysis
```

### SEO Issues

**Page not indexed:**
- Submit to Google Search Console
- Check robots.txt
- Verify canonical URLs
- Check sitemap.xml

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [TypeScript](https://www.typescriptlang.org/docs)

### Tools
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web.dev](https://web.dev)

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is open source and available under the MIT License. See the LICENSE file for more details.

---

## 👤 About Me

**Mithun Thomas** - Full Stack Developer & AI Specialist
- 🌐 Portfolio: [mithunthomas.dev](https://mithunthomas.vercel.app)
- 💼 LinkedIn: [mithunthomas3897](https://linkedin.com/in/mithunthomas3897)
- 🐙 GitHub: [mithun2003](https://github.com/mithun2003)
- 📧 Email: mithunthomas3897@gmail.com
- 📱 WhatsApp: [+91 9895493897](https://wa.me/919895493897)

### Skills & Technologies
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, FastAPI, PostgreSQL, MongoDB
- **AI/ML:** PyTorch, TensorFlow, OpenCV, Gemini AI
- **DevOps:** AWS, Docker, GitHub Actions, CI/CD
- **Other:** GSAP, Three.js, GraphQL, REST APIs

---

## 🚀 Latest Updates

### Version 2.0 (Current)
- ✅ Mobile optimization
- ✅ SEO enhancements (sitemap, robots.txt, meta tags)
- ✅ Vercel Analytics integration
- ✅ PWA support
- ✅ JSON-LD structured data
- ✅ Image optimization
- ✅ Responsive design fixes

### Planned Features
- 📝 Blog section with MDX
- 🔐 Contact form with validation
- 🌙 Dark/Light theme toggle
- 🗣️ Multi-language support
- 📈 Advanced analytics dashboard

---

## 📞 Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Email: mithunthomas3897@gmail.com
- WhatsApp: [+91 9895493897](https://wa.me/919895493897)

---

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) - Hosting & Analytics
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion) - Animations
- [shadcn/ui](https://ui.shadcn.com) - UI components
- All open-source contributors

---

**Made with ❤️ by Mithun Thomas**

---

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| Framework | Next.js 16.2.6 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Deployment | Vercel |
| Performance Score | 95+ |
| SEO Score | 90+ |
| Mobile Friendly | Yes ✅ |
| PWA Support | Yes ✅ |

---

**Last Updated:** May 2026  
**License:** MIT  
**Status:** ✅ Production Ready
