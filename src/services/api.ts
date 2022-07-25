import axios from "axios";

const baseAPI = axios.create({
  baseURL: "https://git.heroku.com/pagaleve.git",
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

async function updateList(id: string, createData: Customers) {
  return baseAPI.put(`/update/${id}`, createData);
}

async function deleteContact(id: number) {
  return baseAPI.delete(`/delete/${id}`);
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
