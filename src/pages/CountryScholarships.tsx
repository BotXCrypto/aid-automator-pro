import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { SEO } from "@/components/SEO";
import { api } from "@/services/api";
import type { Scholarship } from "@/components/ScholarshipCard";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, Globe } from "lucide-react";

const countryData: Record<string, { name: string; description: string; emoji: string }> = {
  germany: {
    name: "Germany",
    emoji: "🇩🇪",
    description: "Germany offers tuition-free education at public universities and is home to world-renowned institutions like TU Munich, Heidelberg University, and Humboldt University. With over 400,000 international students, Germany is one of Europe's top study destinations.",
  },
  usa: {
    name: "United States",
    emoji: "🇺🇸",
    description: "The United States hosts the largest number of international students worldwide. With prestigious universities like Harvard, MIT, and Stanford, the US offers unmatched research opportunities and a diverse academic environment.",
  },
  uk: {
    name: "United Kingdom",
    emoji: "🇬🇧",
    description: "The UK is home to Oxford, Cambridge, and Imperial College London. British universities are known for their rigorous academic standards and globally recognized degrees. Scholarships like Chevening and Commonwealth make studying affordable.",
  },
  canada: {
    name: "Canada",
    emoji: "🇨🇦",
    description: "Canada is known for its welcoming immigration policies and high-quality education. Universities like University of Toronto, McGill, and UBC offer excellent programs with generous scholarship opportunities for international students.",
  },
  australia: {
    name: "Australia",
    emoji: "🇦🇺",
    description: "Australia offers world-class education with universities like Melbourne, Sydney, and ANU consistently ranking globally. The country provides excellent post-study work opportunities and a multicultural environment.",
  },
  turkey: {
    name: "Turkey",
    emoji: "🇹🇷",
    description: "Turkey's Türkiye Burslari scholarship is one of the most comprehensive government-funded programs, covering tuition, accommodation, and monthly stipend. Turkish universities offer programs in English and Turkish.",
  },
  china: {
    name: "China",
    emoji: "🇨🇳",
    description: "China offers the Chinese Government Scholarship (CSC) program, one of the world's largest scholarship programs. With rapidly growing universities and affordable living costs, China is an emerging study destination.",
  },
  japan: {
    name: "Japan",
    emoji: "🇯🇵",
    description: "Japan's MEXT scholarship is highly sought after, offering fully funded education at top universities. Japan combines cutting-edge technology with rich cultural heritage, making it a unique study destination.",
  },
  france: {
    name: "France",
    emoji: "🇫🇷",
    description: "France offers affordable education with low tuition fees at public universities. The Eiffel Scholarship and Campus France programs support international students. Paris alone hosts over 50 universities and grandes écoles.",
  },
  netherlands: {
    name: "Netherlands",
    emoji: "🇳🇱",
    description: "The Netherlands offers numerous English-taught programs and scholarships like Holland Scholarship and Orange Tulip. Dutch universities are known for innovative teaching methods and strong international networks.",
  },
  sweden: {
    name: "Sweden",
    emoji: "🇸🇪",
    description: "Sweden offers the Swedish Institute Scholarships for Global Professionals. Swedish universities are known for sustainability research, innovation, and a high quality of life with excellent student support.",
  },
  "south-korea": {
    name: "South Korea",
    emoji: "🇰🇷",
    description: "South Korea's KGSP (Korean Government Scholarship Program) offers fully funded opportunities. With world-class technology and vibrant culture, Korea is increasingly popular among international students.",
  },
  italy: {
    name: "Italy",
    emoji: "🇮🇹",
    description: "Italy offers affordable education with scholarships from the Italian Government and individual universities. Historic institutions like the University of Bologna (the world's oldest) provide unique academic experiences.",
  },
  malaysia: {
    name: "Malaysia",
    emoji: "🇲🇾",
    description: "Malaysia is a budget-friendly study destination with high-quality education. The Malaysian International Scholarship (MIS) and various university-specific grants make it accessible for international students.",
  },
  "new-zealand": {
    name: "New Zealand",
    emoji: "🇳🇿",
    description: "New Zealand offers excellent education in a stunning natural environment. The New Zealand Excellence Awards and university scholarships provide support for international students across all levels of study.",
  },
};

function slugToCountry(slug: string): string {
  const data = countryData[slug.toLowerCase()];
  return data?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
}

export default function CountryScholarships() {
  const { country: countrySlug } = useParams<{ country: string }>();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [fundingFilter, setFundingFilter] = useState("all");

  const countryName = slugToCountry(countrySlug || "");
  const data = countryData[(countrySlug || "").toLowerCase()];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const results = await api.getPostsByCountry(countryName);
        setScholarships(results);
      } catch (err) {
        console.error("Failed to fetch country scholarships:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [countryName]);

  const filtered = useMemo(() => {
    return scholarships.filter((s) => {
      const matchesDegree = degreeFilter === "all" || s.degree === degreeFilter;
      const matchesFunding = fundingFilter === "all" || s.funding === fundingFilter;
      return matchesDegree && matchesFunding;
    });
  }, [scholarships, degreeFilter, fundingFilter]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Scholarships in ${countryName}`,
    description: `Browse fully funded scholarships available in ${countryName} for international students.`,
    numberOfItems: filtered.length,
    itemListElement: filtered.slice(0, 10).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `https://thenextscholar.vercel.app/scholarship/${s.id}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Scholarships in ${countryName} 2026 – Fully Funded Opportunities`}
        description={`Discover ${filtered.length}+ fully funded scholarships in ${countryName} for international students. Apply for Bachelor's, Master's, and PhD programs with full tuition coverage.`}
        canonical={`/scholarships/${countrySlug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <PageBreadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Scholarships", href: "/scholarships" },
            { label: countryName },
          ]} />

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {data?.emoji && <span className="text-4xl">{data.emoji}</span>}
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Scholarships in {countryName}
              </h1>
            </div>
            {data?.description && (
              <p className="text-lg text-muted-foreground max-w-3xl mb-6">
                {data.description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-primary" />
                <span>{filtered.length} scholarships available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>All degree levels</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{countryName}</span>
              </div>
            </div>
          </div>

          <FilterBar
            onCountryChange={() => {}}
            onDegreeChange={setDegreeFilter}
            onFundingChange={setFundingFilter}
          />

          {loading && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading scholarships in {countryName}...</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filtered.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
                No Scholarships Found in {countryName}
              </h2>
              <p className="text-muted-foreground mb-6">
                We don't have any scholarships listed for {countryName} yet. Check back soon or browse all scholarships.
              </p>
              <Link to="/scholarships">
                <Button size="lg">Browse All Scholarships</Button>
              </Link>
            </div>
          )}

          {/* Internal links to other countries */}
          <div className="mt-16 border-t border-border pt-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Explore Scholarships in Other Countries
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(countryData)
                .filter(([slug]) => slug !== (countrySlug || "").toLowerCase())
                .slice(0, 10)
                .map(([slug, d]) => (
                  <Link key={slug} to={`/scholarships/${slug}`}>
                    <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-all">
                      {d.emoji} {d.name}
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}