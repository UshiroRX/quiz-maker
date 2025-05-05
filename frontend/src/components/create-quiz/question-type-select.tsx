import { Box, Button, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { QuizFormData } from "../../types/create-quiz";

export const QuestionTypeSelect = ({
  index,
  onSetQuestionType,
}: {
  index: number;
  onSetQuestionType: (type: "text" | "multiple" | "single") => void;
}) => {
  const { control, setValue } = useFormContext<QuizFormData>();

  const is_text = useWatch({
    control,
    name: `questions.${index}.is_text`,
  });

  const is_multiple = useWatch({
    control,
    name: `questions.${index}.is_multiple`,
  });

  const is_single = !is_text && !is_multiple;

  return (
    <Box
      mt={2}
      mb={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
        Тип вопроса:
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant={is_text ? "contained" : "outlined"}
          color="secondary"
          onClick={() => {
            onSetQuestionType("text");
            setValue(`questions.${index}.answers`, []);
          }}
          sx={{
            padding: "8px 16px",
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Текстовый
        </Button>
        <Button
          variant={is_multiple ? "contained" : "outlined"}
          color="secondary"
          onClick={() => onSetQuestionType("multiple")}
          sx={{
            padding: "8px 16px",
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Мультивыбор
        </Button>
        <Button
          variant={is_single ? "contained" : "outlined"}
          color="secondary"
          onClick={() => onSetQuestionType("single")}
          sx={{
            padding: "8px 16px",
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Одиночный выбор
        </Button>
      </Box>
    </Box>
  );
};
