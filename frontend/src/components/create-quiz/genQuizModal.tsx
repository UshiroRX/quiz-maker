import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { QuizFormData } from "./quiz-types";
import { QuizGenService } from "../../services/quizGenService";

interface AiQuizModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (result: QuizFormData) => void;
}

const AiQuizModal: React.FC<AiQuizModalProps> = ({
  open,
  onClose,
  onComplete,
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const result = (await QuizGenService.generateQuiz(
        prompt,
      )) as QuizFormData;
      onComplete(result);
      onClose();
    } catch (err) {
      setError("Ошибка генерации. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Сгенерировать квиз с помощью ИИ</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            label="Введите запрос для генерации квиза"
            fullWidth
            multiline
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose} disabled={loading}>
          Отмена
        </Button>
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? <CircularProgress size={24} /> : "Сгенерировать"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AiQuizModal;
