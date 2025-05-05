# schemas.py
from typing import List, Optional, Union
from pydantic import BaseModel


class AnswerBase(BaseModel):
    text: str
    
class AnswerCreate(AnswerBase): 
    is_correct: bool

class AnswerOut(AnswerBase):
    id: int
    class Config:
        from_attributes = True

class QuestionBase(BaseModel):
    title: str
    is_multiple: bool = False
    is_text: bool = False
    points: int = 1

class QuestionCreate(QuestionBase):
    answers: List[AnswerCreate] = []

class QuestionOut(QuestionBase):
    id: int
    answers: List[AnswerOut]
    class Config:
        from_attributes = True


class QuizBase(BaseModel):
    title: str
    description: Optional[str] = None
    tags: List[str] = ["Другое"]

class QuizCreate(QuizBase):
    questions: List[QuestionCreate] = []

class QuizOut(QuizBase):
    id: int
    class Config:
        from_attributes = True


class QuizDetailOut(QuizBase):
    id: int
    created_by: int
    questions: List[QuestionOut]

    class Config:
        from_attributes = True


class AnswerSubmit(BaseModel):
    question_id: int
    type: str  
    value: Union[str, int, List[int]]  
    
class QuizSubmit(BaseModel):
    answers: List[AnswerSubmit]  