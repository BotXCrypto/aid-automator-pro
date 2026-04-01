import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Globe, MapPin, GraduationCap, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { api } from "@/services/api";
import { Scholarship } from "@/components/ScholarshipCard";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const SCHOLARSHIP_MARKERS = [
  { lat: 51.51, lng: -0.13, label: "UK" },
  { lat: 38.9, lng: -77.04, label: "USA" },
  { lat: 52.52, lng: 13.41, label: "Germany" },
  { lat: -33.87, lng: 151.21, label: "Australia" },
  { lat: 52.37, lng: 4.9, label: "Netherlands" },
  { lat: 45.5, lng: -73.57, label: "Canada" },
  { lat: 59.33, lng: 18.07, label: "Sweden" },
  { lat: 35.68, lng: 139.69, label: "Japan" },
  { lat: 28.61, lng: 77.21, label: "India" },
  { lat: 36.19, lng: 44.01, label: "Kurdistan" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: 48.86, lng: 2.35, label: "France" },
];

const SCHOLARSHIP_CONNECTIONS: { from: [number, number]; to: [number, number] }[] = [
  { from: [36.19, 44.01], to: [51.51, -0.13] },
  { from: [36.19, 44.01], to: [52.52, 13.41] },
  { from: [36.19, 44.01], to: [38.9, -77.04] },
  { from: [28.61, 77.21], to: [51.51, -0.13] },
  { from: [28.61, 77.21], to: [-33.87, 151.21] },
  { from: [51.51, -0.13], to: [45.5, -73.57] },
  { from: [38.9, -77.04], to: [35.68, 139.69] },
  { from: [52.52, 13.41], to: [59.33, 18.07] },
  { from: [1.35, 103.82], to: [-33.87, 151.21] },
  { from: [48.86, 2.35], to: [52.37, 4.9] },
];

const stats = [
  { icon: Globe, label: "Countries", target: 40, suffix: "+" },
  { icon: GraduationCap, label: "Scholarships", target: 500, suffix: "+" },
  { icon: Users, label: "Students Helped", target: 10, suffix: "K+" },
  { icon: TrendingUp, label: "Success Rate", target: 85, suffix: "%" },
];

const regions = [
  { name: "Europe", countries: ["UK", "Germany", "Netherlands", "Sweden", "France"], color: "bg-primary" },
  { name: "North America", countries: ["USA", "Canada"], color: "bg-secondary" },
  { name: "Asia Pacific", countries: ["Japan", "Australia", "Singapore", "India"], color: "bg-accent" },
  { name: "Middle East", countries: ["Kurdistan", "Turkey"], color: "bg-destructive" },
];

export default function GlobalNetwork() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);

  useEffect(() => {
    api.getScholarships().then(setScholarships);
  }, []);

  const countryCounts = scholarships.reduce<Record<string, number>>((acc, s) => {
    if (s.country) acc[s.country] = (acc[s.country] || 0) + 1;
    return acc;
  }, {});

  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Global Scholarship Network"
        description="Explore NextScholar's global scholarship network across 40+ countries. Find fully funded study abroad opportunities worldwide."
        canonical="/global-network"
      />
      <Navbar />

      {/* Hero with Globe */}
      <section className="relative overflow-hidden bg-primary pt-24 pb-16">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--secondary)/0.15)_0%,_transparent_70%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
            {/* Left content */}
            <div className="space-y-6 text-primary-foreground">
              <Badge variant="outline" className="border-secondary text-secondary gap-1.5 px-3 py-1">
                <Globe className="w-3.5 h-3.5" />
                Global Scholarship Network
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Scholarships{" "}
                <span className="text-secondary">Worldwide</span>
              </h1>

              <p className="text-lg text-primary-foreground/70 max-w-lg">
                Explore scholarship opportunities across 40+ countries. Our global network connects students
                with fully funded programs at top universities around the world.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-5 h-5 mx-auto mb-1 text-secondary" />
                    <p className="text-2xl font-bold"><AnimatedCounter target={stat.target} suffix={stat.suffix} /></p>
                    <p className="text-xs text-primary-foreground/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Globe */}
            <div className="flex items-center justify-center">
              <InteractiveGlobe
                className="w-full max-w-[500px] aspect-square"
                size={500}
                markers={SCHOLARSHIP_MARKERS}
                connections={SCHOLARSHIP_CONNECTIONS}
                dotColor="rgba(100, 220, 200, ALPHA)"
                arcColor="hsla(174, 100%, 52%, 0.5)"
                markerColor="hsla(174, 100%, 62%, 1)"
                autoRotateSpeed={0.003}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-10">
            Explore by Region
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region) => (
              <Card key={region.name} className="p-6 hover:shadow-lg transition-shadow border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">{region.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {region.countries.map((c) => (
                    <Badge key={c} variant="secondary" className="text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      {c}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Countries from live data */}
      {topCountries.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-10">
              Top Destinations
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {topCountries.map(([country, count]) => (
                <Card key={country} className="p-5 flex items-center gap-4 hover:shadow-md transition-shadow border-border">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{country}</p>
                    <p className="text-sm text-muted-foreground">{count} scholarship{count > 1 ? "s" : ""}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-heading font-bold">Ready to Study Abroad?</h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto">
            Browse all available scholarships and find the perfect opportunity for your academic journey.
          </p>
          <Link to="/scholarships">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl">
              Browse Scholarships
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
