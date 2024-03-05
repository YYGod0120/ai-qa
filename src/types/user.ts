export interface ILoginPostReq {
  username: string;
  password: string;
}

export interface ILoginPostRes {
  data: LoginPostResData;
  info: string;
  status: number;
}

interface LoginPostResData {
  access_token: string;
  refresh_token: string;
  user_id: string;
}

export interface IRegisterPostReq {
  username: string;
  password: string;
}

export interface IRegisterPostRes {
  data: RegisterPostResData;
  info: string;
  status: number;
}

interface RegisterPostResData {}

export interface IRefreshPostReq {
  refresh_token: string;
}

export interface IRefreshPostRes {
  data: RefreshPostResData;
  info: string;
  status: number;
}

interface RefreshPostResData {
  access_token: string;
  user_id: number;
}
