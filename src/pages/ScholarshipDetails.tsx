import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockScholarships } from "@/data/mockScholarships";
import { 
  Calendar, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  ExternalLink,
  Share2,
  ArrowLeft,
  Facebook,
  Send,
  Twitter,
  MessageCircle
} from "lucide-react";

export default function ScholarshipDetails() {
  const { id } = useParams();
  const scholarship = mockScholarships.find(s => s.id === id);
  
  // Get similar scholarships (exclude current one)
  const similarScholarships = mockScholarships
    .filter(s => s.id !== id && (s.country === scholarship?.country || s.degree === scholarship?.degree))
    .slice(0, 3);

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Scholarship Not Found
          </h1>
          <Link to="/scholarships">
            <Button>View All Scholarships</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this scholarship: ${scholarship.title}`;

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
      <Navbar />
      
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scholarships
          </Link>

          <div className="bg-card rounded-2xl shadow-strong p-8 mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {scholarship.featured && (
                <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
              )}
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            </div>

            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              {scholarship.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {scholarship.university}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center text-foreground">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span>{scholarship.country}</span>
              </div>
              <div className="flex items-center text-foreground">
                <GraduationCap className="w-5 h-5 mr-3 text-primary" />
                <span>{scholarship.degree}</span>
              </div>
              <div className="flex items-center text-foreground">
                <DollarSign className="w-5 h-5 mr-3 text-secondary" />
                <span>{scholarship.funding}</span>
              </div>
              <div className="flex items-center text-foreground">
                <Calendar className="w-5 h-5 mr-3 text-destructive" />
                <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">About This Scholarship</h2>
              <p className="text-foreground mb-6">{scholarship.description}</p>

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
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                Apply Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Save for Later
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Share This Scholarship
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleShare("facebook")}
                  className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("twitter")}
                  className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  X (Twitter)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("telegram")}
                  className="hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc] transition-all"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("whatsapp")}
                  className="hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* AdSense Placeholder */}
          <div className="bg-muted rounded-2xl p-8 text-center mb-6">
            <p className="text-muted-foreground text-sm">Advertisement</p>
            <p className="text-muted-foreground mt-2">[Google AdSense Placeholder - 728x90]</p>
          </div>

          {/* Similar Scholarships Section */}
          {similarScholarships.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Similar Scholarships</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarScholarships.map((similarScholarship) => (
                  <ScholarshipCard key={similarScholarship.id} scholarship={similarScholarship} />
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
