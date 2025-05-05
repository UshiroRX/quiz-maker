import { useCallback, useEffect, useState } from "react";
import QuizService from "../../services/quizService";
import QuizList from "../../components/quiz-list";
import { Quiz } from "../../types/quiz";
import {
  TextField,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontWeight: "bold",
  borderRadius: 50,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await QuizService.getAllQuizzes({
        title: search,
        tags: tags,
      });
      setQuizzes(response.data);
    } catch (err: any) {
      console.error("Ошибка при загрузке квизов:", err);
    } finally {
      setLoading(false);
    }
  }, [search, tags]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "black",
        }}
      >
        Проверь свои знания!
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 4,
          backgroundColor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <StyledTextField
          label="Поиск квиза"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            "& .MuiInputLabel-root": {
              color: "text.secondary",
            },
          }}
        />

        <FormControl fullWidth>
          <InputLabel sx={{ color: "text.secondary" }}>Теги</InputLabel>
          <Select
            label="Теги"
            multiple
            value={tags}
            onChange={(e) => setTags(e.target.value as string[])}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.300",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            }}
          >
            <MenuItem value="math">Математика</MenuItem>
            <MenuItem value="school">Школа</MenuItem>
            <MenuItem value="physics">Физика</MenuItem>
          </Select>
        </FormControl>

        <StyledButton
          variant="contained"
          color="secondary"
          onClick={fetchQuizzes}
        >
          Поиск
        </StyledButton>
      </Box>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {loading ? (
          <Typography variant="h6">Загрузка...</Typography>
        ) : quizzes.length > 0 ? (
          <QuizList quizzes={quizzes} />
        ) : (
          <Typography variant="h6" color="text.secondary">
            Квизы не найдены
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default QuizzesPage;
