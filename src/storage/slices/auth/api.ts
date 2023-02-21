import {AuthDto, AuthQueryParams, AuthRegisterParams} from './types';
import {AxiosResponse} from "axios";
import Cache from "storage/cache";
import Api from "storage/api";
import {StorageConstantsEnum} from "storage/cache/types";

const authApi = {
  async authenticate(): Promise<AuthDto | null> {
    return await Cache.getItem<AuthDto>(StorageConstantsEnum.User);
  },
  async login(data: AuthQueryParams): Promise<AxiosResponse<AuthDto>> {
    return await Api.post('/auth/login', data);
  },
  async register(data: AuthRegisterParams): Promise<AxiosResponse<AuthDto>> {
    return await Api.post('/auth/register', data);
  }
};

export default authApi;
