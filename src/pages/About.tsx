import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GraduationCap, Globe, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            About ScholarHub
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Your trusted platform for discovering fully funded scholarships worldwide
          </p>

          <div className="bg-card rounded-2xl shadow-strong p-8 mb-8">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-foreground mb-4">
              At ScholarHub, we believe that financial constraints should never stand in the way of education. 
              Our mission is to connect ambitious students worldwide with fully funded scholarship opportunities 
              that can transform their lives and futures.
            </p>
            <p className="text-foreground">
              We aggregate, verify, and present scholarship information from universities, governments, and 
              organizations around the globe, making it easy for students to find and apply for funding opportunities 
              that match their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card rounded-2xl shadow-medium p-6">
              <GraduationCap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">500+ Scholarships</h3>
              <p className="text-muted-foreground">
                Curated database of fully funded opportunities across all degree levels
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-medium p-6">
              <Globe className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">50+ Countries</h3>
              <p className="text-muted-foreground">
                Scholarship opportunities from universities and institutions worldwide
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-medium p-6">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">50,000+ Students</h3>
              <p className="text-muted-foreground">
                Helped thousands of students find and secure scholarship funding
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-medium p-6">
              <Zap className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Updated Daily</h3>
              <p className="text-muted-foreground">
                Fresh scholarship opportunities added every day, deadlines tracked
              </p>
            </div>
          </div>

          <div className="bg-gradient-hero rounded-2xl shadow-strong p-8 text-white text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to get the latest scholarship opportunities delivered to your inbox
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
