import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link as RouterLink } from "react-router-dom";
import authService from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        password,
      };
      await authService.login(userData);
      login();
      navigate("/quizzes");
    } catch (error) {
      console.error("Ошибка при отправке данных", error);
      setError("Произошла ошибка. Попробуйте снова!");
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 500, bgcolor: "#3E403F" }}>
        <Typography
          variant="h5"
          textAlign="center"
          mb={2}
          color="#fff"
          fontWeight={800}
        >
          Вход
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                color: "#fff",
              },
              "& .MuiFormLabel-root": {
                color: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
            }}
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                color: "#fff",
              },
              "& .MuiFormLabel-root": {
                color: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
            }}
          />

          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
            sx={{
              fontWeight: "600",
              mt: 2,
              bgcolor: "#71D9B3",
              "&:hover": {
                backgroundColor: "#71efbf",
              },
            }}
          >
            Войти
          </Button>
          <Typography textAlign="center" mt={2} color="#fff">
            Нет аккаунта?{" "}
            <Link component={RouterLink} to="/register" underline="hover">
              Зарегистрируйтесь
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginPage;
