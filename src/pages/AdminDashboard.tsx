import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Bot, 
  CheckCircle, 
  XCircle, 
  Clock,
  MessageSquare,
  FileText,
  Settings,
  Send
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage scholarships, education news, and AI automation features</p>
          </div>

          {/* AI Integration Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-card rounded-2xl shadow-medium hover:shadow-hover transition-all">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Import from WhatsApp
              </h3>
              <p className="text-muted-foreground mb-4">
                Automatically extract scholarship data from WhatsApp groups
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90" disabled>
                <Upload className="w-4 h-4 mr-2" />
                Connect WhatsApp
              </Button>
              <Badge className="mt-3 bg-secondary">Coming Soon</Badge>
            </Card>

            <Card className="p-6 bg-gradient-card rounded-2xl shadow-medium hover:shadow-hover transition-all">
              <Send className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Import from Telegram
              </h3>
              <p className="text-muted-foreground mb-4">
                Pull scholarship posts from Telegram channels automatically
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90" disabled>
                <Upload className="w-4 h-4 mr-2" />
                Connect Telegram
              </Button>
              <Badge className="mt-3 bg-secondary">Coming Soon</Badge>
            </Card>

            <Card className="p-6 bg-gradient-card rounded-2xl shadow-medium hover:shadow-hover transition-all">
              <Bot className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                AI Extract Info
              </h3>
              <p className="text-muted-foreground mb-4">
                Use AI to extract and format scholarship details
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90" disabled>
                <Bot className="w-4 h-4 mr-2" />
                Enable AI Extraction
              </Button>
              <Badge className="mt-3 bg-secondary">Coming Soon</Badge>
            </Card>
          </div>

          {/* Pending Approvals Section */}
          <div className="bg-card rounded-2xl shadow-strong p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Pending Approvals
              </h2>
              <Badge variant="secondary">3 Pending</Badge>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Clock className="w-8 h-8 text-secondary" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Sample Scholarship {i}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Submitted 2 hours ago • From WhatsApp
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card rounded-2xl shadow-medium">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Scholarships</span>
                  <span className="font-semibold text-foreground">500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published Today</span>
                  <span className="font-semibold text-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subscribers</span>
                  <span className="font-semibold text-foreground">50,000+</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card rounded-2xl shadow-medium">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                System Settings
              </h3>
              <Button variant="outline" className="w-full mb-2">
                <Settings className="w-4 h-4 mr-2" />
                Configure Automation
              </Button>
              <Button variant="outline" className="w-full">
                <Bot className="w-4 h-4 mr-2" />
                AI Settings
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
