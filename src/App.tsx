import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { ChatBot } from "./components/ChatBot";
import Index from "./pages/Index";
import Scholarships from "./pages/Scholarships";
import Internships from "./pages/Internships";
import Jobs from "./pages/Jobs";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import CountryScholarships from "./pages/CountryScholarships";
import GuideDetails from "./pages/GuideDetails";
import EducationNews from "./pages/EducationNews";
import Submit from "./pages/Submit";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import ProfileSettings from "./pages/ProfileSettings";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import NotFound from "./pages/NotFound";
import GlobalNetwork from "./pages/GlobalNetwork";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ChatBot />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/scholarships/:country" element={<CountryScholarships />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
            <Route path="/guides/:id" element={<GuideDetails />} />
            <Route path="/news" element={<EducationNews />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/global-network" element={<GlobalNetwork />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
