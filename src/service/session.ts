import {
  ISessionDeleteReq,
  ISessionDeleteRes,
  ISessionGetRes,
  ISessionPostReq,
  ISessionPostRes,
} from '../types/session';
import { service } from './index';

export const getSessionGet = async (): Promise<ISessionGetRes> => {
  const res = await service.get(`/session`);
  return res.data;
};

export const postSessionPost = async (
  payload: ISessionPostReq
): Promise<ISessionPostRes> => {
  const res = await service.post(`/session`, payload);
  return res.data;
};

export const deleteSessionDelete = async (
  payload: ISessionDeleteReq
): Promise<ISessionDeleteRes> => {
  const res = await service.delete(`/session`, { data: payload });
  return res.data;
};
export const putSessionTitle = async (payload: {
  session_id: string;
  title: string;
}): Promise<ISessionPostRes> => {
  const res = await service.put(`/session/title`, payload);
  return res.data;
};
