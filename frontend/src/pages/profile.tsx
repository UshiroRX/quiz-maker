import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import QuizService from "../services/quizService";
import { Quiz } from "../types/quiz";
import QuizList from "../components/quiz-list";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  mb: theme.spacing(4),
}));

const ProfilePage = () => {
  const [userName, setUserName] = useState<string | null>("");
  const [userQuizzes, setUserQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const name = localStorage.getItem("user");

    setUserName(name);

    const fetchUserQuizzes = async () => {
      try {
        const response = await QuizService.getUserQuizzes();
        if (response && response.data) {
          setUserQuizzes(response.data.quizzes);
          console.log(userQuizzes);
        } else {
          console.error("Unexpected response format:", response);
          setUserQuizzes([]);
        }
      } catch (error) {
        console.error("Failed to fetch user quizzes:", error);
        setUserQuizzes([]);
      }
    };

    fetchUserQuizzes();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "black" }}
      >
        Мой профиль
      </Typography>

      <StyledPaper>
        <Avatar
          alt={userName || "User Avatar"}
          sx={{ width: 120, height: 120, mb: 2 }}
        />
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          {userName || "Имя пользователя"}
        </Typography>
      </StyledPaper>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: 1.5, borderRadius: 2 }}
          onClick={() => console.log("Перейти к сабмишенам")}
        >
          Мои сабмишены
        </Button>

        <Button
          variant="contained"
          color="secondary"
          sx={{ padding: 1.5, borderRadius: 2 }}
          onClick={() => console.log("Перейти к квизам")}
        >
          Мои квизы
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Мои квизы
      </Typography>

      {Array.isArray(userQuizzes) && userQuizzes.length > 0 ? (
        <QuizList quizzes={userQuizzes} />
      ) : (
        <Typography variant="h6" color="text.secondary">
          У вас нет созданных квизов.
        </Typography>
      )}
    </Container>
  );
};

export default ProfilePage;
