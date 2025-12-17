import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<{ avatar_url: string | null; full_name: string | null } | null>(null);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Fetch user profile
  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("avatar_url, full_name")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => setProfile(data));
    } else {
      setProfile(null);
    }
  }, [user]);

  const getInitials = (email: string, name?: string | null) => {
    if (name) return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    return email.slice(0, 2).toUpperCase();
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/scholarships", label: "Scholarships" },
    { path: "/internships", label: "Internships" },
    { path: "/news", label: "Education News" },
    { path: "/submit", label: "Submit" },
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
            
            {/* User Profile Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} alt="Profile" />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials(user.email || "", profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border border-border shadow-lg z-50">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url || undefined} alt="Profile" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.email || "", profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      {profile?.full_name && (
                        <span className="text-sm font-medium text-foreground truncate">{profile.full_name}</span>
                      )}
                      <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                          <Settings className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="rounded-xl gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}

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
            
            {/* Mobile User Actions */}
            {user ? (
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.avatar_url || undefined} alt="Profile" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.email || "", profile?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col overflow-hidden">
                    {profile?.full_name && (
                      <span className="text-sm font-medium text-foreground truncate">{profile.full_name}</span>
                    )}
                    <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 py-2 text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full mt-4 gap-2 rounded-xl">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}

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