export interface ISessionGetReq {}

export interface ISessionGetRes {
  data: SessionGetResDatum[];
  info: string;
  status: number;
}

export interface SessionGetResDatum {
  created_at: string;
  deleted_at?: any;
  id: number;
  metadata: SessionGetResMetadata;
  session_id: string;
  updated_at: string;
  user_id: string;
  uuid: string;
}

interface SessionGetResMetadata {
  category: string;
  title?: string;
}

export interface ISessionPostReq {
  category: string;
}

export interface ISessionPostRes {
  data: SessionPostResData;
  info: string;
  status: number;
}

interface SessionPostResData {
  session_id: string;
}

export interface ISessionDeleteReq {
  session_id: string;
}

export interface ISessionDeleteRes {
  data: SessionDeleteResData;
  info: string;
  status: number;
}

interface SessionDeleteResData {}
