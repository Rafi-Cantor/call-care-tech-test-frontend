import axios from "axios";


const BASEURL = import.meta.env.VITE_BASE_URL;


export const loginApi = async (
  username: string,
  password: string,
) => {
  const { data } = await axios.post(`${BASEURL}/login`, {
    user_name: username,
    password: password,
  });
  return data;
};


export const registerApi = async (
    username: string,
    password: string,
    is_admin: boolean = false
  ) => {
    const { data } = await axios.post(`${BASEURL}/register`, {
      user_name: username,
      password: password,
      is_admin: is_admin,
    });
    return data;
  };