# 🧠 Quizaru — Quiz Maker App

Quizaru — это приложение для создания и прохождения онлайн-тестов. Проект реализован на базе **FastAPI (бэкенд)** и **React (фронтенд)**. Используется JWT для авторизации, MaterialUI, AI генерация квизов.

---

## 📁 Структура проекта

```
quizaru/
├── backend/
│   ├── src/
│   │   └── main.py
│   └── alembic/
├── frontend/
│   └── src/
│       └── App.tsx
└── README.md
```

---

## 🚀 Технологии

- **Backend**: FastAPI, SQLAlchemy, Alembic, PostgreSQL, JWT
- **Frontend**: React, Vite, React Hook Form, MaterialUI
- **Дополнительно**: Railway для деплоя, Together API для генерации вопросов

---

## 🔐 Переменные окружения

### Фронтенд

Создайте файл `.env` в директории `frontend` со следующим содержимым:

```env
VITE_API_BASE_URL=
VITE_TOGETHER_API_KEY=
```

🔑 `VITE_TOGETHER_API_KEY` можно получить, зарегистрировавшись на сайте [Together API](https://www.together.xyz/).

---

### Бэкенд

Создайте файл `.env` в директории `backend` со следующим содержимым:

```env
SECRET_KEY=
DATABASE_URL=(нужен URL postgresql+asyncpg)
FRONTEND_URLS=
```

---

## ⚙️ Установка и запуск

### Backend (FastAPI)

```bash
cd backend
alembic upgrade head
cd src
uvicorn main:app --reload
```

---

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

## ✨ Возможности

- Создание квизов (тестов)
- Авторизация и регистрация с помощью JWT
- Удобные формы с React Hook Form
- Генерация вопросов с помощью AI (Together API)
- Поиск квизов по тегам, названию

---

## 🛠️ В разработке

- Поддержка таймеров
- Система рейтингов

---

## 📫 Обратная связь

Если у вас есть предложения, баги или идеи, создайте issue или свяжитесь с разработчиком.

---


