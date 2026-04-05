

# Google Search Console Verification

## Changes

1. **Copy verification HTML file** to `public/googlea31db2afb46529b3.html` so it's accessible at the root URL for Google's file-based verification.

2. **Add meta tag to `index.html`** in the `<head>` section:
   ```html
   <meta name="google-site-verification" content="googlea31db2afb46529b3" />
   ```

3. **Update `public/robots.txt`** — ensure the sitemap URL is correct and accessible to Googlebot.

4. **Update `public/sitemap.xml`** — add the verification file isn't needed here, but confirm all pages are listed with current `<lastmod>` dates.

Two files edited, one file copied. Straightforward verification setup.

