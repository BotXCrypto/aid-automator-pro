import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { EmailSubscribe } from "@/components/EmailSubscribe";
import { Footer } from "@/components/Footer";
import { mockScholarships } from "@/data/mockScholarships";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, GraduationCap, Newspaper } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [fundingFilter, setFundingFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("scholarships");

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter((scholarship) => {
      const matchesSearch = searchQuery === "" || 
        scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = countryFilter === "all" || scholarship.country === countryFilter;
      const matchesDegree = degreeFilter === "all" || scholarship.degree === degreeFilter;
      const matchesFunding = fundingFilter === "all" || scholarship.funding === fundingFilter;

      return matchesSearch && matchesCountry && matchesDegree && matchesFunding;
    });
  }, [searchQuery, countryFilter, degreeFilter, fundingFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero onSearch={setSearchQuery} />
      
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

                {/* AdSense Placeholder */}
                <div className="bg-muted rounded-2xl p-6 text-center mb-8">
                  <p className="text-muted-foreground text-sm">Advertisement</p>
                  <p className="text-muted-foreground mt-2">[Google AdSense Placeholder - 970x90]</p>
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

                {/* AdSense Placeholder */}
                <div className="bg-muted rounded-2xl p-6 text-center mb-8">
                  <p className="text-muted-foreground text-sm">Advertisement</p>
                  <p className="text-muted-foreground mt-2">[Google AdSense Placeholder - 970x90]</p>
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

                {/* AdSense Placeholder */}
                <div className="bg-muted rounded-2xl p-6 text-center mb-8">
                  <p className="text-muted-foreground text-sm">Advertisement</p>
                  <p className="text-muted-foreground mt-2">[Google AdSense Placeholder - 970x90]</p>
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
