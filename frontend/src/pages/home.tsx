import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,rgb(56, 56, 56) 0%,rgb(179, 191, 212) 100%)",
        color: "white",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 30, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Добро пожаловать в Quizaru!
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 4 }}
        >
          Пройдите интересные квизы и проверьте свои знания!
        </Typography>
        {isAuthenticated && (
          <Link to="/quizzes" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "white",
                color: "#000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Начать
            </Button>
          </Link>
        )}
        {!isAuthenticated && (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "white",
                color: "#000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Начать
            </Button>
          </Link>
        )}
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
          © 2025 Quizaru - Muslik.
        </Typography>
      </Box>
    </Box>
  );
};
