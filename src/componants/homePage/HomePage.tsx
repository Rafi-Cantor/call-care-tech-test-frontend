import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { loginApi, registerApi } from "../../apis/authApis";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import { User } from "../../types/types";
import { useNavigate } from "react-router-dom";

type FormData = {
  user_name: string;
  password: string;
  confirm_password: string;
  is_admin: boolean;
};

const HomePage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLoginRegister = (response: User) => {
    dispatch(
      login({
        user_id: response.user_id,
        user_name: response.user_name,
        is_authenticated: true,
        is_admin: response.is_admin,
        access_token: response.access_token
      } as User)
    );


    if (response.is_admin) {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  const [activeTab, setActiveTab] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    password: "",
    confirm_password: "",
    is_admin: false,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setFormData({
      user_name: "",
      password: "",
      confirm_password: "",
      is_admin: false,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTab === 0) {
      loginApi(formData.user_name, formData.password)
        .then((response) => {
          onLoginRegister(response);
        })
        .catch((error) => {
          toast.error(error.response.data.msg);
        });
    } else {
      if (formData.password !== formData.confirm_password) {
        toast.error("Failed: passwords dont match");
      } else {
        registerApi(formData.user_name, formData.password, formData.is_admin)
          .then((response) => {
            onLoginRegister(response);
          })
          .catch((error) => {
            toast.error(error.response.data.msg);
          });
      }
    }
  };


  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <Typography variant="h5">
          {activeTab === 0 ? "Login" : "Register"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="User Name"
            name="user_name"
            type="user_name"
            value={formData.user_name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          {activeTab === 1 && (
            <>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_admin}
                    onChange={handleChange}
                    name="is_admin"
                    color="primary"
                  />
                }
                label="Admin"
                sx={{ marginTop: "16px" }}
              />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
          >
            {activeTab === 0 ? "Login" : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default HomePage;
