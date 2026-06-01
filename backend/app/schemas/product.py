from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    stock_quantity: int = Field(ge=0)


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True