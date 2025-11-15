from fastapi import APIRouter

router = APIRouter()

@router.get("/api/health")
def health_check():
    return {"status": "healthy"}

@router.get("/api/items")
def get_items():
    return {"items": []}
