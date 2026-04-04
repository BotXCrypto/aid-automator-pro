import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { EmailSubscribe } from "@/components/EmailSubscribe";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { api } from "@/services/api";
import type { Scholarship } from "@/components/ScholarshipCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, GraduationCap, Newspaper, Globe, ArrowRight } from "lucide-react";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { useRef, useCallback } from "react";

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [fundingFilter, setFundingFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("scholarships");

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [news, setNews] = useState<Scholarship[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scholarshipsData, newsData] = await Promise.all([
          api.getScholarships(),
          api.getNews(),
        ]);
        setScholarships(scholarshipsData);
        setNews(newsData);
      } catch (err) {
        console.error("Failed to fetch data for homepage:", err);
      }
    };
    fetchData();
  }, []);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      const matchesSearch = searchQuery === "" || 
        scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (scholarship.country || "").toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = countryFilter === "all" || scholarship.country === countryFilter;
      const matchesDegree = degreeFilter === "all" || scholarship.degree === degreeFilter;
      const matchesFunding = fundingFilter === "all" || scholarship.funding === fundingFilter;

      return matchesSearch && matchesCountry && matchesDegree && matchesFunding;
    });
  }, [scholarships, searchQuery, countryFilter, degreeFilter, fundingFilter]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="NextScholar"
        description="Find fully funded scholarships, internships & education news updated daily. Discover opportunities for Bachelor's, Master's & PhD programs worldwide."
        canonical="/"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "NextScholar",
            url: "https://thenextscholar.lovable.app",
            description: "Global platform connecting students with fully funded scholarships, internships, and education opportunities worldwide.",
            sameAs: [],
            potentialAction: {
              "@type": "SearchAction",
              target: "https://nextscholar.com/scholarships?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <Navbar />
      <Hero onSearch={setSearchQuery} />
      {/* Global Network Section */}
      <section className="py-10 md:py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--secondary)/0.1)_0%,_transparent_70%)]" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="space-y-5 text-primary-foreground text-center lg:text-left">
              <Badge variant="outline" className="border-secondary text-secondary gap-1.5 px-3 py-1">
                <Globe className="w-3.5 h-3.5" />
                Global Reach
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold leading-tight">
                Scholarships Across <span className="text-secondary">40+ Countries</span>
              </h2>
              <p className="text-primary-foreground/70 max-w-lg mx-auto lg:mx-0">
                Our network spans every continent, connecting students with fully funded opportunities at world-class universities. Drag the globe to explore.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold"><AnimatedCounter target={500} suffix="+" /></p>
                  <p className="text-xs text-primary-foreground/60">Scholarships</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold"><AnimatedCounter target={150} suffix="+" /></p>
                  <p className="text-xs text-primary-foreground/60">Universities</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold"><AnimatedCounter target={10} suffix="K+" /></p>
                  <p className="text-xs text-primary-foreground/60">Students Helped</p>
                </div>
              </div>
              <Link to="/global-network">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl mt-2 group">
                  Explore Global Network
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center order-first lg:order-last">
              <InteractiveGlobe
                className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[420px] aspect-square"
                size={420}
                dotColor="rgba(100, 220, 200, ALPHA)"
                arcColor="hsla(174, 100%, 52%, 0.5)"
                markerColor="hsla(174, 100%, 62%, 1)"
                autoRotateSpeed={0.003}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          {/* Tabs Section */}
          <div className="mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
               <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 rounded-xl bg-card p-1 shadow-soft">
                <TabsTrigger value="scholarships" className="rounded-lg data-[state=active]:bg-gradient-accent data-[state=active]:text-white transition-all duration-300 hover:scale-105">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Scholarships
                </TabsTrigger>
                <TabsTrigger value="news" className="rounded-lg data-[state=active]:bg-gradient-accent data-[state=active]:text-white transition-all duration-300 hover:scale-105">
                  <Newspaper className="w-4 h-4 mr-2" />
                  Education News
                </TabsTrigger>
                <TabsTrigger value="tips" className="rounded-lg data-[state=active]:bg-gradient-accent data-[state=active]:text-white transition-all duration-300 hover:scale-105">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Tips & Guides
                </TabsTrigger>
              </TabsList>

              <TabsContent value="scholarships" className="mt-8">
                <FilterBar
                  onCountryChange={setCountryFilter}
                  onDegreeChange={setDegreeFilter}
                  onFundingChange={setFundingFilter}
                />
                
                {/* Featured/Sponsored Section */}
                <div className="bg-gradient-accent rounded-2xl p-8 mb-8 text-center shadow-medium animate-fade-in hover:shadow-hover transition-all duration-500 hover:scale-[1.02]">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-white animate-pulse" />
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    Sponsored Scholarships
                  </h3>
                  <p className="text-white/90 mb-4">
                    Premium scholarship opportunities highlighted for you
                  </p>
                  <Link to="/scholarships">
                    <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      View Sponsored
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 mb-6">
                  <h2 className="text-3xl font-heading font-bold text-foreground">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Scholarships'}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Showing {filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredScholarships.map((scholarship, index) => (
                    <div 
                      key={scholarship.id} 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ScholarshipCard scholarship={scholarship} />
                    </div>
                  ))}
                </div>

                {filteredScholarships.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                      No scholarships found matching your criteria. Try adjusting your filters.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="news" className="mt-8">
                <div className="text-center mb-8">
                  <Newspaper className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Latest Education News
                  </h2>
                  <p className="text-muted-foreground">
                    Stay updated with visa updates, study abroad news, and education insights
                  </p>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((article, index) => (
                    <div 
                      key={article} 
                      className="bg-card rounded-2xl shadow-medium p-6 hover:shadow-hover transition-all duration-500 cursor-pointer hover:-translate-y-1 animate-fade-in hover:border hover:border-primary/30" 
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-48 h-48 bg-gradient-accent rounded-xl flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Breaking</Badge>
                            <span className="text-sm text-muted-foreground">2 hours ago</span>
                          </div>
                          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                            New Visa Requirements for International Students in 2025
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            Recent changes to visa requirements across major study destinations have created new opportunities and challenges for international students seeking to pursue their education abroad.
                          </p>
                          <Button variant="outline" size="sm" className="rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8 animate-fade-in">
                  <Link to="/news">
                    <Button size="lg" className="bg-gradient-accent hover:bg-gradient-hover transition-all duration-300 rounded-xl hover:scale-105 hover:shadow-lg">
                      View All News
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="tips" className="mt-8">
                <div className="text-center mb-8">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Tips & Guides
                  </h2>
                  <p className="text-muted-foreground">
                    Expert advice on scholarship applications and study abroad
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "How to Write a Winning Scholarship Essay", icon: "📝" },
                    { title: "10 Essential Documents for Study Abroad", icon: "📋" },
                    { title: "Mastering the Interview Process", icon: "🎤" },
                    { title: "Financial Planning for International Students", icon: "💰" },
                    { title: "Understanding Visa Types & Requirements", icon: "✈️" },
                    { title: "Finding the Right University for You", icon: "🎓" },
                  ].map((tip, idx) => (
                    <div key={idx} className="bg-card rounded-2xl shadow-medium p-6 hover:shadow-hover transition-all cursor-pointer">
                      <div className="text-4xl mb-4">{tip.icon}</div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Practical tips and strategies to help you succeed in your scholarship journey.
                      </p>
                      <Button variant="outline" size="sm" className="w-full rounded-xl">
                        Read Guide
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      <EmailSubscribe />
      <Footer />
    </div>
  );
};

export default Index;

