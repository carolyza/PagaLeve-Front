import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:5000/",
});

interface UserData {
  email: string;
  password: string;
}

export interface Customers {
  userId: number;
  name: string | void;
  phone: string | void;
  email: string | void;
}

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function getCustomers(token: string, user: number) {
  const config = getConfig(token);
  console.log(user);
  return baseAPI.get<{ customers: Customers[] }>(`/customers/${user}`, config);
}

async function signUp(signUpData: UserData) {
  await baseAPI.post("/sign-up", signUpData);
}

async function signIn(signInData: UserData) {
  return baseAPI.post<{ token: string }>("/sign-in", signInData);
}

async function createContact(createData: Customers) {
  return baseAPI.post("/create", createData);
}

async function getList(user: any) {
  return baseAPI.get("/list", user);
}

async function updateList(user: number, id: number, data: any) {
  const updateData = { user, id, data };
  return baseAPI.put("/update", updateData);
}

async function deleteContact(user: any, id: number) {
  console.log(user, id);
  return baseAPI.delete(`/delete/${id}`, user);
}

async function getUserId(token: string, signInData: any) {
  const config = getConfig(token);
  return baseAPI.get(`/user/${signInData}`, config);
}

const api = {
  signUp,
  signIn,
  getCustomers,
  createContact,
  getList,
  updateList,
  deleteContact,
  getUserId,
};

export default api;
