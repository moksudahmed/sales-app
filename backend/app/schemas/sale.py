from pydantic import BaseModel, Field
from typing import List, Optional


class SaleProductCreate(BaseModel):
    product_id: int = Field(..., description="The ID of the product being sold")
    quantity: int = Field(..., description="The quantity of the product being sold")
    total_price: float = Field(..., description="The total price for this quantity of the product")
    #itemwise_discount: int = Field(..., description="The quantity of the product being sold")

class SaleCreate(BaseModel):
    user_id: int = Field(..., description="The ID of the user making the purchase")
    total: float = Field(..., description="The total amount of the sale")
    sale_products: List[SaleProductCreate] = Field(..., description="A list of products being sold in this sale")
    discount: int = Field(..., description="The discount amount of the sale")
    
class SaleProductUpdate(BaseModel):
    product_id: int
    quantity: int
    total_price: float
    #itemwise_discount: int

class SaleUpdate(BaseModel):
    user_id: Optional[int]
    total: Optional[float]
    sale_products: List[SaleProductUpdate]
    discount: Optional[int]
    

class SaleProduct(BaseModel):
    id: int
    product_id: int
    quantity: int
    total_price: float
    #itemwise_discount: int

    class Config:
        orm_mode = True

class Sale(BaseModel):
    id: int
    user_id: int
    total: float
    sale_products: List[SaleProduct]
    discount: int

    class Config:
        orm_mode = True
