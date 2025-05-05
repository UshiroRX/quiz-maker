import "./App.css";
import { Header } from "./components/header";
import { HomePage } from "./pages/home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterPage from "./pages/register";
import { AuthProvider } from "./contexts/AuthContext";
import QuizzesPage from "./pages/quiz/quizzes";
import QuizPlayPage from "./pages/quiz/quiz-play";
import CreateQuizPage from "./pages/quiz/create-quiz";
import ProfilePage from "./pages/profile";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D9D9D9",
    },
    secondary: {
      main: "#3E403F",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="quizzes" element={<QuizzesPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="quizzes/:quizId" element={<QuizPlayPage />} />
              <Route path="create" element={<CreateQuizPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
