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
export const useAsideStore = create<{
  sessions: SessionGetResDatum[];
  // eslint-disable-next-line no-unused-vars
  setSessions: (session: SessionGetResDatum[]) => void;
}>((set) => ({
  sessions: [],
  setSessions: (session: SessionGetResDatum[]) =>
    set(() => ({ sessions: session })),
}));
