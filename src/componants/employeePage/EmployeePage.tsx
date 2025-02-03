import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { RootState } from "../../redux/store/store";
import { setEmployeeData } from "../../redux/slices/employeeSlice";
import { getEmployee } from "../../apis/employeeApis";
import ProgressIcon from "./ProgressEentsIcon";
import EmployeeLevel from "./EmployeeLevel";
import { toast } from "react-toastify";


const EmployeePage = () => {
    const dispatch = useDispatch(); 
    const user_id = useSelector((state: RootState ) => state.user.user_id);
    useEffect(() => {
        getEmployee(user_id)
            .then((response) => {
                dispatch(setEmployeeData({
                    user_id: response.employee.user_id,
                    user_name: response.employee.user_name,
                    xp: response.employee.xp,
                    level_id: response.employee.level_id,
                }));
            })
            .catch((error) => {
                toast.error(error.response.data.msg);
            });
    }, [dispatch, user_id]); 

    return (
        <>
        <ProgressIcon />
        <EmployeeLevel />
        </>
    );
}

export default EmployeePage;
