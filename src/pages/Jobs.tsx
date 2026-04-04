import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { SEO } from "@/components/SEO";
import { api } from "@/services/api";
import type { Scholarship } from "@/components/ScholarshipCard";
import { Briefcase } from "lucide-react";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";

export default function Jobs() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [selectedFunding, setSelectedFunding] = useState("all");
  const [jobs, setJobs] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getJobs().then((data) => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCountry = selectedCountry === "all" || job.country === selectedCountry;
      const matchesDegree = selectedDegree === "all" || job.degree === selectedDegree;
      const matchesFunding = selectedFunding === "all" || job.funding === selectedFunding;
      return matchesCountry && matchesDegree && matchesFunding;
    });
  }, [jobs, selectedCountry, selectedDegree, selectedFunding]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Jobs"
        description="Find job opportunities worldwide. Browse remote and on-site positions for students and graduates."
        canonical="/jobs"
      />
      <Navbar />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <PageBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Jobs" }]} />
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 mb-4">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">Job Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Find Your Next Job
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore job openings for students and graduates around the world
            </p>
          </div>

          <FilterBar
            onCountryChange={setSelectedCountry}
            onDegreeChange={setSelectedDegree}
            onFundingChange={setSelectedFunding}
          />

          {loading ? (
            <p className="text-center text-muted-foreground py-12">Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredJobs.map((job) => (
                <ScholarshipCard key={job.id} scholarship={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">No Jobs Found</h3>
              <p className="text-muted-foreground">Check back later for new opportunities.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
