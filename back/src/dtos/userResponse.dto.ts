import { Role } from "../entities/User";

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: Role;
}