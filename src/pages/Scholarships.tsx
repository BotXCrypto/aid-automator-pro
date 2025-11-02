import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { FilterBar } from "@/components/FilterBar";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { Footer } from "@/components/Footer";
import { mockScholarships } from "@/data/mockScholarships";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Scholarships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [fundingFilter, setFundingFilter] = useState("all");

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter((scholarship) => {
      const matchesSearch = searchQuery === "" || 
        scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = countryFilter === "all" || scholarship.country === countryFilter;
      const matchesDegree = degreeFilter === "all" || scholarship.degree === degreeFilter;
      const matchesFunding = fundingFilter === "all" || scholarship.funding === fundingFilter;

      return matchesSearch && matchesCountry && matchesDegree && matchesFunding;
    });
  }, [searchQuery, countryFilter, degreeFilter, fundingFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            All Scholarships
          </h1>

          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg rounded-2xl"
              />
            </div>
          </div>

          <FilterBar
            onCountryChange={setCountryFilter}
            onDegreeChange={setDegreeFilter}
            onFundingChange={setFundingFilter}
          />
          
          <div className="mt-8 mb-6">
            <p className="text-muted-foreground">
              Showing {filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* AdSense Placeholder - Top Banner */}
          <div className="bg-muted rounded-2xl p-6 text-center mb-8">
            <p className="text-muted-foreground text-sm">Advertisement</p>
            <p className="text-muted-foreground mt-2">[Google AdSense Placeholder - 970x90]</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No scholarships found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
