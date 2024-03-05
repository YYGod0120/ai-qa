import {
  IChatPostReq,
  IChatPostRes,
  IHistoryGetReq,
  IHistoryGetRes,
} from '../types/chat';
import { service } from './index';

export const getHistoryGet = async ({
  session_id,
}: IHistoryGetReq): Promise<IHistoryGetRes> => {
  const res = await service.get(`/history?session_id=${session_id}&`);
  return res.data;
};

export const postChatPost = async (
  payload: IChatPostReq
): Promise<IChatPostRes> => {
  const res = await service.post(`/chat`, payload);
  return res.data;
};
