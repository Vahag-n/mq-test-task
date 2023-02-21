import {InitialState} from "storage/types";
import {UserDto} from "storage/slices/user/types";

export interface AuthQueryParams {
  email: string;
  password: string;
}

export type AuthRegisterParams = Partial<UserDto>;

export interface AuthDto {
  accessToken: string;
  user: UserDto;
}

export type InitialStateDto = InitialState<AuthDto | null>;