export interface IHistoryGetReq {
  session_id: string;
}

export interface IHistoryGetRes {
  data: HistoryGetResDatum[];
  info: string;
  status: number;
}

interface HistoryGetResDatum {
  content: string;
  created_at: string;
  metadata: HistoryGetResMetadata;
  role: string;
  token_count: number;
  uuid: string;
}

interface HistoryGetResMetadata {
  system: HistoryGetResSystem;
}

interface HistoryGetResSystem {
  entities: HistoryGetResEntity[];
  intent?: string;
}

interface HistoryGetResEntity {
  Label: string;
  Matches: HistoryGetResMatch[];
  Name: string;
}

interface HistoryGetResMatch {
  End: number;
  Start: number;
  Text: string;
}

export interface IChatPostReq {
  session_id: string;
  category: string;
  content: string;
}

export interface IChatPostRes {
  data: ChatPostResData;
  info: string;
  status: number;
}

interface ChatPostResData {
  answer: string;
}
