import { create } from 'zustand';
type Conversation = {
  id: number;
  title: string;
  identity: string;
  // eslint-disable-next-line no-unused-vars
  setId: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  editTitle: (title: string) => void;
  // eslint-disable-next-line no-unused-vars
  setIdentity: (identity: string) => void;
};
export const useConversationStore = create<Conversation>((set) => ({
  id: 0,
  title: '新对话',
  identity: 'default',
  setId: (id: number) => set(() => ({ id: id })),
  editTitle: (title: string) => set(() => ({ title: title })),
  setIdentity: (identity: string) => set(() => ({ identity: identity })),
}));
