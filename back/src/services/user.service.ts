import LoginUserDto from "../dtos/loginUser.dto";
import RegisterUserDto from "../dtos/registerUser.dto";
import { User } from "../entities/User";
import { UserResponseDto } from "../dtos/userResponse.dto";
import { UserRepository } from "../repositories/user.repository";
import { ClientError } from "../utils/errors";
import {
  checkPasswordService,
  createCredentialService,
} from "./credential.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

const toUserResponse = (user: User): UserResponseDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  address: user.address,
  phone: user.phone,
  role: user.role,
});

export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await UserRepository.findOneBy({ email });
  return !!user;
};

export const registerUserService = async (
  registerUserDto: RegisterUserDto
): Promise<UserResponseDto> => {
  const user = await UserRepository.create(registerUserDto);
  await UserRepository.save(user);
  const credential = await createCredentialService({
    password: registerUserDto.password,
  });
  user.credential = credential;
  await UserRepository.save(user);

  return toUserResponse(user);
};

export const loginUserService = async (
  loginUserDto: LoginUserDto
): Promise<{ token: string; user: UserResponseDto }> => {
  const user: User | null = await UserRepository.findOne({
    where: {
      email: loginUserDto.email,
    },
    relations: ["credential", "orders"],
  });
  if (!user) throw new Error("User not found");
  if (
    await checkPasswordService(loginUserDto.password, user.credential.password)
  ) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return {
      user: toUserResponse(user),
      token,
    };
  } else {
    throw new ClientError("Invalid password");
  }
};
