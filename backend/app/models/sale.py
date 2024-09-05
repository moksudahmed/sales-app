from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base


# Sale Model
class Sale(Base):
    __tablename__ = 'sales'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    total = Column(Float, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    discount = Column(Integer, nullable=False)

    user = relationship("User", back_populates="sales")
    sale_products = relationship("SaleProduct", back_populates="sale")
