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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-2 bg-card border-border rounded-2xl">
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {scholarship.featured && (
            <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
          )}
          {!scholarship.featured && isDeadlineSoon() && (
            <Badge variant="destructive">Deadline Soon</Badge>
          )}
          <Badge className="bg-primary text-primary-foreground">New</Badge>
        </div>

        <div className="mb-3">
          <Link to={`/scholarship/${scholarship.id}`}>
            <h3 className="text-xl font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors cursor-pointer">
              {scholarship.title}
            </h3>
          </Link>
          <p className="text-sm font-medium text-muted-foreground">{scholarship.university}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {scholarship.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            {scholarship.country}
          </div>
          <div className="flex items-center text-sm text-foreground">
            <GraduationCap className="w-4 h-4 mr-2 text-primary" />
            {scholarship.degree}
          </div>
          <div className="flex items-center text-sm text-foreground">
            <DollarSign className="w-4 h-4 mr-2 text-secondary" />
            {scholarship.funding}
          </div>
          <div className="flex items-center text-sm text-foreground">
            <Calendar className="w-4 h-4 mr-2 text-destructive" />
            Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
          </div>
        </div>

        <Link to={`/scholarship/${scholarship.id}`}>
          <Button className="w-full bg-gradient-accent hover:bg-gradient-hover transition-all rounded-xl">
            View Details
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
