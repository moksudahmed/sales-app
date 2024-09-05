from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

# SaleProduct Model
class SaleProduct(Base):
    __tablename__ = 'sale_products'

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey('sales.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    #itemwise_discount = Column(Integer, nullable=False)

    sale = relationship("Sale", back_populates="sale_products")
    product = relationship("Product", back_populates="sale_products")
