from pydantic import BaseModel
from typing import List, Optional

class TOCItem(BaseModel):
    title: str
    page_number: int

class TOCResponse(BaseModel):
    items: List[TOCItem]
    total_items: Optional[int] = None