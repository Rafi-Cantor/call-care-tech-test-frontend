import request from "./apiSetup";


export const getLevels = async () => {
    const { data } = await request.get("employees/all_levels");
    return data;
  };
  
export const getEmployee = async (user_id: number | null) => {
    const { data } = await request.get(`employees/${user_id}`);
    return data;
  };
  
