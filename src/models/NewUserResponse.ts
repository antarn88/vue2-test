import type { User } from "./User";

export interface AuthenticatedUser {
  accessToken: string;
  user: User;
}
