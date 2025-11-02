# Deployment Guide for NextScholar

## 🚀 Production Deployment

NextScholar is a modern React application built with Vite, optimized for production and ready to deploy on various hosting platforms.

## Recommended Hosting Platforms

### 1. Vercel (Recommended)

**Why Vercel?**
- Zero-config deployment for React apps
- Global CDN with instant cache invalidation
- Automatic SSL certificates
- Preview deployments for every branch
- Built-in analytics and performance monitoring

**Deployment Steps:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or connect via GitHub for automatic deployments
# Go to: https://vercel.com/new
# Import your GitHub repository
# Configure build settings:
#   - Build Command: npm run build
#   - Output Directory: dist
#   - Install Command: npm install
```

**Environment Variables:**
- No environment variables required for basic setup
- For Phase 2, add your Python backend API URLs

### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod

# Or connect via GitHub
# Go to: https://app.netlify.com/add-new-site
# Drag and drop your dist folder or connect Git repository
```

**Build Settings:**
```
Build command: npm run build
Publish directory: dist
```

### 3. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Update package.json scripts
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Deploy
npm run deploy
```

**Note:** Requires setting up routing to work with client-side React Router.

### 4. Cloudflare Pages

```bash
# Install Wrangler CLI
npm i -g @cloudflare/wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist
```

Or connect via Git and configure:
- Framework preset: Vite
- Build command: npm run build
- Build output directory: dist

## Build Configuration

### Production Build

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

**Build Output:**
- `dist/` folder contains all static assets
- Optimized JavaScript bundle (~130kb gzipped)
- Minified CSS (~11kb gzipped)
- Optimized images and assets

### Build Optimization

The project uses:
- **Vite** for lightning-fast builds
- **Tree-shaking** to remove unused code
- **Code splitting** for smaller initial bundle
- **Asset optimization** including image compression
- **CSS minification** and purging

## Domain Setup

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your custom domain: `nextscholar.com`
3. Update DNS records as instructed:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for SSL certificate provisioning

### DNS Records

For any hosting provider:
```
# Root domain
Type: A
Value: [Hosting IP]

# WWW subdomain
Type: CNAME
Value: [Hosting domain]
```

## SEO Configuration

### Google Search Console

1. Deploy your site
2. Go to: https://search.google.com/search-console
3. Add property: `https://nextscholar.com`
4. Verify ownership (DNS or HTML file)
5. Submit sitemap: `https://nextscholar.com/sitemap.xml`

### Google Analytics Setup (Optional)

Add to `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google AdSense Setup (Phase 2)

1. Apply at: https://www.google.com/adsense/
2. Get approved (usually 1-14 days)
3. Add your AdSense client ID to `index.html`
4. Update placeholder divs with actual ad units

### Schema.org Structured Data

The site is pre-configured with:
- **Scholarship** schema for scholarship listings
- **NewsArticle** schema for education news
- **Organization** schema for the business
- **WebSite** schema for search functionality

**To verify:**
- Use Google's Rich Results Test: https://search.google.com/test/rich-results

## Performance Optimization

### Lighthouse Scores (Expected)

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

### Further Optimizations

```javascript
// Add to vite.config.ts for additional optimizations
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}
```

## Environment Variables

### Development

```env
# .env.local (create this file)
VITE_API_URL=http://localhost:8000
VITE_ADMIN_SECRET=your-secret-here
```

### Production

Set in your hosting provider:
```env
VITE_API_URL=https://api.nextscholar.com
VITE_ADMIN_SECRET=your-production-secret
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
```

## Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
   ```bash
   npm install @vercel/analytics
   ```

2. **Google Analytics 4**
   - Free web analytics
   - User behavior tracking

3. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/react
   ```

4. **UpTimeRobot** (Uptime Monitoring)
   - Free tier: 50 monitors
   - 5-minute check intervals

## Phase 2 Backend Integration

### Python Backend Setup

```bash
# Create Python backend (separate repo)
mkdir nextscholar-backend
cd nextscholar-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn
```

### API Configuration

Update environment:
```env
VITE_API_URL=https://api.nextscholar.com
```

### Backend Deployment Options

1. **Render** (Recommended for Python)
   - Free tier with automatic SSL
   - Git-based deployments
   - PostgreSQL included

2. **Railway**
   - $5/month for production
   - Easy database integration

3. **AWS/DigitalOcean**
   - More control, higher cost
   - Better for scaling

## Security Checklist

- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Set up CORS for API (if needed)
- [ ] Configure security headers
- [ ] Regular dependency updates: `npm audit fix`
- [ ] Use environment variables for secrets
- [ ] Enable two-factor authentication on hosting accounts
- [ ] Regular backups (if using database)
- [ ] Rate limiting on API endpoints

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Routing Issues

For hosting platforms that need configuration:
- **Netlify:** Create `_redirects` file in `public/`
- **Vercel:** Create `vercel.json`
- **Cloudflare Pages:** Create `_redirects`

```bash
# _redirects
/*    /index.html   200
```

### Performance Issues

1. Check bundle size: `npm run build -- --report`
2. Enable compression on server
3. Use CDN for static assets
4. Implement lazy loading for images
5. Optimize font loading

## Support

For deployment issues:
- Check hosting provider docs
- Review Vite deployment guide: https://vitejs.dev/guide/static-deploy.html
- Open an issue on GitHub

---

**Ready to Deploy!** 🎉

Your NextScholar platform is production-ready and optimized for speed, SEO, and user experience.

