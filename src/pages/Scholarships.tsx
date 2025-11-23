import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { FilterBar } from "@/components/FilterBar";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { Footer } from "@/components/Footer";
import { api } from "@/services/api";
import type { Scholarship } from "@/components/ScholarshipCard";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search } from "lucide-react";

export default function Scholarships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [fundingFilter, setFundingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [allScholarships, setAllScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const data = await api.getScholarships();
        setAllScholarships(data);
      } catch (err) {
        console.error("Failed to fetch scholarships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const humanizeDegree = (d: string | null) => {
    if (!d) return "";
    const map: Record<string, string> = {
      bachelor: "Bachelor",
      master: "Master's",
      phd: "PhD",
      undergraduate: "Undergraduate",
      postgraduate: "Postgraduate",
    };
    return map[d] ?? String(d);
  };

  const humanizeFunding = (f: string | null) => {
    if (!f) return "";
    const map: Record<string, string> = {
      fully_funded: "Fully Funded",
      partially_funded: "Partially Funded",
      not_funded: "Not Funded",
    };
    return map[f] ?? String(f);
  };

  const filteredScholarships = useMemo(() => {
    return allScholarships.filter((scholarship) => {
      const matchesSearch = searchQuery === "" ||
        scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (scholarship.country || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = countryFilter === "all" || scholarship.country === countryFilter;
      const matchesDegree = degreeFilter === "all" || scholarship.degree === degreeFilter;
      const matchesFunding = fundingFilter === "all" || scholarship.funding === fundingFilter;

      return matchesSearch && matchesCountry && matchesDegree && matchesFunding;
    });
  }, [searchQuery, countryFilter, degreeFilter, fundingFilter, allScholarships]);

  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScholarships = filteredScholarships.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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


          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No scholarships found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (totalPages <= 7 || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

