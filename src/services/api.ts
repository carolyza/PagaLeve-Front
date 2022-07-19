import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:5000/",
});

interface UserData {
  email: string;
  password: string;
}

export interface Customers {
  id: number;
  name: string;
  phone: string;
  email: string;
}

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function getCustomers(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ customers: Customers[] }>("/customers", config);
}

async function signUp(signUpData: UserData) {
  console.log(signUpData);
  await baseAPI.post("/sign-up", signUpData);
}

async function signIn(signInData: UserData) {
  return baseAPI.post<{ token: string }>("/sign-in", signInData);
}

const api = {
  signUp,
  signIn,
  getCustomers,
};

export default api;
