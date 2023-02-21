import { AxiosResponse } from "axios";

import Api, { convertObjToQuery } from "storage/api";

import { EmployeeDto, QueryParams } from "./types";

const employeesApi = {
  async query(params?: QueryParams): Promise<AxiosResponse<EmployeeDto[]>> {
    const queryParams = params ? convertObjToQuery(params) : "";
    return await Api.get(`/employees${queryParams}`);
  },
  async create(data: EmployeeDto): Promise<AxiosResponse<EmployeeDto>> {
    return await Api.post(`/employees`, data);
  },
};

export default employeesApi;
