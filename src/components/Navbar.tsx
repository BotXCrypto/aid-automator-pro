import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/scholarships", label: "Scholarships" },
    { path: "/news", label: "Education News" },
    { path: "/submit", label: "Submit" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-soft backdrop-blur-md bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Newspaper className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
            <div className="flex flex-col">
            <span className="text-2xl font-heading font-bold text-primary leading-tight">NextScholar</span>
            <span className="text-[10px] text-muted-foreground font-medium leading-tight -mt-1">Smart Scholarships & Education Insights</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="#newsletter">
              <Button className="bg-gradient-accent hover:bg-gradient-hover transition-all rounded-xl">
                Subscribe
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="#newsletter">
              <Button className="w-full mt-4 bg-gradient-accent hover:bg-gradient-hover transition-all rounded-xl">
                Subscribe
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
