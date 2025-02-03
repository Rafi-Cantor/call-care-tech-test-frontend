import { useState, useEffect } from "react";
import { Autocomplete, TextField, Container, Box, Typography } from "@mui/material";
import { getAllEmployees } from "../../apis/adminApis";
import { Employee } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeData } from "../../redux/slices/employeeSlice";
import { toast } from "react-toastify";

const SelectEmployee = () => {


  const [employees, setEmployees] = useState<Employee[]>([]);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const currentEmployee = useSelector((state: any) => state.employee);

  const fetchEmployees = () => {
    getAllEmployees()
      .then((r) => setEmployees(r.employees))
      .catch((error) => {toast.error(error.response.data.msg);});
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (_event: any, employee: Employee | null) => {
    if (employee) {
      dispatch(
        setEmployeeData({
          user_id: employee.user_id,
          user_name: employee.user_name,
          xp: employee.xp,
          level_id: employee.level_id,
        })
      );
      fetchEmployees();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: "16px" }}>
          Select Employee
        </Typography>
        <Autocomplete
          options={employees}
          getOptionLabel={(option) => option.user_name}
          value={currentEmployee.user_name ? currentEmployee : null}
          onChange={handleEmployeeSelect}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => (
            <TextField {...params} label="Employee Name" variant="standard" fullWidth />
          )}
        />
      </Box>
    </Container>
  );
};

export default SelectEmployee;
