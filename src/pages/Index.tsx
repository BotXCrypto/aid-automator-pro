import { useState, useMemo } from "react";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { EmailSubscribe } from "@/components/EmailSubscribe";
import { Footer } from "@/components/Footer";
import { mockScholarships } from "@/data/mockScholarships";

const Index = () => {
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
      <Hero onSearch={setSearchQuery} />
      
      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <FilterBar
            onCountryChange={setCountryFilter}
            onDegreeChange={setDegreeFilter}
            onFundingChange={setFundingFilter}
          />
          
          <div className="mt-8 mb-6">
            <h2 className="text-3xl font-bold text-foreground">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Scholarships'}
            </h2>
            <p className="text-muted-foreground mt-2">
              Showing {filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''}
            </p>
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
      
      <EmailSubscribe />
      <Footer />
    </div>
  );
};

export default Index;
