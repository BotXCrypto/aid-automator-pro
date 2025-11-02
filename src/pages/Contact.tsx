import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Have questions? We'd love to hear from you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-2xl shadow-medium p-6">
              <Mail className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-muted-foreground">info@nextscholar.com</p>
            </div>

            <div className="bg-card rounded-2xl shadow-medium p-6">
              <MessageSquare className="w-10 h-10 text-secondary mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-muted-foreground">Available Mon-Fri, 9am-5pm EST</p>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-strong p-8">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Send us a message</h2>
            
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

      <Footer />
    </div>
  );
}
