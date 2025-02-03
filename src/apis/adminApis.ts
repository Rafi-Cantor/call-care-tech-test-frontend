import request from "./apiSetup";

export const getAllEmployees = async () => {
  const { data } = await request.get(`admins/all_employees`);
  return data;
};

export const postUpdateEmployeeXp = async (user_id: number | null, xp: number) => {
  const { data } = await request.post("admins/update_employee_xp", {
    user_id,
    xp,
  });
  return data;
};


export const getLevels = async () => {
  const { data } = await request.get("admins/all_levels");
  return data;
};

export const postUpdateEmployeeLevel = async (user_id: number | null, level_id: number) => {
  const { data } = await request.post("admins/update_employee_levels", {
    user_id,
    level_id,
  });
  return data;
};
