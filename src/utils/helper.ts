import { AxiosResponse } from "axios";
import api from "./post";

export const get_data = async <T>(url: string,): Promise<T> => {
  const response:AxiosResponse<T> = await api.get(url);
  return response.data;
};

export const put_data = async <T>(url: string, put_data: T): Promise<T> => {
  const response:AxiosResponse<T> = await api.put(url, put_data);
  return response.data;
};

export const delete_data = async <T>(url: string):Promise<T> => {
  const response:AxiosResponse<T> = await api.delete(url);
  return response.data;
};

export const post_Data = async <T>(url: string, post_data: T):Promise<T> => {
  const response:AxiosResponse<T> = await api.post(url, post_data);
  return response.data
};
