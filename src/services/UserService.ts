import axios from "axios";
import { PagingOptions } from "../models/PagingOptions";
import { User } from "../models/User";
import { OrderType } from "../enums/OrderType";
import { PagedResult } from "../models/PagedResult";

const API_URL = "http://localhost:5134/api";

export default {
  async getUsers(params: PagingOptions): Promise<PagedResult<User>> {
    const response = await axios.get(`${API_URL}/users`, {
      params: {
        ...params,
        _sort: `${params._order === OrderType.ASC ? "" : "-"}${params._sort}`,
        _order: undefined,
      },
    });

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

  async getUserByEmail(email: string, token: string): Promise<User> {
    const response = await axios.get(`${API_URL}/users?email=${email}`, { headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  },

  async createUser(user: Omit<User, "id">): Promise<User> {
    const response = await axios.post(`${API_URL}/users`, user);

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
