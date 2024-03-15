import { IChatPostReq, IHistoryGetReq, IHistoryGetRes } from '../types/chat';
import { service } from './index';
// import { postRefreshPost } from './user';
// import { postRefreshPost } from './user';

export const getHistoryGet = async ({
  session_id,
}: IHistoryGetReq): Promise<IHistoryGetRes> => {
  const res = await service.get(`/history?session_id=${session_id}&`);
  return res.data;
};

export const postChatPost = async (payload: IChatPostReq) => {
  const res = await service.post(`/chat`, payload);
  return res;
};
export const postMes = async (payload: {
  session_id: string;
  answer: string;
}) => {
  const res = await service.post(`/message`, payload);
  return res;
};
export async function new_chat(payload) {
  try {
    const response = await fetch('http://localhost:8011/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
    // @ts-ignore
    // if (response.body.status === 20002) {
    //   const newAccessToken = await postRefreshPost({
    //     refresh_token: localStorage.getItem('refresh_token'),
    //   });
    //   localStorage.setItem('access_token', newAccessToken.data.access_token);
    //   const originalRequest = response.config;
    //   originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    //   return service(originalRequest);
    // }
    return response;
  } catch (err) {
    console.error(err);
  }
}
