import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src="/logos/logo-light.png"
              alt="NextScholar"
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-muted-foreground mb-4">
              Your trusted AI-ready platform for finding scholarships, study opportunities, and education insights worldwide.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Smart Scholarships & Education Insights
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/scholarships" className="hover:text-primary transition-colors">{t("footer.allScholarships")}</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">{t("nav.news")}</Link></li>
              <li><Link to="/scholarships" className="hover:text-primary transition-colors">{t("footer.deadlineSoon")}</Link></li>
              <li><Link to="/submit" className="hover:text-primary transition-colors">{t("footer.submitScholarship")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">{t("footer.appTips")}</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">{t("footer.studyGuides")}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("footer.followUs")}</h4>
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
          <p>{t("footer.rights")}</p>
          <Link to="/auth" className="text-xs hover:text-primary transition-colors mt-2 inline-block opacity-50 hover:opacity-100">
            {t("footer.admin")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
