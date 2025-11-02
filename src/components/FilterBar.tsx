import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  onCountryChange: (country: string) => void;
  onDegreeChange: (degree: string) => void;
  onFundingChange: (funding: string) => void;
}

export const FilterBar = ({ onCountryChange, onDegreeChange, onFundingChange }: FilterBarProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Filter Scholarships</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select onValueChange={onCountryChange}>
            <SelectTrigger id="country">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Netherlands">Netherlands</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="degree">Degree Level</Label>
          <Select onValueChange={onDegreeChange}>
            <SelectTrigger id="degree">
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

        <div className="space-y-2">
          <Label htmlFor="funding">Funding Type</Label>
          <Select onValueChange={onFundingChange}>
            <SelectTrigger id="funding">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Fully Funded">Fully Funded</SelectItem>
              <SelectItem value="Partial Funding">Partial Funding</SelectItem>
              <SelectItem value="Tuition Waiver">Tuition Waiver</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
