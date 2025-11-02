import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 51, 102, 0.95) 0%, rgba(0, 194, 168, 0.90) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container relative z-10 px-4 py-24 mx-auto text-center">
        <h1 className="mb-6 text-5xl font-heading font-bold text-white md:text-6xl lg:text-7xl animate-fade-in">
          Find Fully Funded Scholarships Worldwide
        </h1>
        <p className="mb-10 text-xl text-white/95 md:text-2xl max-w-3xl mx-auto animate-fade-in font-medium" style={{ animationDelay: '0.1s' }}>
          Discover scholarships for Bachelor's, Master's, and PhD programs • Updated Daily • 100% Free
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-3 p-3 bg-white rounded-2xl shadow-strong">
            <Input
              type="text"
              name="search"
              placeholder="Search by country, university, or degree level..."
              className="flex-1 border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 font-sans"
            />
            <Button type="submit" size="lg" className="bg-gradient-accent hover:bg-gradient-hover transition-all px-8 rounded-xl">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl">
            Subscribe for Updates
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl">
            Submit a Scholarship
          </Button>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/90 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span>500+ Scholarships</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span>Updated Daily</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span>100% Free</span>
          </div>
        </div>
      </div>
    </section>
  );
};
