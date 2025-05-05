from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Users(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    hashed_password : Mapped[str]

    quizzes = relationship("Quiz", back_populates="creator")
