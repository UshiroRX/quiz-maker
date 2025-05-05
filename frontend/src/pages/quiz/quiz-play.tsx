import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizService from "../../services/quizService";
import { Quiz } from "../../types/quiz";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  TextField,
  Checkbox,
  FormControlLabel as MuiFormControlLabel,
  CircularProgress,
  Modal,
  Box as MuiBox,
} from "@mui/material";
import { styled } from "@mui/system";

type AnswerSubmit = {
  question_id: number;
  type: "text" | "single" | "multiple";
  value: string | number | number[];
};

type AnswerRecord = {
  [questionId: number]: AnswerSubmit;
};

type QuizSubmit = {
  answers: AnswerSubmit[];
};

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  fontWeight: "bold",
  borderRadius: 50,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const QuizPlayPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord>({});
  const [loading, setLoading] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await QuizService.getQuizByID(Number(quizId));
      setQuiz(response.data);
    };

    fetchQuiz();
  }, [quizId]);

  const updateAnswer = (
    questionId: number,
    answer: {
      type: "text" | "single" | "multiple";
      value: string | number | number[];
    },
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { question_id: questionId, ...answer },
    }));
  };

  const handleTextAnswerChange = (questionId: number, value: string) => {
    updateAnswer(questionId, { type: "text", value });
  };

  const handleSingleAnswerChange = (questionId: number, answerId: number) => {
    updateAnswer(questionId, { type: "single", value: answerId });
  };

  const handleMultipleAnswerChange = (questionId: number, answerId: number) => {
    const prev = (answers[questionId]?.value as number[]) || [];
    const newValue = prev.includes(answerId)
      ? prev.filter((id) => id !== answerId)
      : [...prev, answerId];

    updateAnswer(questionId, { type: "multiple", value: newValue });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const quizSubmitData: QuizSubmit = {
      answers: Object.values(answers),
    };
    try {
      const response = await QuizService.submitAnswers(
        quizSubmitData,
        Number(quizId),
      );
      console.log(response.data);
      setScore(response.data.score);
      setTotalScore(response.data.total_points);
      setOpenResultModal(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResultModal = () => {
    setOpenResultModal(false);
    navigate("/quizzes");
  };

  if (!quiz) return <div>Загрузка...</div>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        {quiz.title}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        align="center"
        sx={{ color: "text.secondary" }}
      >
        {quiz.description}
      </Typography>

      <Box sx={{ mt: 4 }}>
        {quiz.questions.map((question) => (
          <StyledCard key={question.id}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                {question.title}
              </Typography>

              {question.is_text ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={answers[question.id]?.value || ""}
                  onChange={(e) =>
                    handleTextAnswerChange(question.id, e.target.value)
                  }
                  label="Ваш ответ"
                  variant="outlined"
                />
              ) : question.is_multiple ? (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {question.answers.map((answer) => (
                    <MuiFormControlLabel
                      key={answer.id}
                      control={
                        <Checkbox
                          checked={(
                            (answers[question.id]?.value as number[]) || []
                          ).includes(answer.id)}
                          onChange={() =>
                            handleMultipleAnswerChange(question.id, answer.id)
                          }
                        />
                      }
                      label={answer.text}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Box>
              ) : (
                <RadioGroup
                  value={answers[question.id]?.value || ""}
                  onChange={(e) =>
                    handleSingleAnswerChange(
                      question.id,
                      Number(e.target.value),
                    )
                  }
                >
                  {question.answers.map((answer) => (
                    <FormControlLabel
                      key={answer.id}
                      value={answer.id}
                      control={<Radio />}
                      label={answer.text}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </StyledCard>
        ))}
      </Box>

      <StyledButton
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2, width: "100%" }}
        disabled={
          Object.keys(answers).length !== quiz.questions.length || loading
        }
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Отправить ответы"
        )}
      </StyledButton>

      <Modal open={openResultModal} onClose={handleCloseResultModal}>
        <MuiBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            boxShadow: 24,
            borderRadius: 2,
            minWidth: 300,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Ваш результат: {score} / {totalScore}
          </Typography>
          <StyledButton
            onClick={handleCloseResultModal}
            variant="contained"
            sx={{ width: "100%" }}
          >
            Вернуться на главную
          </StyledButton>
        </MuiBox>
      </Modal>
    </Container>
  );
};

export default QuizPlayPage;
