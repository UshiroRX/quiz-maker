import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Button, Paper, Typography, Box, IconButton } from "@mui/material";
import QuizService from "../../services/quizService";
import QuizBase from "./quiz-base";
import { QuestionTypeSelect } from "./question-type-select";
import QuestionBlock from "./question-edit";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { QuizFormData } from "./quiz-types";
import AiQuizModal from "./genQuizModal";

const QuizForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [OpenAiModal, setOpenAiModal] = useState(false);

  const methods = useForm<QuizFormData>({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      questions: [],
    },
  });

  const { control, setValue, handleSubmit, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: QuizFormData) => {
    console.log("Данные квиза:", data);
    const response = await QuizService.createQuiz(data);
    console.log("Квиз успешно создан!", response);
    reset({
      title: "",
      description: "",
      tags: [],
      questions: [],
    });
    setOpenSnackbar(true);
  };

  const handleAddQuestion = () => {
    append({
      title: "",
      points: 0,
      is_multiple: false,
      is_text: false,
      answers: [],
    });
  };

  const handleRemoveQuestion = (index: number) => {
    remove(index);
  };

  const handleSetQuestionType = (
    index: number,
    type: "text" | "multiple" | "single",
  ) => {
    setValue(`questions.${index}.is_text`, type === "text");
    setValue(`questions.${index}.is_multiple`, type === "multiple");

    if (type === "single") {
      setValue(`questions.${index}.is_multiple`, false);
      setValue(`questions.${index}.is_text`, false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenAiModal(true)}
          sx={{ width: "200px" }}
        >
          Попробуй через ИИ!
        </Button>
      </Box>
      <Paper
        color="secondary"
        elevation={4}
        sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 5, borderRadius: 2 }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Создание квиза
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <QuizBase />

          <Box p={2}>
            {fields.map((field, index) => (
              <Paper
                key={field.id}
                elevation={4}
                sx={{ p: 3, mb: 3, borderRadius: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Вопрос {index + 1}
                  </Typography>

                  <IconButton
                    onClick={() => handleRemoveQuestion(index)}
                    color="error"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <QuestionTypeSelect
                  index={index}
                  onSetQuestionType={(type) =>
                    handleSetQuestionType(index, type)
                  }
                />

                <QuestionBlock index={index} />
              </Paper>
            ))}

            <Box
              mt={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <Button
                variant="outlined"
                onClick={handleAddQuestion}
                sx={{
                  width: "200px",
                  color: "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    borderColor: "#1565c0",
                  },
                }}
              >
                + Добавить вопрос
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: "#fff",
                  mt: "20px",
                  p: "10px",
                  width: "160px",
                  backgroundColor: "#388e3c",
                  "&:hover": { backgroundColor: "#2e7d32" },
                }}
              >
                Сохранить
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Квиз успешно создан!
        </Alert>
      </Snackbar>

      <AiQuizModal
        open={OpenAiModal}
        onClose={() => setOpenAiModal(false)}
        onComplete={(result: QuizFormData) => {
          reset(result);
        }}
      />
    </FormProvider>
  );
};

export default QuizForm;
