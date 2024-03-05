import {
  ILoginPostReq,
  ILoginPostRes,
  IRefreshPostReq,
  IRefreshPostRes,
  IRegisterPostReq,
  IRegisterPostRes,
} from '../types/user';
import { service } from './index';

export const postLoginPost = async (
  payload: ILoginPostReq
): Promise<ILoginPostRes> => {
  const res = await service.post(`/user/login`, payload);
  return res.data;
};

export const postRegisterPost = async (
  payload: IRegisterPostReq
): Promise<IRegisterPostRes> => {
  const res = await service.post(`/user/register`, payload);
  return res.data;
};

export const postRefreshPost = async (
  payload: IRefreshPostReq
): Promise<IRefreshPostRes> => {
  const res = await service.post(`/user/refresh`, payload);
  return res.data;
};
