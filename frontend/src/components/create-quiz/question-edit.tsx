import { useWatch, useFormContext, Controller } from "react-hook-form";
import {
  Paper,
  TextField,
  Checkbox,
  IconButton,
  Button,
  Box,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { QuizFormData } from "../../types/create-quiz";

const QuestionBlock = ({ index }: { index: number }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<QuizFormData>();

  const is_text = useWatch({ control, name: `questions.${index}.is_text` });
  const is_multiple = useWatch({
    control,
    name: `questions.${index}.is_multiple`,
  });
  const answers =
    useWatch({ control, name: `questions.${index}.answers` }) || [];

  return (
    <>
      <Controller
        control={control}
        name={`questions.${index}.title`}
        rules={{ required: "Введите текст вопроса" }}
        render={({ field }) => (
          <TextField
            label="Текст вопроса"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.questions?.[index]?.title}
            helperText={errors.questions?.[index]?.title?.message}
            {...field}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Controller
        control={control}
        name={`questions.${index}.points`}
        render={({ field }) => (
          <TextField
            label="Баллы"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            {...field}
            value={field.value || ""}
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? 0 : parseInt(e.target.value, 10),
              )
            }
            sx={{ mb: 2 }}
          />
        )}
      />

      {is_text ? (
        <Box>
          <Controller
            control={control}
            name={`questions.${index}.answers.0.text`}
            rules={{ required: "Введите текст ответа" }}
            render={({ field }) => (
              <TextField
                label="Текст ответа"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.questions?.[index]?.answers?.[0]?.text}
                helperText={
                  errors.questions?.[index]?.answers?.[0]?.text?.message
                }
                {...field}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            control={control}
            name={`questions.${index}.answers.0.is_correct`}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value || false} />}
                label="Правильный ответ"
              />
            )}
          />
        </Box>
      ) : (
        <Box>
          {answers.map((answer, answerIndex) => (
            <Paper
              key={answerIndex}
              elevation={1}
              sx={{
                p: 2,
                mb: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                label={`Ответ ${answerIndex + 1}`}
                fullWidth
                margin="normal"
                value={answer.text}
                onChange={(e) => {
                  const updatedAnswers = [...answers];
                  updatedAnswers[answerIndex].text = e.target.value;
                  setValue(`questions.${index}.answers`, updatedAnswers);
                }}
                sx={{ flexGrow: 1, mr: 2 }}
              />
              <Checkbox
                checked={answer.is_correct}
                onChange={(e) => {
                  const updatedAnswers = [...answers];
                  if (is_multiple) {
                    updatedAnswers[answerIndex].is_correct = e.target.checked;
                  } else {
                    updatedAnswers.forEach((a, i) => {
                      a.is_correct = i === answerIndex && e.target.checked;
                    });
                  }
                  setValue(`questions.${index}.answers`, updatedAnswers);
                }}
                color="success"
              />
              <IconButton
                onClick={() => {
                  const updatedAnswers = answers.filter(
                    (_, i) => i !== answerIndex,
                  );
                  setValue(`questions.${index}.answers`, updatedAnswers);
                }}
                color="error"
              >
                <CloseIcon />
              </IconButton>
            </Paper>
          ))}

          <Button
            variant="outlined"
            onClick={() => {
              const updatedAnswers = [
                ...answers,
                { text: "", is_correct: false },
              ];
              setValue(`questions.${index}.answers`, updatedAnswers);
            }}
            sx={{
              width: "200px",
              height: "30px",
              color: "#1976d2",
              borderColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#e3f2fd",
                borderColor: "#1565c0",
              },
            }}
          >
            + Добавить ответ
          </Button>
        </Box>
      )}
    </>
  );
};

export default QuestionBlock;
