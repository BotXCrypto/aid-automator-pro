from abc import ABC, abstractmethod
from typing import List
from app.models.schemas import PostCreate

class BaseScraper(ABC):
    @abstractmethod
    async def scrape(self) -> List[PostCreate]:
        """
        Scrape data from the source and return a list of PostCreate objects.
        """
        pass
