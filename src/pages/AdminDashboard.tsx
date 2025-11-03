import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Upload, 
  Bot, 
  CheckCircle, 
  XCircle, 
  Clock,
  MessageSquare,
  FileText,
  Settings,
  Send,
  Pencil,
  Trash2,
  LogOut,
  BarChart3,
  Loader2,
} from "lucide-react";

type Post = {
  id: string;
  title: string;
  category: string;
  status: string;
  country: string | null;
  degree: string | null;
  funding: string | null;
  deadline: string | null;
  description: string | null;
  image_url: string | null;
  link: string | null;
  university: string | null;
  featured: boolean;
  urgent: boolean;
  created_at: string;
};

type Submission = {
  id: string;
  title: string;
  category: string;
  status: string;
  country: string | null;
  degree: string | null;
  funding: string | null;
  deadline: string | null;
  description: string | null;
  image_url: string | null;
  link: string | null;
  university: string | null;
  submitted_by_email: string | null;
  submitted_by_name: string | null;
  created_at: string;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [posts, setPosts] = useState<Post[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    scholarships: 0,
    internships: 0,
  });

  // New post form state
  const [newPost, setNewPost] = useState({
    title: "",
    category: "scholarship",
    country: "",
    degree: "",
    funding: "",
    deadline: "",
    description: "",
    image_url: "",
    link: "",
    university: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (!authLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      navigate("/");
    } else if (user && isAdmin) {
      fetchData();
    }
  }, [user, authLoading, isAdmin, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData || []);

      // Fetch submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from("user_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (submissionsError) throw submissionsError;
      setSubmissions(submissionsData || []);

      // Calculate stats
      const pendingCount = (postsData || []).filter((p) => p.status === "pending").length;
      const approvedCount = (postsData || []).filter((p) => p.status === "approved").length;
      const scholarshipCount = (postsData || []).filter((p) => p.category === "scholarship").length;
      const internshipCount = (postsData || []).filter((p) => p.category === "internship").length;

      setStats({
        pending: pendingCount + (submissionsData || []).length,
        approved: approvedCount,
        scholarships: scholarshipCount,
        internships: internshipCount,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprovePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from("posts")
        .update({ status: "approved" })
        .eq("id", postId);

      if (error) throw error;

      toast({ title: "Success", description: "Post approved successfully" });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);

      if (error) throw error;

      toast({ title: "Success", description: "Post deleted successfully" });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleApproveSubmission = async (submission: Submission) => {
    try {
      // Create post from submission
      const { error: insertError } = await supabase.from("posts").insert({
        title: submission.title,
        category: submission.category as any,
        country: submission.country,
        degree: submission.degree as any,
        funding: submission.funding as any,
        deadline: submission.deadline,
        description: submission.description,
        image_url: submission.image_url,
        link: submission.link,
        university: submission.university,
        status: "approved" as any,
        created_by: user?.id,
      });

      if (insertError) throw insertError;

      // Delete submission
      const { error: deleteError } = await supabase
        .from("user_submissions")
        .delete()
        .eq("id", submission.id);

      if (deleteError) throw deleteError;

      toast({ title: "Success", description: "Submission approved and published" });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRejectSubmission = async (submissionId: string) => {
    try {
      const { error } = await supabase
        .from("user_submissions")
        .delete()
        .eq("id", submissionId);

      if (error) throw error;

      toast({ title: "Success", description: "Submission rejected" });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("posts").insert({
        title: newPost.title,
        category: newPost.category as any,
        country: newPost.country || null,
        degree: newPost.degree as any || null,
        funding: newPost.funding as any || null,
        deadline: newPost.deadline || null,
        description: newPost.description || null,
        image_url: newPost.image_url || null,
        link: newPost.link || null,
        university: newPost.university || null,
        created_by: user?.id,
        status: "approved" as any,
      });

      if (error) throw error;

      toast({ title: "Success", description: "Post created successfully" });
      setNewPost({
        title: "",
        category: "scholarship",
        country: "",
        degree: "",
        funding: "",
        deadline: "",
        description: "",
        image_url: "",
        link: "",
        university: "",
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
              <p className="text-muted-foreground">
                Manage scholarships, internships, and submissions
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="posts">
                <FileText className="w-4 h-4 mr-2" />
                Manage Posts
              </TabsTrigger>
              <TabsTrigger value="add">
                <Upload className="w-4 h-4 mr-2" />
                Add New
              </TabsTrigger>
              <TabsTrigger value="submissions">
                <Clock className="w-4 h-4 mr-2" />
                Submissions ({submissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pending Approvals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-secondary">{stats.pending}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Published Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">{stats.approved}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Scholarships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">{stats.scholarships}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Internships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">{stats.internships}</p>
                  </CardContent>
                </Card>
          </div>

          {/* AI Integration Placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>Import from WhatsApp</CardTitle>
                    <CardDescription>
                Automatically extract scholarship data from WhatsApp groups
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" disabled>
                <Upload className="w-4 h-4 mr-2" />
                Connect WhatsApp
              </Button>
              <Badge className="mt-3 bg-secondary">Coming Soon</Badge>
                  </CardContent>
            </Card>

                <Card>
                  <CardHeader>
              <Send className="w-12 h-12 text-secondary mb-4" />
                    <CardTitle>Import from Telegram</CardTitle>
                    <CardDescription>
                Pull scholarship posts from Telegram channels automatically
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" disabled>
                <Upload className="w-4 h-4 mr-2" />
                Connect Telegram
              </Button>
              <Badge className="mt-3 bg-secondary">Coming Soon</Badge>
                  </CardContent>
            </Card>

                <Card>
                  <CardHeader>
              <Bot className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>AI Extract Info</CardTitle>
                    <CardDescription>
                Use AI to extract and format scholarship details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" disabled>
                <Bot className="w-4 h-4 mr-2" />
                Enable AI Extraction
              </Button>
              <Badge className="mt-3 bg-secondary">Coming Soon</Badge>
                  </CardContent>
            </Card>
          </div>
            </TabsContent>

            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>All Posts</CardTitle>
                  <CardDescription>Manage scholarships, internships, and news</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{post.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                post.status === "approved"
                                  ? "default"
                                  : post.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {post.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(post.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {post.status !== "approved" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleApprovePost(post.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Post</CardTitle>
                  <CardDescription>
                    Create a new scholarship, internship, or news post
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input
                          required
                          value={newPost.title}
                          onChange={(e) =>
                            setNewPost({ ...newPost, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select
                          value={newPost.category}
                          onValueChange={(value) =>
                            setNewPost({ ...newPost, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scholarship">Scholarship</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="news">News</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Input
                          value={newPost.country}
                          onChange={(e) =>
                            setNewPost({ ...newPost, country: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>University</Label>
                        <Input
                          value={newPost.university}
                          onChange={(e) =>
                            setNewPost({ ...newPost, university: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Degree Level</Label>
                        <Select
                          value={newPost.degree}
                          onValueChange={(value) =>
                            setNewPost({ ...newPost, degree: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bachelor">Bachelor</SelectItem>
                            <SelectItem value="master">Master's</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                            <SelectItem value="postgraduate">Postgraduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Funding Type</Label>
                        <Select
                          value={newPost.funding}
                          onValueChange={(value) =>
                            setNewPost({ ...newPost, funding: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fully_funded">Fully Funded</SelectItem>
                            <SelectItem value="partially_funded">
                              Partially Funded
                            </SelectItem>
                            <SelectItem value="not_funded">Not Funded</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Deadline</Label>
                        <Input
                          type="date"
                          value={newPost.deadline}
                          onChange={(e) =>
                            setNewPost({ ...newPost, deadline: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Application Link</Label>
                        <Input
                          type="url"
                          value={newPost.link}
                          onChange={(e) =>
                            setNewPost({ ...newPost, link: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input
                          type="url"
                          value={newPost.image_url}
                          onChange={(e) =>
                            setNewPost({ ...newPost, image_url: e.target.value })
                          }
                        />
                    </div>
                  </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        rows={4}
                        value={newPost.description}
                        onChange={(e) =>
                          setNewPost({ ...newPost, description: e.target.value })
                        }
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Post
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions">
              <Card>
                <CardHeader>
                  <CardTitle>User Submissions</CardTitle>
                  <CardDescription>Review and approve user-submitted posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{submission.category}</Badge>
                          </TableCell>
                          <TableCell>
                            {submission.submitted_by_name || submission.submitted_by_email}
                          </TableCell>
                          <TableCell>
                            {new Date(submission.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                  <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveSubmission(submission)}
                              >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectSubmission(submission.id)}
                              >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
            </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
