from datetime import datetime
from typing import Annotated, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import cast, select
from .schemas import QuizOut, QuizCreate, QuizDetailOut, QuizSubmit
from .dependencies import db_depends
from auth.service import get_user_from_token
from .models import *
from auth.schemas import User
from sqlalchemy import and_
from sqlalchemy import cast, String

router = APIRouter(prefix='/quizzes')




@router.get('/', response_model=List[QuizOut], status_code=status.HTTP_200_OK)
async def get_all_quizzes(current_user : Annotated[User, Depends(get_user_from_token)], db : db_depends,
                title: Optional[str] = Query(None),
                tags: Optional[List[str]] = Query(None),
                skip: Optional[int] = Query(0),
                limit: Optional[int] = Query(None)):
        print(f"Received tags: {tags}, type: {type(tags)}")

        query = select(Quiz)
        conditions = []

        if title:
            conditions.append(Quiz.title.ilike(f"%{title}%"))

        if tags:
            conditions.append(Quiz.tags.op("&&")(cast(tags, ARRAY(String))))

        if conditions:
            from sqlalchemy import and_
            query = query.where(and_(*conditions))

        query = query.offset(skip).limit(limit)

        result = await db.execute(query)
        quizzes = result.scalars().all()

        if quizzes is None:
            raise HTTPException(status_code =404, detail='Quizess not found')
        return quizzes

@router.get('/my-quizzes', response_model=List[QuizOut], status_code=status.HTTP_200_OK)
async def get_user_quizzes(current_user: Annotated[User, Depends(get_user_from_token)], db: db_depends):
        query = select(Quiz).where(Quiz.created_by == current_user.id)
        result = await db.execute(query)
        quizzes = result.scalars().all()

        if not quizzes:
            raise HTTPException(status_code=404, detail="No quizzes found for the current user")

        return quizzes


@router.get('/{quiz_id}', response_model=QuizDetailOut, status_code=status.HTTP_200_OK)
async def get_quiz_by_id(
                quiz_id : int, current_user : Annotated[User, Depends(get_user_from_token)], 
                db : db_depends,
                ):
    query = select(Quiz).where(Quiz.id == quiz_id)
    result = await db.execute(query)
    
    quiz = result.scalar_one_or_none()

    if not quiz:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Квиз с ID {quiz_id} не найден")

    return quiz

@router.get('/myquizzes', response_model=List[QuizOut], status_code=status.HTTP_200_OK)
async def get_user_quizzes(current_user: Annotated[User, Depends(get_user_from_token)], db: db_depends):
        query = select(Quiz).where(Quiz.created_by == current_user.id)
        result = await db.execute(query)
        quizzes = result.scalars().all()

        if not quizzes:
            raise HTTPException(status_code=404, detail="No quizzes found for the current user")

        return quizzes
    

@router.post('/create', response_model=QuizOut, status_code=status.HTTP_201_CREATED)
async def create_quiz(quiz : QuizCreate, current_user: Annotated[User, Depends(get_user_from_token)], db : db_depends):
    print(current_user)
    new_quiz = Quiz(title=quiz.title, description=quiz.description, created_by=current_user.id, tags=quiz.tags)
    print(new_quiz.tags)
    print(new_quiz.title)

    for q in quiz.questions:
        question = Question(
            title=q.title,
            is_multiple=q.is_multiple,
            is_text=q.is_text,
            points=q.points
        )
        for a in q.answers:
            answer = Answer(text=a.text, is_correct=a.is_correct)
            question.answers.append(answer)
        new_quiz.questions.append(question)
    print(new_quiz)

    db.add(new_quiz)
    await db.commit()
    await db.refresh(new_quiz)
    return new_quiz

@router.delete('/{quiz_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_quiz(quiz_id: int, current_user: Annotated[User, Depends(get_user_from_token)], db: db_depends):
    existing_quiz = await db.execute(select(Quiz).where(Quiz.id == quiz_id))
    quiz_to_delete = existing_quiz.scalar_one_or_none()

    if quiz_to_delete is None:
        raise HTTPException(status_code=404, detail='Quiz not found')

    if quiz_to_delete.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete your own quizzes")

    await db.delete(quiz_to_delete)
    await db.commit()

    return {"detail": "Quiz successfully deleted"}

@router.post('/{quiz_id}/submit', status_code=status.HTTP_202_ACCEPTED)
async def submit_quiz(
    quiz_id: int, 
    data: QuizSubmit, 
    current_user: Annotated[User, Depends(get_user_from_token)], 
    db: db_depends
):

    quiz_from_db = await db.execute(select(Quiz).where(Quiz.id == quiz_id))
    quiz = quiz_from_db.scalar_one_or_none()
    
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    questions = quiz.questions
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found in the quiz")
    
    score = 0

    for answer_submit in data.answers:
        question = next((q for q in questions if q.id == answer_submit.question_id), None)
        if not question:
            continue

        correct_answers = [answer.id for answer in question.answers if answer.is_correct]
        
        if question.is_text:
            if answer_submit.value == question.answers[0].text:
                score += question.points
        
        elif question.is_multiple == False:
            if isinstance(answer_submit.value, int) and answer_submit.value in correct_answers:
                score += question.points
        

        elif question.is_multiple == True:
            if isinstance(answer_submit.value, list) and all(val in correct_answers for val in answer_submit.value):
                score += question.points

    quiz_submission = QuizSubmission(
        quiz_id=quiz.id,
        user_id=current_user.id,
        score=score
    )
    db.add(quiz_submission)
    await db.commit()

    total_points = sum(question.points for question in quiz.questions)
    return {
        "quiz_id": quiz.id, 
        "score": score, 
        "total_points": total_points,
        "message": "Успешно пройдено", 
        "submited_at": datetime.now().strftime("%d.%m.%y %H:%M")
    }