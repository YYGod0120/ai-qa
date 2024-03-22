import { create } from 'zustand';

import { SessionGetResDatum } from './types/session';
import { getCurrentTime } from './utils/time';
// * 身份，时间以及是否正在对话
export type AI = {
  answer: string;
  isChatting?: boolean; //判断是否要用打字机样式
}[];
type ConversationHistory = {
  AI?: AI;
  HUMAN?: string;
  time: string;
  message_id?: string; //消息id
};

type Conversation = {
  id: string;
  title: string;
  identity: string;
  conversation: ConversationHistory[];

  // eslint-disable-next-line no-unused-vars
  setId: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  editTitle: (title: string) => void;
  // eslint-disable-next-line no-unused-vars
  setIdentity: (identity: string) => void;
  setConversation: (
    // eslint-disable-next-line no-unused-vars
    conversation: ConversationHistory[]
  ) => void;
};

export const useConversationStore = create<Conversation>((set) => ({
  id: 'null',
  title: '新对话',
  identity: 'common',
  conversation: [
    {
      AI: [
        {
          answer:
            '您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色',
        },
      ],
      time: getCurrentTime(),
    },
  ],
  setId: (id: string) => set(() => ({ id: id })),
  editTitle: (title: string) => set(() => ({ title: title })),
  setIdentity: (identity: string) => set(() => ({ identity: identity })),
  setConversation: (conversation: ConversationHistory[]) =>
    set(() => ({ conversation: conversation })),
}));
// 是否在输出
export const useIsTakingStore = create<{
  isTaking: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsTaking: (isTaking: boolean) => void;
}>((set) => ({
  isTaking: false,
  setIsTaking: (isTaking: boolean) => set(() => ({ isTaking: isTaking })),
}));

type AsideStore = {
  sessions: SessionGetResDatum[];
  selectedId: string;
  sessionsHistory: {
    sessionId: string;
    history: ConversationHistory[];
  }[];
  // eslint-disable-next-line no-unused-vars
  setSessions: (session: SessionGetResDatum[]) => void;
  // eslint-disable-next-line no-unused-vars
  setSessionsHistory: (
    // eslint-disable-next-line no-unused-vars
    sessionsHistory: {
      sessionId: string;
      history: ConversationHistory[];
    }[]
  ) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedId: (sessionId: string) => void;
};

export const useAsideStore = create<AsideStore>((set) => ({
  sessions: [],
  sessionsHistory: [],
  selectedId: '',
  setSessions: (session: SessionGetResDatum[]) =>
    set(() => ({ sessions: session })),
  setSessionsHistory: (
    sessionsHistory: {
      sessionId: string;
      history: ConversationHistory[];
    }[]
  ) => set(() => ({ sessionsHistory: sessionsHistory })),
  setSelectedId: (selectedId: string) =>
    set(() => ({ selectedId: selectedId })),
}));
