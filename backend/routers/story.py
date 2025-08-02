import uuid 
from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Cookie, Response, BackgroundTasks
from sqlalchemy.orm import session 
from backend.db.database import get_db, SessionLocal
from backend.models.story import Story, StoryNode
from backend.models.job import StoryJob 
from backend.schemas.story import (CompleteStoryNodeResponse, CompleteStoryResponse, CreateStoryRequest)
from backend.schemas.job import StoryJobResponse

