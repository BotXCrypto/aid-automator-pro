from enum import Enum
from typing import Optional
from pydantic import BaseModel
from datetime import datetime, date

class PostCategory(str, Enum):
    SCHOLARSHIP = "scholarship"
    INTERNSHIP = "internship"
    NEWS = "news"

class PostStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class FundingType(str, Enum):
    FULLY_FUNDED = "fully_funded"
    PARTIALLY_FUNDED = "partially_funded"
    NOT_FUNDED = "not_funded"

class DegreeLevel(str, Enum):
    BACHELOR = "bachelor"
    MASTER = "master"
    PHD = "phd"
    UNDERGRADUATE = "undergraduate"
    POSTGRADUATE = "postgraduate"

class PostBase(BaseModel):
    title: str
    category: PostCategory
    country: Optional[str] = None
    degree: Optional[DegreeLevel] = None
    funding: Optional[FundingType] = None
    deadline: Optional[date] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    link: Optional[str] = None
    university: Optional[str] = None
    featured: bool = False
    urgent: bool = False

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    title: Optional[str] = None
    category: Optional[PostCategory] = None
    status: Optional[PostStatus] = None

class Post(PostBase):
    id: str
    status: PostStatus
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

    class Config:
        from_attributes = True

class UserSubmissionBase(BaseModel):
    title: str
    category: PostCategory
    country: Optional[str] = None
    degree: Optional[DegreeLevel] = None
    funding: Optional[FundingType] = None
    deadline: Optional[date] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    link: Optional[str] = None
    university: Optional[str] = None
    submitted_by_email: Optional[str] = None
    submitted_by_name: Optional[str] = None

class UserSubmissionCreate(UserSubmissionBase):
    pass

class UserSubmission(UserSubmissionBase):
    id: str
    status: PostStatus
    created_at: datetime

    class Config:
        from_attributes = True
