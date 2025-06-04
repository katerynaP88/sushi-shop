import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Modal, Box, Typography, TextField, Button, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";



type FormInputs = {
    email: string;
    password: string;
    name?: string;
};

const AuthModal = () => {
    const { showAuthModal, setShowAuthModal } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        if (isLogin) {
            console.log("Login:", data);
            alert("Logged in successfully!");
        } else {
            console.log("Register:", data);
            alert("Registered successfully!");
        }
        setShowAuthModal(false);
        navigate("/menu");
    };

    if (!showAuthModal) return null;

    return (
        <Modal open={showAuthModal} onClose={() => setShowAuthModal(false)}>
      <Box
        sx={{
          backgroundColor: "gray",
          p: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: 400,
          mx: "auto",
          mt: "10vh",
          position: "relative",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            {isLogin ? "Login" : "Register"}
          </Typography>
          <IconButton onClick={() => setShowAuthModal(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {!isLogin && (
              <TextField 
                label="Name"
                {...register("name", {
                  required: !isLogin && "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            )}

            <TextField
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              
            />

            <Button type="submit" variant="contained" color="warning" fullWidth>
              {isLogin ? "Login" : "Register"}
            </Button>

            <Button
              onClick={() => setIsLogin(!isLogin)}
              variant="text"
              color="warning"
              sx={{ textTransform: "none" }}
            >
              {isLogin
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
    );    
};

export default AuthModal;