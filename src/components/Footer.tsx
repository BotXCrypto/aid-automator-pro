import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">NextScholar</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted AI-ready platform for finding scholarships, study opportunities, and education insights worldwide.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Smart Scholarships & Education Insights
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/scholarships" className="hover:text-primary transition-colors">All Scholarships</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">Education News</Link></li>
              <li><Link to="/scholarships" className="hover:text-primary transition-colors">Deadline Soon</Link></li>
              <li><Link to="/submit" className="hover:text-primary transition-colors">Submit Scholarship</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">Application Tips</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">Study Guides</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 NextScholar. All rights reserved.</p>
          <Link to="/auth" className="text-xs hover:text-primary transition-colors mt-2 inline-block opacity-50 hover:opacity-100">
            Admin Access
          </Link>
        </div>
      </div>
    </footer>
  );
};
