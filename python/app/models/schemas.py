# Pydantic models
from pydantic import BaseModel

class PasswordRequest(BaseModel):
    password: str

class PasswordResponse(BaseModel):
    success: bool
    message: str = ""
