import axios from "axios";
import { PagingOptions } from "../models/PagingOptions";
import { User } from "../models/User";

const API_URL = "http://localhost:3001";

export default {
  async getUsers(params: PagingOptions): Promise<User[]> {
    const response = await axios.get(`${API_URL}/users`, { params });

    return response.data;
  },

  async getUserById(id: string | null): Promise<User> {
    if (!id) {
      throw new Error("User ID szükséges!");
    }

    const response = await axios.get(`${API_URL}/users/${id}`);

    return {
      ...response.data,
      password: undefined,
    };
  },

  async getUserByEmail(email: string): Promise<User> {
    const response = await axios.get(`${API_URL}/users?email=${email}`);

    return response.data[0];
  },

  async createUser(user: Omit<User, "id">): Promise<User> {
    const response = await axios.post(`${API_URL}/register`, user);

    return response.data;
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const response = await axios.put(`${API_URL}/users/${id}`, user);

    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`${API_URL}/users/${id}`);
  },
};
