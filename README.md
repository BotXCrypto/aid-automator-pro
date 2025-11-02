# NextScholar

**Smart Scholarships & Education Insights**

A modern, AI-ready Scholarship & Education News Platform that provides students with up-to-date information on fully funded scholarships, education news, visa updates, and study abroad opportunities.

## 🌟 Features

### Core Functionality
- **Scholarship Database**: Browse 500+ fully funded scholarships worldwide
- **Education News**: Stay updated with the latest education policies, visa updates, and study abroad news
- **Smart Search & Filters**: Filter by country, degree level, funding type, and deadlines
- **Tips & Guides**: Expert advice on scholarship applications and study abroad

### User Experience
- **Modern Design**: Professional, inspiring, and trustworthy UI with gradient hero sections
- **Responsive Layout**: Fully mobile-first design, works on all devices
- **Tabs Navigation**: Easy switching between Scholarships, Education News, and Tips & Guides
- **Pagination**: Efficient browsing with numbered pagination
- **Social Sharing**: Share scholarships on Facebook, Twitter, Telegram, and WhatsApp

### SEO & Performance
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards for all pages
- **Schema.org Structured Data**: Ready for rich snippets (Scholarship and NewsArticle)
- **Fast Loading**: Optimized React code with lazy loading
- **Mobile-First**: Responsive design with modern CSS

### Admin Features
- **Admin Dashboard**: Review and approve pending scholarships
- **AI Integration Placeholders**: Ready for future Python backend integration
- **Import Sources**: Placeholders for WhatsApp, Telegram, Facebook integration

### Monetization Ready
- **Google AdSense Placeholders**: Banner, inline, and sidebar ad positions
- **Newsletter Integration**: Email subscription system
- **Backend-Ready Forms**: Submit scholarship and contact forms

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd aid-automator-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer
│   ├── Hero.tsx        # Hero section
│   ├── ScholarshipCard.tsx
│   └── ...
├── pages/              # Page components
│   ├── Index.tsx       # Home page with tabs
│   ├── Scholarships.tsx
│   ├── EducationNews.tsx
│   ├── ScholarshipDetails.tsx
│   ├── Submit.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── AdminDashboard.tsx
├── data/               # Mock data
└── lib/                # Utilities
```

## 🎨 Design System

**Theme Colors:**
- Primary: Deep Blue (#003366) - HSL(210 100% 20%)
- Secondary: Vibrant Teal (#00C2A8) - HSL(174 100% 52%)

**Typography:**
- Headings: Poppins
- Body: Inter

**Styles:**
- Rounded corners, soft shadows
- Smooth animations and transitions
- Gradient effects for hero and CTAs

## 🔧 Technologies

- **Vite**: Fast build tool and dev server
- **React 18**: UI framework
- **TypeScript**: Type safety
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Icon library

## 📋 Pages

1. **Home** (`/`): Featured scholarships, education news, tips & guides with tabs
2. **Scholarships** (`/scholarships`): Full list with pagination and filters
3. **Education News** (`/news`): Latest education news and insights
4. **Scholarship Details** (`/scholarship/:id`): Detailed view with similar scholarships
5. **Submit** (`/submit`): Form to submit new scholarships
6. **About** (`/about`): Mission, vision, and AI capabilities
7. **Contact** (`/contact`): Contact form and information
8. **Admin** (`/admin`): Dashboard for managing content

## 🚀 Future Phase 2

**AI Backend Integration (Python):**
- Automatic extraction from WhatsApp groups
- Telegram channel scraping
- Facebook post monitoring
- AI-powered content formatting
- Auto-posting with review workflow

**Monetization:**
- Google AdSense integration
- Affiliate links
- Sponsored scholarship placements

## 📝 License

Copyright 2025 NextScholar. All rights reserved.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

Built with ❤️ for students worldwide pursuing their education dreams.
