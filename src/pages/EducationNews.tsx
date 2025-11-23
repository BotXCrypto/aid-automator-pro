import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Globe, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "New Visa Requirements for International Students in 2025",
    excerpt: "Major countries including the UK, US, and Canada have updated their student visa requirements, introducing streamlined processes and new financial proof requirements. Experts suggest these changes will benefit students from developing countries.",
    category: "Breaking News",
    date: "2 hours ago",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Australia Opens Doors to More International Students",
    excerpt: "The Australian government has announced plans to increase the number of international student visas by 15% for the next academic year. This comes as part of their strategy to boost the education sector and attract top talent globally.",
    category: "Study Abroad",
    date: "5 hours ago",
    readTime: "4 min read",
  },
  {
    id: "3",
    title: "UK Announces Post-Study Work Visa Extensions",
    excerpt: "Graduates from UK universities can now stay and work for up to 3 years after completing their degree. This extension applies to all degree levels and aims to retain international talent in the UK workforce.",
    category: "Visa Updates",
    date: "1 day ago",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: "4",
    title: "Germany Waives Tuition Fees for More EU Students",
    excerpt: "In an effort to strengthen European collaboration in higher education, Germany has expanded its tuition-free policy to include all EU and EEA students pursuing undergraduate and graduate studies.",
    category: "Education Policy",
    date: "2 days ago",
    readTime: "3 min read",
  },
  {
    id: "5",
    title: "Top 10 Emerging Study Destinations for 2025",
    excerpt: "Countries like Singapore, South Korea, and Poland are becoming increasingly popular among international students due to affordable costs, high-quality education, and growing job markets.",
    category: "Study Abroad",
    date: "3 days ago",
    readTime: "8 min read",
  },
  {
    id: "6",
    title: "US Universities Increase Scholarship Funding",
    excerpt: "Leading US universities have announced a combined $500 million increase in scholarship funding for international students. This includes need-based and merit-based scholarships across various disciplines.",
    category: "Scholarships",
    date: "4 days ago",
    readTime: "5 min read",
  },
  {
    id: "7",
    title: "Canada Expands STEM Scholarship Programs",
    excerpt: "Canadian universities are launching new scholarship initiatives targeting STEM fields, with a focus on artificial intelligence, renewable energy, and biotechnology. The programs aim to attract top international talent to address Canada's growing tech sector needs.",
    category: "Scholarships",
    date: "5 days ago",
    readTime: "4 min read",
  },
  {
    id: "8",
    title: "New Partnership Between Asian and European Universities",
    excerpt: "A groundbreaking collaboration between 20 leading universities in Asia and Europe will offer dual-degree programs and exchange opportunities. Students will benefit from reduced tuition fees and enhanced cultural exchange experiences.",
    category: "Education Policy",
    date: "6 days ago",
    readTime: "6 min read",
  },
  {
    id: "9",
    title: "Digital Learning Revolution: Universities Embrace Hybrid Models",
    excerpt: "Post-pandemic education continues to evolve as universities worldwide adopt permanent hybrid learning models. This approach combines in-person instruction with online flexibility, offering students greater accessibility and learning options.",
    category: "Study Abroad",
    date: "1 week ago",
    readTime: "7 min read",
  },
  {
    id: "10",
    title: "Scholarship Application Tips: What Reviewers Look For",
    excerpt: "Expert scholarship committee members share insights on what makes applications stand out. From compelling personal statements to strong recommendation letters, learn the key factors that influence scholarship decisions.",
    category: "Scholarships",
    date: "1 week ago",
    readTime: "9 min read",
  },
  {
    id: "11",
    title: "Netherlands Introduces New Talent Visa Program",
    excerpt: "The Dutch government has launched an innovative visa program for international graduates, allowing them to stay and work in the Netherlands for up to three years after completing their studies. The program includes simplified processes for entrepreneurs.",
    category: "Visa Updates",
    date: "1 week ago",
    readTime: "5 min read",
  },
  {
    id: "12",
    title: "Sustainable Campus Initiatives Gain Global Momentum",
    excerpt: "Universities worldwide are investing in sustainability, from carbon-neutral campuses to green technology research centers. These initiatives not only benefit the environment but also create new scholarship opportunities for students passionate about climate action.",
    category: "Breaking News",
    date: "2 weeks ago",
    readTime: "6 min read",
  },
];

export default function EducationNews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Breaking News", "Study Abroad", "Visa Updates", "Education Policy", "Scholarships"];

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Education News & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest education news, visa updates, and study abroad opportunities from around the world
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search education news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg rounded-2xl"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl ${
                    selectedCategory === category
                      ? "bg-gradient-accent hover:bg-gradient-hover text-white"
                      : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Article */}
          {filteredArticles.find(a => a.featured) && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">Featured Article</h2>
              </div>
              {mockArticles
                .filter(a => a.featured)
                .map((article) => (
                  <div key={article.id} className="bg-card rounded-2xl shadow-strong overflow-hidden hover:shadow-hover transition-all">
                    <div className="flex flex-col lg:flex-row">
                      <div className="w-full lg:w-96 h-64 lg:h-auto bg-gradient-accent flex-shrink-0"></div>
                      <div className="flex-1 p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="secondary">{article.category}</Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </span>
                          <span className="text-sm text-muted-foreground">{article.readTime}</span>
                        </div>
                        <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-lg mb-6">
                          {article.excerpt}
                        </p>
                        <Button className="bg-gradient-accent hover:bg-gradient-hover transition-all rounded-xl">
                          Read Full Article
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* All Articles Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">All Articles</h2>
              <p className="text-muted-foreground">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div key={article.id} className="bg-card rounded-2xl shadow-medium overflow-hidden hover:shadow-hover transition-all cursor-pointer group">
                  <div className="w-full h-48 bg-gradient-accent"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No articles found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* Newsletter Signup CTA */}
          <div className="bg-gradient-hero rounded-2xl shadow-strong p-12 text-center text-white">
            <Globe className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold mb-4">Never Miss an Update</h2>
            <p className="text-xl mb-6 opacity-90">
              Get the latest education news and scholarship opportunities delivered to your inbox
            </p>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 rounded-xl">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


