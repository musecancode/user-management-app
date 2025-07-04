from pydantic import BaseModel, EmailStr, constr

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: constr(min_length=10, max_length=10, pattern=r"^\d{10}$")
    pan: constr(min_length=10, max_length=10, pattern=r"^[A-Z]{5}[0-9]{4}[A-Z]$")

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int

    model_config = {
        "from_attributes": True  # ✅ Pydantic v2
    }
