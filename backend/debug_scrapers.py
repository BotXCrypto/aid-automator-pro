import asyncio
from app.services.scraper_service import scraper_service

async def main():
    print("Running scrapers...")
    results = await scraper_service.run_all()
    print("Results:", results)

if __name__ == "__main__":
    asyncio.run(main())
