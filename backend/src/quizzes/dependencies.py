from typing import Annotated
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from database import get_session
from sqlalchemy.ext.asyncio import AsyncSession

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

token_depends = Annotated[str, Depends(oauth2_scheme)]
db_depends = Annotated[AsyncSession, Depends(get_session)]