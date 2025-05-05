# models.py
from sqlalchemy import ARRAY, Boolean, Column, ForeignKey, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
from models import Users
    
class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    tags = Column(ARRAY(String))

    creator = relationship("Users", back_populates="quizzes", lazy="selectin")
    questions = relationship("Question", back_populates="quiz", cascade="all, delete", lazy="selectin")


class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text, nullable=False)
    is_multiple = Column(Boolean, default=False)
    is_text = Column(Boolean, default=False)
    points = Column(Integer, default=1)
    quiz_id = Column(Integer, ForeignKey("quizzes.id", ondelete="CASCADE"))

    quiz = relationship("Quiz", back_populates="questions", lazy="selectin")
    answers = relationship("Answer", back_populates="question", cascade="all, delete", lazy="selectin")


class Answer(Base):
    __tablename__ = "answers"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"))

    question = relationship("Question", back_populates="answers", lazy="selectin")



class QuizSubmission(Base):
    __tablename__ = "quiz_submissions"
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    score = Column(Integer, default=0)
    
    quiz = relationship("Quiz", backref="submissions")
    user = relationship("Users", backref="submissions")