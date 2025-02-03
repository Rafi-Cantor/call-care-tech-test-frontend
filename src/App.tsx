import { Routes, Route, useLocation } from "react-router-dom";
import { AdminRoute, EmployeeRoute } from "./Routes";
import AdminPage from "./componants/adminPage/AdminPage";
import EmployeePage from "./componants/employeePage/EmployeePage";
import HomePage from "./componants/homePage/HomePage";
import ErrorPage from "./componants/errorPage/ErrorPage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store/store";
import { Typography, AppBar, Button, Box } from "@mui/material";
import { logout } from "./redux/slices/userSlice";
import './App.css'


function App() {
  const is_admin = useSelector((state: RootState ) => state.user.is_admin);
  const user_name = useSelector((state: RootState ) => state.user.user_name);
  const dispatch = useDispatch();
  const location = useLocation();

  const showAppBar = location.pathname !== "/";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {showAppBar && (
        <AppBar position="static" sx={{ padding: '10px 20px', marginBottom: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography sx={{ textAlign: 'left', fontSize: '1.2rem' }}>
              {is_admin ? "Admin: " : "Employee: "}
              {user_name}
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </AppBar>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <EmployeeRoute>
              <EmployeePage />
            </EmployeeRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
