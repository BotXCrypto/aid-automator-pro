import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately redirect About page to Contact to avoid duplicate content
    navigate("/contact", { replace: true });
  }, [navigate]);

  return null;
}
