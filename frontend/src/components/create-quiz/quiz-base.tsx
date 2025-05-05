import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Box, MenuItem, Chip, Checkbox } from "@mui/material";

interface QuizFormData {
  title: string;
  description: string;
  tags: string[];
}

const QuizBase: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<QuizFormData>();

  return (
    <>
      <Controller
        name="title"
        control={control}
        rules={{ required: "Введите название квиза" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Название квиза"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Описание"
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Тэги"
            fullWidth
            margin="normal"
            slotProps={{
              select: {
                multiple: true,
                renderValue: (selected: unknown) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((selectedValue) => (
                      <Chip key={selectedValue} label={selectedValue} />
                    ))}
                  </Box>
                ),
              },
            }}
          >
            {[
              "история",
              "наука",
              "спорт",
              "искусство",
              "другое",
              "hdas",
              "math",
              "anime",
            ].map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={field.value?.includes(tag)} />
                {tag}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </>
  );
};

export default QuizBase;
