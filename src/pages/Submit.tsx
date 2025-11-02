import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export default function Submit() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Submission Received!",
      description: "Thank you for submitting a scholarship. We'll review it and publish soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Submit a Scholarship
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Help students worldwide by sharing scholarship opportunities
          </p>

          <div className="bg-card rounded-2xl shadow-strong p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Scholarship Title *</Label>
                <Input id="title" placeholder="e.g., Full Scholarship for Masters in Computer Science" required className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University/Organization *</Label>
                <Input id="university" placeholder="e.g., Harvard University" required className="rounded-xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select required>
                    <SelectTrigger id="country" className="rounded-xl">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degree">Degree Level *</Label>
                  <Select required>
                    <SelectTrigger id="degree" className="rounded-xl">
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                      <SelectItem value="Master's">Master's</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="funding">Funding Type *</Label>
                  <Select required>
                    <SelectTrigger id="funding" className="rounded-xl">
                      <SelectValue placeholder="Select funding type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fully Funded">Fully Funded</SelectItem>
                      <SelectItem value="Partial Funding">Partial Funding</SelectItem>
                      <SelectItem value="Tuition Waiver">Tuition Waiver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline *</Label>
                  <Input id="deadline" type="date" required className="rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide details about the scholarship, eligibility criteria, benefits, etc."
                  rows={6}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Application URL</Label>
                <Input id="url" type="url" placeholder="https://..." className="rounded-xl" />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-accent hover:bg-gradient-hover transition-all">
                <Send className="w-5 h-5 mr-2" />
                Submit Scholarship
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
