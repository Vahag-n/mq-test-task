import {GenderEnum, InitialState} from "storage/types";

export interface UserDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: GenderEnum;
  department: string;
  job_title: string;
  country: string;
  city: string;
  password: string;
  suggestions: number[];
}

export type InitialStateDto = InitialState<Partial<UserDto> | null>;