import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  onCountryChange: (country: string) => void;
  onDegreeChange: (degree: string) => void;
  onFundingChange: (funding: string) => void;
  /**
   * context controls which labels/options to show. 'scholarship' (default) or 'internship'
   */
  context?: "scholarship" | "internship";
}

export const FilterBar = ({ onCountryChange, onDegreeChange, onFundingChange, context = "scholarship" }: FilterBarProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-medium animate-fade-in hover:shadow-hover transition-all duration-500 hover:border-primary/30">
      <h3 className="text-lg font-heading font-semibold mb-4 text-foreground hover:text-primary transition-colors">{context === 'internship' ? 'Filter Internships' : 'Filter Scholarships'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 group animate-fade-in">
          <Label htmlFor="country" className="group-hover:text-primary transition-colors">Country</Label>
          <Select onValueChange={onCountryChange}>
            <SelectTrigger id="country" className="hover:border-primary transition-all hover:scale-[1.02]">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 group animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Label htmlFor="degree" className="group-hover:text-primary transition-colors">Degree Level</Label>
          <Select onValueChange={onDegreeChange}>
            <SelectTrigger id="degree" className="hover:border-primary transition-all hover:scale-[1.02]">
              <SelectValue placeholder="All Degrees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Degrees</SelectItem>
              <SelectItem value="Bachelor's">Bachelor's</SelectItem>
              <SelectItem value="Master's">Master's</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 group animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Label htmlFor="funding" className="group-hover:text-primary transition-colors">{context === 'internship' ? 'Work Type' : 'Funding Type'}</Label>
          <Select onValueChange={onFundingChange}>
            <SelectTrigger id="funding" className="hover:border-primary transition-all hover:scale-[1.02]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {context === 'internship' ? (
                <>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="on_site">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="part_time">Part-time</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="fully_funded">Fully Funded</SelectItem>
                  <SelectItem value="partially_funded">Partial Funding</SelectItem>
                  <SelectItem value="tuition_waiver">Tuition Waiver</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
