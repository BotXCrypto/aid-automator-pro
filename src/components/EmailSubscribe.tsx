import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const EmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Success!",
      description: "You've been subscribed to daily scholarship updates.",
    });
    
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-hero">
      <div className="container px-4 mx-auto text-center">
        <Mail className="w-16 h-16 mx-auto mb-6 text-white" />
        <h2 className="text-4xl font-bold text-white mb-4">
          Never Miss a Scholarship
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Get daily updates on new scholarships matching your profile. Join 50,000+ students already subscribed.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex gap-3 p-3 bg-white rounded-2xl shadow-strong">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" size="lg" className="bg-gradient-accent hover:bg-gradient-hover transition-all px-8 rounded-xl">
              Subscribe
            </Button>
          </div>
        </form>
        
        <p className="mt-4 text-sm text-white/70">
          No spam. Unsubscribe anytime. Your email is safe with us.
        </p>
      </div>
    </section>
  );
};
