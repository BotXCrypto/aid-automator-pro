import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function Submit() {
  const { toast } = useToast();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("scholarship");
  const [university, setUniversity] = useState("");
  const [country, setCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [funding, setFunding] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const normalizeDegree = (d: string) => {
    const v = d.toLowerCase();
    if (v.includes("bachelor")) return "bachelor";
    if (v.includes("master")) return "master";
    if (v.includes("phd") || v.includes("doctor")) return "phd";
    return null;
  };

  const normalizeFunding = (f: string) => {
    const v = f.toLowerCase();
    if (v.includes("fully")) return "fully_funded";
    if (v.includes("partial") || v.includes("tuition")) return "partially_funded";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use custom country if "Other" is selected
    const finalCountry = country === "Other" ? customCountry.trim() : country;

    // Validate required fields based on category
    const needsDetails = category === "scholarship" || category === "internship" || category === "job";
    
    if (!title.trim() || !description.trim()) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    if (needsDetails && (!university.trim() || !finalCountry || !degree || !funding || !deadline)) {
      toast({ title: "Error", description: "Please fill all required fields for this post type", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    try {
      let image_url: string | null = null;

      if (imageFile) {
        setUploadingImage(true);
        const filePath = `submissions/${Date.now()}_${imageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, imageFile, { cacheControl: "3600", upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage.from("images").getPublicUrl(filePath);
        image_url = publicData?.publicUrl ?? null;
        setUploadingImage(false);
      }

      const insert = {
        title: title.trim(),
        category: category,
        university: university.trim() || null,
        country: finalCountry || null,
        degree: degree ? normalizeDegree(degree) : null,
        funding: funding ? normalizeFunding(funding) : null,
        deadline: deadline || null,
        description: description.trim(),
        link: url || null,
        image_url: image_url,
        status: "pending",
        submitted_by_name: user?.email ? user?.email : null,
        submitted_by_email: user?.email ?? null,
      } as any;

      const { data, error } = await supabase.from("user_submissions").insert([insert]).select().single();

      if (error) throw error;

      toast({ title: "Submission Received!", description: "Thank you — your submission was saved for review." });

      // Reset form
      setTitle("");
      setCategory("scholarship");
      setUniversity("");
      setCountry("");
      setCustomCountry("");
      setDegree("");
      setFunding("");
      setDeadline("");
      setDescription("");
      setUrl("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      console.error("Submit error:", err);
      toast({ title: "Submission Failed", description: err.message || "Failed to submit", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const isScholarshipOrInternship = category === "scholarship" || category === "internship";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Submit a Scholarship"
        description="Submit a scholarship, internship, or education news to NextScholar. Help students discover new opportunities worldwide."
        canonical="/submit"
      />
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Submit a Post
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Share scholarships, internships, or education news with students worldwide
          </p>

          <div className="bg-card rounded-2xl shadow-strong p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Post Type *</Label>
                <Select value={category} onValueChange={(v) => setCategory(v)} required>
                  <SelectTrigger id="category" className="rounded-xl">
                    <SelectValue placeholder="Select post type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="news">Education News</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">
                  {category === "scholarship" ? "Scholarship" : category === "internship" ? "Internship" : "News"} Title *
                </Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder={
                    category === "scholarship" ? "e.g., Full Scholarship for Masters in Computer Science" :
                    category === "internship" ? "e.g., Summer Internship at Google" :
                    "e.g., New Student Visa Rules for Canada"
                  } 
                  required 
                  className="rounded-xl" 
                />
              </div>

              {isScholarshipOrInternship && (
                <div className="space-y-2">
                  <Label htmlFor="university">University/Organization *</Label>
                  <Input 
                    id="university" 
                    name="university" 
                    value={university} 
                    onChange={(e) => setUniversity(e.target.value)} 
                    placeholder="e.g., Harvard University" 
                    required 
                    className="rounded-xl" 
                  />
                </div>
              )}

              {isScholarshipOrInternship && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select value={country} onValueChange={(v) => setCountry(v)} required>
                      <SelectTrigger id="country" className="rounded-xl">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="Argentina">Argentina</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Austria">Austria</SelectItem>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="Belgium">Belgium</SelectItem>
                        <SelectItem value="Brazil">Brazil</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Chile">Chile</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="Czech Republic">Czech Republic</SelectItem>
                        <SelectItem value="Denmark">Denmark</SelectItem>
                        <SelectItem value="Egypt">Egypt</SelectItem>
                        <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                        <SelectItem value="Finland">Finland</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Hong Kong">Hong Kong</SelectItem>
                        <SelectItem value="Hungary">Hungary</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                        <SelectItem value="Israel">Israel</SelectItem>
                        <SelectItem value="Italy">Italy</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Malaysia">Malaysia</SelectItem>
                        <SelectItem value="Mexico">Mexico</SelectItem>
                        <SelectItem value="Morocco">Morocco</SelectItem>
                        <SelectItem value="Nepal">Nepal</SelectItem>
                        <SelectItem value="Netherlands">Netherlands</SelectItem>
                        <SelectItem value="New Zealand">New Zealand</SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Norway">Norway</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                        <SelectItem value="Philippines">Philippines</SelectItem>
                        <SelectItem value="Poland">Poland</SelectItem>
                        <SelectItem value="Portugal">Portugal</SelectItem>
                        <SelectItem value="Qatar">Qatar</SelectItem>
                        <SelectItem value="Russia">Russia</SelectItem>
                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                        <SelectItem value="South Korea">South Korea</SelectItem>
                        <SelectItem value="Spain">Spain</SelectItem>
                        <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                        <SelectItem value="Sweden">Sweden</SelectItem>
                        <SelectItem value="Switzerland">Switzerland</SelectItem>
                        <SelectItem value="Taiwan">Taiwan</SelectItem>
                        <SelectItem value="Thailand">Thailand</SelectItem>
                        <SelectItem value="Tunisia">Tunisia</SelectItem>
                        <SelectItem value="Turkey">Turkey</SelectItem>
                        <SelectItem value="UAE">UAE</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="Vietnam">Vietnam</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {country === "Other" && (
                      <div className="mt-2">
                        <Input 
                          id="customCountry" 
                          name="customCountry" 
                          value={customCountry} 
                          onChange={(e) => setCustomCountry(e.target.value)} 
                          placeholder="Enter country name" 
                          required 
                          className="rounded-xl" 
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree Level *</Label>
                    <Select value={degree} onValueChange={(v) => setDegree(v)} required>
                      <SelectTrigger id="degree" className="rounded-xl">
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                        <SelectItem value="Master's">Master's</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {isScholarshipOrInternship && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="funding">Funding Type *</Label>
                    <Select value={funding} onValueChange={(v) => setFunding(v)} required>
                      <SelectTrigger id="funding" className="rounded-xl">
                        <SelectValue placeholder="Select funding type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fully Funded">Fully Funded</SelectItem>
                        <SelectItem value="Partial Funding">Partial Funding</SelectItem>
                        <SelectItem value="Tuition Waiver">Tuition Waiver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline *</Label>
                    <Input 
                      id="deadline" 
                      name="deadline" 
                      type="date" 
                      value={deadline} 
                      onChange={(e) => setDeadline(e.target.value)} 
                      required 
                      className="rounded-xl" 
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder={
                    category === "scholarship" ? "Provide details about the scholarship, eligibility criteria, benefits, etc." :
                    category === "internship" ? "Describe the internship role, requirements, duration, benefits, etc." :
                    "Share the news details, what students need to know, etc."
                  }
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Application URL</Label>
                <Input 
                  id="url" 
                  name="url" 
                  type="url" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  placeholder="https://..." 
                  className="rounded-xl" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (optional)</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setImageFile(f);
                    if (f) {
                      const reader = new FileReader();
                      reader.onload = () => setImagePreview(String(reader.result));
                      reader.readAsDataURL(f);
                    } else {
                      setImagePreview(null);
                    }
                  }}
                  className="rounded-xl"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="preview" className="max-h-48 rounded-md" />
                  </div>
                )}
              </div>

              <Button type="submit" size="lg" disabled={submitting} className="w-full bg-gradient-accent hover:bg-gradient-hover transition-all">
                <Send className="w-5 h-5 mr-2" />
                {submitting ? "Submitting..." : `Submit ${category === "scholarship" ? "Scholarship" : category === "internship" ? "Internship" : "News"}`}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
