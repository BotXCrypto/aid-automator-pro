

# Country-Specific Landing Pages + Fix Internship/Job Detail Pages

## Bug Fix: Internship & Job posts redirect to "Scholarship Not Found"

**Root cause:** `ScholarshipDetails.tsx` fetches data using `api.getScholarships()` which filters by `category=scholarship`. When you click an internship or job card, it links to `/scholarship/:id` — but that page only searches scholarships, so internship/job posts are never found.

**Fix:**
- Update `ScholarshipDetails.tsx` to use `api.getPostById(id)` instead of filtering `getScholarships()`. This fetches any post regardless of category.
- Also fetch similar posts from the same category (not just scholarships).
- Update breadcrumbs to be category-aware (show "Internships" or "Jobs" as parent when appropriate).
- Add a `category` field to the `Scholarship` interface and populate it in all API methods.

## Country-Specific Landing Pages

Create a new `CountryScholarships` page at `/scholarships/:country` that targets keywords like "scholarships in Germany".

**New files:**
- `src/pages/CountryScholarships.tsx` — SEO-optimized page with:
  - Dynamic `<h1>`: "Scholarships in {Country}"
  - Unique meta description targeting "scholarships in {country}" keywords
  - JSON-LD `ItemList` structured data
  - Breadcrumbs: Home > Scholarships > {Country}
  - Filtered scholarship list for that country
  - Unique introductory content per country (brief paragraph about studying in that country)

**Updated files:**
- `src/App.tsx` — Add route `/scholarships/:country`
- `public/sitemap.xml` — Add top country URLs
- `src/pages/Scholarships.tsx` — Add internal links to country pages

## Technical Details

1. **`src/components/ScholarshipCard.tsx`** — Add `category` to the `Scholarship` interface
2. **`src/services/api.ts`** — Return `category` field in all methods; add `getPostsByCountry(country)` method
3. **`src/pages/ScholarshipDetails.tsx`** — Use `getPostById()`, make breadcrumbs category-aware
4. **`src/pages/CountryScholarships.tsx`** — New page with country data map for top 15 countries
5. **`src/App.tsx`** — Add country route (must come before `/scholarship/:id` to avoid conflicts)
6. **`public/sitemap.xml`** — Add country page entries

