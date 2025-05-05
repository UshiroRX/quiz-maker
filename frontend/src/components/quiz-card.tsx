// components/QuizCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Quiz } from "../types/quiz";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height: 200,
        width: 273,
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {quiz.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginTop: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {quiz.description}
          </Typography>
          <Box
            sx={{ marginTop: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}
          >
            {quiz.tags && quiz.tags.length > 0 ? (
              quiz.tags.map((tag, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "#e0f7fa",
                    color: "#00796b",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  {tag}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Нет тегов
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ padding: 1 }}>
        <Link to={`/quizzes/${quiz.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "auto",
              borderRadius: 1,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "secondary",
              },
            }}
          >
            Пройти
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default QuizCard;
