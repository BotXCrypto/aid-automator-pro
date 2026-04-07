import { Calendar, MapPin, GraduationCap, DollarSign, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface Scholarship {
  id: string;
  title: string;
  university: string;
  country: string;
  degree: string;
  deadline: string;
  funding: string;
  description: string;
  featured?: boolean;
  urgent?: boolean;
  category?: string;
  link?: string;
}

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard = ({ scholarship }: ScholarshipCardProps) => {
  const isDeadlineSoon = () => {
    const deadline = new Date(scholarship.deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-hover hover:-translate-y-2 bg-card border-border rounded-2xl animate-fade-in hover:border-primary/30">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {scholarship.featured && (
            <Badge className="bg-secondary text-secondary-foreground animate-scale-in hover:scale-110 transition-transform">Featured</Badge>
          )}
          {!scholarship.featured && isDeadlineSoon() && (
            <Badge variant="destructive" className="animate-scale-in hover:scale-110 transition-transform">Deadline Soon</Badge>
          )}
          <Badge className="bg-primary text-primary-foreground animate-scale-in hover:scale-110 transition-transform">New</Badge>
        </div>

        <div className="mb-3">
          <Link to={`/scholarship/${scholarship.id}`}>
            <h3 className="text-xl font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-all duration-300 cursor-pointer hover:translate-x-1">
              {scholarship.title}
            </h3>
          </Link>
          <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">{scholarship.university}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 transition-colors group-hover:text-foreground/80">
          {scholarship.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-foreground group/item hover:translate-x-1 transition-transform">
            <MapPin className="w-4 h-4 mr-2 text-primary group-hover/item:scale-110 transition-transform" />
            {scholarship.country}
          </div>
          <div className="flex items-center text-sm text-foreground group/item hover:translate-x-1 transition-transform">
            <GraduationCap className="w-4 h-4 mr-2 text-primary group-hover/item:scale-110 transition-transform" />
            {scholarship.degree}
          </div>
          <div className="flex items-center text-sm text-foreground group/item hover:translate-x-1 transition-transform">
            <DollarSign className="w-4 h-4 mr-2 text-secondary group-hover/item:scale-110 transition-transform" />
            {scholarship.funding}
          </div>
          <div className="flex items-center text-sm text-foreground group/item hover:translate-x-1 transition-transform">
            <Calendar className="w-4 h-4 mr-2 text-destructive group-hover/item:scale-110 transition-transform" />
            Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
          </div>
        </div>

        <Link to={`/scholarship/${scholarship.id}`}>
          <Button className="w-full bg-gradient-accent hover:bg-gradient-hover transition-all duration-300 rounded-xl hover:scale-105 hover:shadow-lg group/btn">
            <span className="group-hover/btn:translate-x-1 transition-transform inline-block">View Details</span>
            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
