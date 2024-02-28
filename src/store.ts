import { create } from 'zustand';

type Conversation = {
  id: number;
  title: string;
  identity: string;
  conversation: Partial<Record<'AI' | 'USER' | 'time', string>>[];

  // eslint-disable-next-line no-unused-vars
  setId: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  editTitle: (title: string) => void;
  // eslint-disable-next-line no-unused-vars
  setIdentity: (identity: string) => void;
  setConversation: (
    // eslint-disable-next-line no-unused-vars
    conversation: Partial<Record<'AI' | 'USER' | 'time', string>>[]
  ) => void;
};

export const useConversationStore = create<Conversation>((set) => ({
  id: 0,
  title: '新对话',
  identity: 'common',
  conversation: [
    {
      AI: '您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色',
    },
  ],
  setId: (id: number) => set(() => ({ id: id })),
  editTitle: (title: string) => set(() => ({ title: title })),
  setIdentity: (identity: string) => set(() => ({ identity: identity })),
  setConversation: (
    conversation: Partial<Record<'AI' | 'USER' | 'time', string>>[]
  ) => set(() => ({ conversation: conversation })),
}));
