import Cache from "storage/cache";
import { StorageConstantsEnum } from "storage/cache/types";
import Api from "storage/api";
import { AxiosResponse } from "axios";
import { UserDto } from "./types";
import { AuthDto } from "../auth/types";

const userApi = {
  async get(id?: number): Promise<Partial<UserDto | null>> {
    // const userData = await Cache.getItem(StorageConstantsEnum.CurrentUser) || {};
    const userData = await Cache.getItem<Partial<UserDto | null>>(StorageConstantsEnum.CurrentUser) || {};
    if(!id) return userData
    
    const userDateFromApi = await Api.get(`/users/${id}`)
    return {...userData, ...userDateFromApi.data};
  },
  async remove(): Promise<Partial<UserDto | null>> {
    await Cache.removeItem(StorageConstantsEnum.CurrentUser);
    return await Cache.getItem(StorageConstantsEnum.CurrentUser);
  },
  async save(data: Partial<UserDto | null>): Promise<Partial<UserDto | null>> {
    const userData = await Cache.getItem<Partial<UserDto | null>>(StorageConstantsEnum.CurrentUser) || {};
    await Cache.setItem(StorageConstantsEnum.CurrentUser, {...userData, ...data});
    return await Cache.getItem(StorageConstantsEnum.CurrentUser);
  },

  async update(data: UserDto): Promise<AxiosResponse<UserDto>> {
    const { id, ...user } = data;
    this.save(data)
    return await Api.put(`/users/${id}`, user);
  },
};

export default userApi;
