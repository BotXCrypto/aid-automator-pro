import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const { toast } = useToast();
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [scholarshipsCount, setScholarshipsCount] = useState<number | null>(null);
  const [internshipsCount, setInternshipsCount] = useState<number | null>(null);
  const [partnersCount, setPartnersCount] = useState<number | null>(null);
  // Friendly static placeholders to show when there isn't enough live data yet
  const PLACEHOLDER_SCHOLARSHIPS = 120;
  const PLACEHOLDER_PARTNERS = 35;
  const PLACEHOLDER_INTERNSHIPS = 28;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) {
      toast({ title: "Enter an email", description: "Please enter your email to subscribe." });
      return;
    }

    setIsSubscribing(true);
    // For now, just show success toast - subscriptions table not yet implemented
    setTimeout(() => {
      setSubscribeEmail("");
      toast({ title: "Subscribed", description: "Thanks — we'll send updates to your inbox." });
      setIsSubscribing(false);
    }, 500);
  };

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const { count: sCount, error: sErr } = await supabase
          .from("posts")
          .select("id", { count: "exact" })
          .eq("category", "scholarship")
          .eq("status", "approved");

        const { count: iCount, error: iErr } = await supabase
          .from("posts")
          .select("id", { count: "exact" })
          .eq("category", "internship")
          .eq("status", "approved");

        const { data: univData, error: uErr } = await supabase
          .from("posts")
          .select("university")
          .neq("university", null);

        if (sErr) console.warn("Error fetching scholarship count", sErr);
        if (iErr) console.warn("Error fetching internship count", iErr);
        if (uErr) console.warn("Error fetching universities", uErr);

        setScholarshipsCount(typeof sCount === "number" ? sCount : 0);
        setInternshipsCount(typeof iCount === "number" ? iCount : 0);

        let partners = 0;
        if (Array.isArray(univData)) {
          const set = new Set(
            univData.map((r: any) => (r?.university || "").toString().trim()).filter(Boolean)
          );
          partners = set.size;
        }
        setPartnersCount(partners);
      } catch (err) {
        console.error("Error fetching stats", err);
        setScholarshipsCount(0);
        setInternshipsCount(0);
        setPartnersCount(0);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCount = (n: number | null) => {
    if (n === null) return "—";
    if (n < 1000) return String(n);
    return `${Math.round(n / 100) / 10}k`;
  };

  const getDisplayCount = (count: number | null, placeholder: number) => {
    if (statsLoading) return "—";
    if (typeof count === "number" && count > 0) return formatCount(count);
    // show friendly static placeholder when there's no real data yet
    return `${formatCount(placeholder)}+`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* About removed from here - will re-insert below contact form */}

      {/* Contact form and contact methods */}
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Contact Us</h2>
          <p className="text-xl text-muted-foreground mb-6">Have questions? We'd love to hear from you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-2xl shadow-medium p-6">
              <Mail className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Email Us</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>
                  <a href="mailto:scholarhub.info@gmail.com" className="text-primary hover:underline">scholarhub.info@gmail.com</a>
                </div>
                <div>
                  <a href="mailto:nextscholar.info@gmail.com" className="text-primary hover:underline">nextscholar.info@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-medium p-6">
              <MessageSquare className="w-10 h-10 text-secondary mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Live Chat (WhatsApp)</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Available Mon-Fri, 9am-5pm (local hours)</div>
                <div>
                  <a
                    href="https://wa.me/923101362920"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Chat on WhatsApp: +92 310 136 2920
                  </a>
                </div>
                <div>
                  <a href="tel:+923101362920" className="text-primary hover:underline">Call: +92 310 136 2920</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-strong p-8">
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Your full name" required className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" required className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="What is this about?" required className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={6}
                  required
                  className="rounded-xl"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-accent hover:bg-gradient-hover transition-all rounded-xl">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* About / Mission section (moved below contact form) */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">About</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            We connect students with high-quality scholarships and internships worldwide. Our team verifies listings, surfaces urgent deadlines, and curates opportunities so students can focus on applying.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-2xl p-6 text-left">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-3xl font-heading font-bold text-foreground">
                  {getDisplayCount(scholarshipsCount, PLACEHOLDER_SCHOLARSHIPS)}
                </div>
                <div className="text-sm text-muted-foreground">Updated weekly</div>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Scholarships</h3>
              <p className="text-muted-foreground mb-3">Curated scholarship opportunities filtered by eligibility, funding, and deadline.</p>
              <ul className="text-sm text-muted-foreground mb-3 space-y-1 list-inside list-disc">
                <li>Eligibility: degree level & country filters</li>
                <li>Funding types: fully/partially funded or self-funded</li>
                <li>Application tips and deadlines highlighted</li>
              </ul>
              <Link to="/scholarships" className="text-sm font-medium text-primary">Browse Scholarships →</Link>
            </div>
            <div className="bg-card rounded-2xl p-6 text-left">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-3xl font-heading font-bold text-foreground">
                  {getDisplayCount(partnersCount, PLACEHOLDER_PARTNERS)}
                </div>
                <div className="text-sm text-muted-foreground">Verified partners</div>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Partner Universities</h3>
              <p className="text-muted-foreground mb-3">Institutions and foundations that publish scholarships and internships on our platform.</p>
              <ul className="text-sm text-muted-foreground mb-3 space-y-1 list-inside list-disc">
                <li>University programs and departmental awards</li>
                <li>Foundation-funded scholarships</li>
                <li>Direct links to official program pages</li>
              </ul>
              <Link to="/scholarships" className="text-sm font-medium text-primary">See Partner Listings →</Link>
            </div>
            <div className="bg-card rounded-2xl p-6 text-left">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-3xl font-heading font-bold text-foreground">
                  {getDisplayCount(internshipsCount, PLACEHOLDER_INTERNSHIPS)}
                </div>
                <div className="text-sm text-muted-foreground">Professional roles</div>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Internships</h3>
              <p className="text-muted-foreground mb-3">Short-term professional placements and project-based internships to build experience.</p>
              <ul className="text-sm text-muted-foreground mb-3 space-y-1 list-inside list-disc">
                <li>Industry collaborations and research placements</li>
                <li>Application requirements and timelines</li>
                <li>Contacts for program coordinators</li>
              </ul>
              <Link to="/internships" className="text-sm font-medium text-primary">Explore Internships →</Link>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 mb-10">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Subscribe for curated updates</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="your.email@example.com"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                className="rounded-xl"
                aria-label="Subscribe email"
              />
              <Button type="submit" className="rounded-xl md:w-40" disabled={isSubscribing}>
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
