from typing import List
from app.db.supabase import supabase
from app.services.scrapers.whatsapp import WhatsAppScraper
from app.services.scrapers.telegram import TelegramScraper
from app.models.schemas import PostCreate, PostStatus

class ScraperService:
    def __init__(self):
        self.scrapers = [
            WhatsAppScraper(),
            TelegramScraper()
        ]

    async def run_all(self) -> dict:
        results = {
            "total_found": 0,
            "saved": 0,
            "errors": 0,
            "details": []
        }

        for scraper in self.scrapers:
            scraper_name = scraper.__class__.__name__
            try:
                posts = await scraper.scrape()
                results["total_found"] += len(posts)
                
                for post in posts:
                    try:
                        # Convert to JSON-compatible dict
                        post_data = post.model_dump(mode='json')
                        
                        # Prepare data for user_submissions table
                        submission_data = {
                            "title": post_data["title"],
                            "category": post_data["category"],
                            "country": post_data.get("country"),
                            "degree": post_data.get("degree"),
                            "funding": post_data.get("funding"),
                            "deadline": post_data.get("deadline"),
                            "description": post_data.get("description"),
                            "university": post_data.get("university"),
                            "link": post_data.get("link"),
                            "submitted_by_name": f"AI Scraper ({scraper_name})",
                            "status": "pending"
                        }
                        
                        # Check if title already exists in posts or submissions to avoid duplicates
                        existing_post = supabase.table("posts").select("id").eq("title", post.title).execute()
                        existing_sub = supabase.table("user_submissions").select("id").eq("title", post.title).execute()
                        
                        if not existing_post.data and not existing_sub.data:
                            supabase.table("user_submissions").insert(submission_data).execute()
                            results["saved"] += 1
                            results["details"].append(f"Submitted: {post.title} ({scraper_name})")
                        else:
                            results["details"].append(f"Skipped (Duplicate): {post.title}")
                            
                    except Exception as e:
                        error_msg = str(e)
                        if "row-level security" in error_msg:
                            results["details"].append(f"Found (Not Saved - Needs Service Key): {post.title}")
                            # We count this as 'found' but not 'saved'
                        else:
                            print(f"Error saving post {post.title}: {e}")
                            results["errors"] += 1
                        
            except Exception as e:
                print(f"Error running {scraper_name}: {e}")
                results["errors"] += 1

        return results

scraper_service = ScraperService()
