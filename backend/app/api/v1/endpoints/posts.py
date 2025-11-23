from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.db.supabase import supabase
from app.models.schemas import Post, PostCreate, PostCategory

router = APIRouter()

@router.get("/", response_model=List[Post])
def read_posts(
    skip: int = 0,
    limit: int = 100,
    category: Optional[PostCategory] = None,
    featured: Optional[bool] = None
):
    query = supabase.table("posts").select("*")
    
    if category:
        query = query.eq("category", category.value)
    
    if featured is not None:
        query = query.eq("featured", featured)
        
    # Order by created_at desc
    query = query.order("created_at", desc=True).range(skip, skip + limit - 1)
    
    response = query.execute()
    
    return response.data

@router.post("/", response_model=Post)
def create_post(post: PostCreate):
    # Convert date objects to ISO strings for JSON serialization
    post_data = post.model_dump(mode='json')
    
    response = supabase.table("posts").insert(post_data).execute()
    
    if not response.data:
        raise HTTPException(status_code=400, detail="Could not create post")
        
    return response.data[0]

@router.get("/{post_id}", response_model=Post)
def read_post(post_id: str):
    response = supabase.table("posts").select("*").eq("id", post_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Post not found")
        
    return response.data[0]
