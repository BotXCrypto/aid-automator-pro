from fastapi import APIRouter, BackgroundTasks
from app.services.scraper_service import scraper_service

router = APIRouter()

@router.post("/run")
async def run_scrapers():
    """
    Trigger the AI scrapers to fetch new content from WhatsApp and Telegram.
    """
    results = await scraper_service.run_all()
    return results
