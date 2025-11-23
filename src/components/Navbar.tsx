import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/scholarships", label: "Scholarships" },
    { path: "/internships", label: "Internships" },
    { path: "/news", label: "Education News" },
    { path: "/submit", label: "Submit" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-soft backdrop-blur-md bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/favicon.png"
              alt="NextScholar Icon"
              className="h-10 w-10 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-primary leading-tight group-hover:tracking-wide transition-all duration-300">NextScholar</span>
              <span className="text-[10px] text-muted-foreground font-medium leading-tight -mt-1 group-hover:text-primary transition-colors">Smart Scholarships & Education Insights</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-300 hover:text-primary hover:scale-110 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${isActive(link.path) ? "text-primary after:scale-x-100" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="#newsletter">
              <Button className="bg-gradient-accent hover:bg-gradient-hover transition-all duration-300 rounded-xl hover:scale-105 hover:shadow-lg">
                Subscribe
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 animate-scale-in" /> : <Menu className="w-6 h-6 animate-scale-in" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-in-right">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 animate-fade-in ${isActive(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="#newsletter">
              <Button className="w-full mt-4 bg-gradient-accent hover:bg-gradient-hover transition-all duration-300 rounded-xl hover:scale-105 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Subscribe
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
