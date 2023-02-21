import axios from "axios";
import Storage from "storage";
import { authSelector } from "../slices/auth";
import { QueryParams } from "storage/slices/employees/types";

export const convertObjToQuery = (params: QueryParams) => {
  return (
    "?" +
    Object.keys(params)
      .map((key) => {
        const param = params[key as keyof QueryParams];
        if (Array.isArray(param)) {
          return param
            .map((val) => `${key}=${encodeURIComponent(val)}`)
            .join("&");
        }
        return `${key}=${encodeURIComponent(param)}`;
      })
      .join("&")
  );
};

const Api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 90000,
});

Api.interceptors.request.use(
  async (config) => {
    // const response = await Storage.dispatch(authenticateThunk());
    // const authData = useAppSelector(({ auth }) => authSelector(auth));

    const authData = authSelector(Storage.getState().auth);
    if (authData && authData.accessToken) {
      config.headers["Authorization"] = `Bearer ${authData.accessToken}`;
    }

    // if (response.type === authenticateThunk.fulfilled.type) {
    //   const result = unwrapResult(response);
    //   if (result?.accessToken) {
    //     config.headers['Authorization'] = `Bearer ${result.accessToken}`;
    //   }
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Api;
