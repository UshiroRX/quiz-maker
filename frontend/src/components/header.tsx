import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import logoutIcon from "../assets/logout-svgrepo-com.svg";

export const Header = () => {
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  const getFirstLetter = (name: string | null) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="secondary" elevation={4}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component={Link}
          to="/home"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            fontFamily: "'Pacifico', cursive",
            letterSpacing: 1.6,
            "&:hover": {
              color: "primary.light",
            },
          }}
        >
          Quizaru
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/quizzes"
                sx={{
                  fontWeight: "bold",
                  "&:hover": {
                    color: "primary.light",
                  },
                }}
              >
                Пройти квизы
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/create"
                sx={{
                  fontWeight: "bold",
                  "&:hover": {
                    color: "primary.light",
                  },
                }}
              >
                Создать квизы
              </Button>
              <Avatar
                component={Link}
                to="/profile"
                sx={{
                  bgcolor: (theme) => theme.palette.primary.light,
                  color: "primary.contrastText",
                  textDecoration: "none",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                {getFirstLetter(username)}
              </Avatar>
              <IconButton
                onClick={handleLogout}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(238, 233, 233, 0.1)",
                  },
                }}
              >
                <LogoutIcon color="primary"></LogoutIcon>
              </IconButton>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                fontWeight: "bold",
                "&:hover": {
                  color: "primary.light",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
