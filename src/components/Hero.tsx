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
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-hero opacity-95"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13, 71, 161, 0.95) 0%, rgba(13, 71, 161, 0.85) 50%, rgba(38, 166, 154, 0.85) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl animate-fade-in">
          Find Your Dream Scholarship
        </h1>
        <p className="mb-8 text-xl text-white/90 md:text-2xl max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Discover fully funded scholarships for Bachelor's, Master's, and PhD programs worldwide
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-2 p-2 bg-white rounded-xl shadow-strong">
            <Input
              type="text"
              name="search"
              placeholder="Search by country, university, or degree..."
              className="flex-1 border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" size="lg" className="bg-secondary hover:bg-secondary/90">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </form>
        
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
