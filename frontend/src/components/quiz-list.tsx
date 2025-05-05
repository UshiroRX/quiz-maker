import React from "react";
import { Grid } from "@mui/material";
import QuizCard from "./quiz-card";
import { Quiz } from "../types/quiz";

interface QuizListProps {
  quizzes: Quiz[];
}

const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
  return (
    <Grid container spacing={2}>
      {quizzes.map((quiz) => (
        <Grid key={quiz.id}>
          <QuizCard quiz={quiz} key={quiz.id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuizList;
