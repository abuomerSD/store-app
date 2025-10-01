import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { http } from "../services/http";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { AxiosError } from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // validation
      if (!username || !password) {
        return toast.error(
          `${t("loginPage.errors.enterUserNameAndPassword")}`,
          { position: "top-right" }
        );
      }
      const res = await http.post("auth/login", { username, password });

      if (res.data.status === "success") {
        // Store user in context
        login(res.data.user); // assuming API returns { user: { username, role } }

        // Optionally store token in localStorage/sessionStorage
        localStorage.setItem("token", res.data.token);

        // Redirect to home or dashboard
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed", {
          position: "top-right",
        });
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.status === 401) {
          toast.error(`${t("loginPage.errors.wrongUsernameOrPassword")}`, {
            position: "top-right",
          });
          console.log(err);
        } else {
          toast.error(`${t("loginPage.errors.serverError")}: ${err.message}`, {
            position: "top-right",
          });
          console.log(err);
        }
      } else {
        toast.error("An unexpected error occurred", { position: "top-right" });
        console.log(err);
      }
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer />
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          {t("loginPage.title")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            required
            id="username"
            name="username"
            label={t("loginPage.username")}
            autoFocus
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="password"
            name="password"
            label={t("loginPage.password")}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.2 }}
          >
            {t("loginPage.title")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
