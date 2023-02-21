import { GenderEnum, InitialState } from "storage/types";

export interface QueryParams {
  [key: string]: string | number | number[];
}

export interface EmployeeDto {
  length: number;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: GenderEnum;
  department: string;
  job_title: string;
  country: string;
  city: string;
}

export type InitialStateDto = InitialState<EmployeeDto[] | null>;
