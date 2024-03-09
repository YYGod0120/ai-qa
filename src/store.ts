import { create } from 'zustand';

import { SessionGetResDatum } from './types/session';

type Conversation = {
  id: string;
  title: string;
  identity: string;
  conversation: Partial<Record<'AI' | 'HUMAN' | 'time', string>>[];

  // eslint-disable-next-line no-unused-vars
  setId: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  editTitle: (title: string) => void;
  // eslint-disable-next-line no-unused-vars
  setIdentity: (identity: string) => void;
  setConversation: (
    // eslint-disable-next-line no-unused-vars
    conversation: Partial<Record<'AI' | 'HUMAN' | 'time', string>>[]
  ) => void;
};

export const useConversationStore = create<Conversation>((set) => ({
  id: 'null',
  title: '新对话',
  identity: 'common',
  conversation: [
    {
      AI: '您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色',
    },
  ],
  setId: (id: string) => set(() => ({ id: id })),
  editTitle: (title: string) => set(() => ({ title: title })),
  setIdentity: (identity: string) => set(() => ({ identity: identity })),
  setConversation: (
    conversation: Partial<Record<'AI' | 'HUMAN' | 'time', string>>[]
  ) => set(() => ({ conversation: conversation })),
}));

type AsideStore = {
  sessions: SessionGetResDatum[];
  sessionsHistory: {
    sessionId: string;
    history: Partial<Record<'AI' | 'HUMAN' | 'time', string>>[];
  }[];
  // eslint-disable-next-line no-unused-vars
  setSessions: (session: SessionGetResDatum[]) => void;
  // eslint-disable-next-line no-unused-vars
  setSessionsHistory: (
    // eslint-disable-next-line no-unused-vars
    sessionsHistory: {
      sessionId: string;
      history: Partial<Record<'AI' | 'HUMAN' | 'time', string>>[];
    }[]
  ) => void;
};

export const useAsideStore = create<AsideStore>((set) => ({
  sessions: [],
  sessionsHistory: [],
  setSessions: (session: SessionGetResDatum[]) =>
    set(() => ({ sessions: session })),
  setSessionsHistory: (
    sessionsHistory: {
      sessionId: string;
      history: Partial<Record<'AI' | 'HUMAN' | 'time', string>>[];
    }[]
  ) => set(() => ({ sessionsHistory: sessionsHistory })),
}));
