import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { api } from "@/services/api";
import type { Scholarship } from "@/components/ScholarshipCard";
import { CommentSection } from "@/components/CommentSection";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { 
  Calendar, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  ExternalLink,
  Share2,
  Facebook,
  Send,
  Twitter,
  MessageCircle
} from "lucide-react";

const categoryConfig: Record<string, { label: string; plural: string; path: string }> = {
  scholarship: { label: "Scholarship", plural: "Scholarships", path: "/scholarships" },
  internship: { label: "Internship", plural: "Internships", path: "/internships" },
  job: { label: "Job", plural: "Jobs", path: "/jobs" },
  news: { label: "News", plural: "Education News", path: "/news" },
};

export default function ScholarshipDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarPosts, setSimilarPosts] = useState<Scholarship[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const found = await api.getPostById(id);
        setPost(found);

        if (found) {
          const category = found.category || "scholarship";
          const allInCategory = await api.getPostsByCategory(category);
          const similar = allInCategory
            .filter(s => s.id !== id && (s.country === found.country || s.degree === found.degree))
            .slice(0, 3);
          setSimilarPosts(similar);
        }
      } catch (err) {
        console.error("Failed to fetch post details:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg text-muted-foreground">Loading details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Post Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/scholarships">
            <Button size="lg">View All Scholarships</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const category = post.category || "scholarship";
  const config = categoryConfig[category] || categoryConfig.scholarship;

  const shareUrl = window.location.href;
  const shareText = `Check out this ${config.label.toLowerCase()}: ${post.title}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.title}
        description={`${post.funding} ${post.degree} ${config.label.toLowerCase()} at ${post.university}, ${post.country}. Deadline: ${post.deadline ? new Date(post.deadline).toLocaleDateString() : "N/A"}. ${post.description?.slice(0, 100) || ""}`}
        canonical={`/scholarship/${id}`}
        type="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            name: post.title,
            description: post.description,
            provider: {
              "@type": "EducationalOrganization",
              name: post.university,
              address: { "@type": "PostalAddress", addressCountry: post.country },
            },
            educationalProgramMode: post.degree,
            offers: {
              "@type": "Offer",
              category: post.funding,
              availability: post.deadline && new Date(post.deadline) > new Date()
                ? "https://schema.org/InStock"
                : "https://schema.org/SoldOut",
            },
            applicationDeadline: post.deadline,
          }),
        }}
      />
      <Navbar />
      
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <PageBreadcrumb items={[
            { label: "Home", href: "/" },
            { label: config.plural, href: config.path },
            { label: post.title }
          ]} />

          <div className="bg-card rounded-2xl shadow-strong p-8 mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.featured && (
                <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
              )}
              <Badge className="bg-primary text-primary-foreground">{config.label}</Badge>
            </div>

            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {post.university}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {post.country && (
                <div className="flex items-center text-foreground">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <span>{post.country}</span>
                </div>
              )}
              {post.degree && (
                <div className="flex items-center text-foreground">
                  <GraduationCap className="w-5 h-5 mr-3 text-primary" />
                  <span>{post.degree}</span>
                </div>
              )}
              {post.funding && (
                <div className="flex items-center text-foreground">
                  <DollarSign className="w-5 h-5 mr-3 text-secondary" />
                  <span>{post.funding}</span>
                </div>
              )}
              {post.deadline && (
                <div className="flex items-center text-foreground">
                  <Calendar className="w-5 h-5 mr-3 text-destructive" />
                  <span>Deadline: {new Date(post.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">About This {config.label}</h2>
              <p className="text-foreground mb-6">{post.description}</p>

              {(category === "scholarship" || category === "internship") && (
                <>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Eligibility</h3>
                  <ul className="list-disc list-inside text-foreground mb-6 space-y-2">
                    <li>International students from all countries are eligible</li>
                    <li>Strong academic record required</li>
                    <li>English language proficiency (TOEFL/IELTS may be required)</li>
                    <li>Meet the admission requirements of the university</li>
                  </ul>

                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Benefits</h3>
                  <ul className="list-disc list-inside text-foreground mb-6 space-y-2">
                    <li>Full tuition fee coverage</li>
                    <li>Monthly living stipend</li>
                    <li>Health insurance</li>
                    <li>Travel allowance</li>
                  </ul>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {post.link ? (
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Apply Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              ) : (
                <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              )}
              <Button size="lg" variant="outline" className="flex-1">
                Save for Later
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Share This {config.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => handleShare("facebook")} className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all">
                  <Facebook className="w-4 h-4 mr-2" /> Facebook
                </Button>
                <Button variant="outline" onClick={() => handleShare("twitter")} className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all">
                  <Twitter className="w-4 h-4 mr-2" /> X (Twitter)
                </Button>
                <Button variant="outline" onClick={() => handleShare("telegram")} className="hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc] transition-all">
                  <Send className="w-4 h-4 mr-2" /> Telegram
                </Button>
                <Button variant="outline" onClick={() => handleShare("whatsapp")} className="hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <CommentSection postId={id!} />
          </div>

          {similarPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Similar {config.plural}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarPosts.map((p) => (
                  <ScholarshipCard key={p.id} scholarship={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}