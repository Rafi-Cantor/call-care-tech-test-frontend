import EditEmployeeLevel from "./EditEmployeeLevel";
import SelectEmployee from "./SelectEmployee";
import EditEmployeeProgress from "./EditEmployeeProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const AdminPage = () => {
  const user_id = useSelector((state: RootState) => state.employee.user_id);

  return (
    <>
      <SelectEmployee />
      {user_id && (
        <>
          <EditEmployeeProgress />
          <EditEmployeeLevel />
        </>
      )}
    </>
  );
};

export default AdminPage;
