import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Send, MessageCircle } from "lucide-react";
import { guides } from "@/data/guides";

export default function GuideDetails() {
    const { id } = useParams();
    const guide = guides.find(g => g.id === id);

    if (!guide) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                        Guide Not Found
                    </h1>
                    <Link to="/">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const shareUrl = window.location.href;
    const shareText = `Read this guide: ${guide.title}`;

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
                title={guide.title}
                description={guide.content.replace(/<[^>]*>/g, '').slice(0, 155)}
                canonical={`/guides/${guide.id}`}
                type="article"
            />
            <Navbar />

            <article className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link to="/" className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Guides
                    </Link>

                    <div className="mb-8 text-center">
                        <div className="text-6xl mb-6">{guide.icon}</div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                            {guide.title}
                        </h1>

                        <div className="flex flex-wrap justify-center gap-4 text-muted-foreground text-sm">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {guide.author}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {guide.date}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {guide.readTime}
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-2xl shadow-soft p-8 md:p-12 mb-8">
                        <div
                            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:text-secondary"
                            dangerouslySetInnerHTML={{ __html: guide.content }}
                        />
                    </div>

                    <div className="border-t border-border pt-8">
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
                            Share this Guide
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" size="icon" onClick={() => handleShare("facebook")} className="rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]">
                                <Facebook className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleShare("twitter")} className="rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]">
                                <Twitter className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleShare("telegram")} className="rounded-full hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc]">
                                <Send className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleShare("whatsapp")} className="rounded-full hover:bg-[#25D366] hover:text-white hover:border-[#25D366]">
                                <MessageCircle className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
}
