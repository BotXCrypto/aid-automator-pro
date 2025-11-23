import { Scholarship } from "@/components/ScholarshipCard";
import { supabase } from "@/integrations/supabase/client";

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

export const api = {
  getScholarships: async (): Promise<Scholarship[]> => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "approved")
        .eq("category", "scholarship")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        university: p.university || "",
        country: p.country || "",
        degree: humanizeDegree(p.degree),
        deadline: p.deadline || "",
        funding: humanizeFunding(p.funding),
        description: p.description || "",
        featured: !!p.featured,
        urgent: !!p.urgent,
      } as Scholarship));
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      return [];
    }
  },

  getNews: async (): Promise<Scholarship[]> => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "approved")
        .eq("category", "news")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        university: p.university || "",
        country: p.country || "",
        degree: humanizeDegree(p.degree),
        deadline: p.deadline || "",
        funding: humanizeFunding(p.funding),
        description: p.description || "",
        featured: !!p.featured,
        urgent: !!p.urgent,
      } as Scholarship));
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  },

  getPostById: async (id: string): Promise<Scholarship | null> => {
    try {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        title: data.title,
        university: data.university || "",
        country: data.country || "",
        degree: humanizeDegree(data.degree),
        deadline: data.deadline || "",
        funding: humanizeFunding(data.funding),
        description: data.description || "",
        featured: !!data.featured,
        urgent: !!data.urgent,
      } as Scholarship;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  }
  ,

  getInternships: async (): Promise<Scholarship[]> => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "approved")
        .eq("category", "internship")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        university: p.university || "",
        country: p.country || "",
        degree: humanizeDegree(p.degree),
        deadline: p.deadline || "",
        funding: humanizeFunding(p.funding),
        description: p.description || "",
        featured: !!p.featured,
        urgent: !!p.urgent,
      } as Scholarship));
    } catch (error) {
      console.error("Error fetching internships:", error);
      return [];
    }
  }
};
