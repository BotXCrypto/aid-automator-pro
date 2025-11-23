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

export default function Internships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [fundingFilter, setFundingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [allInternships, setAllInternships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      try {
        const data = await api.getInternships();
        setAllInternships(data);
      } catch (err) {
        console.error("Failed to fetch internships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const filtered = useMemo(() => {
    return allInternships.filter((item) => {
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.country || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = countryFilter === "all" || item.country === countryFilter;
      const matchesDegree = degreeFilter === "all" || item.degree === degreeFilter;
      const matchesFunding = fundingFilter === "all" || item.funding === fundingFilter;

      return matchesSearch && matchesCountry && matchesDegree && matchesFunding;
    });
  }, [allInternships, searchQuery, countryFilter, degreeFilter, fundingFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const current = filtered.slice(startIndex, startIndex + itemsPerPage);

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
            Internships
          </h1>

          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search internships..."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-6">
            {current.map((item) => (
              <ScholarshipCard key={item.id} scholarship={item} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No internships found. Try adjusting filters.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (totalPages <= 7 || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page} className="cursor-pointer">{page}</PaginationLink>
                        </PaginationItem>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}><PaginationEllipsis /></PaginationItem>
                      );
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
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
