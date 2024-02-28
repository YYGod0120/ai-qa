import { useConversationStore } from '@/store';
export default function Popup({
  title,
  handleConfirm,
  id,
}: {
  id?: number;
  title: string;
  handleConfirm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
  const conversation = useConversationStore((state) => state.conversation);
  const newCon = id ? conversation.filter((_, index) => index !== id) : [{}];
  return (
    <div className="popup-shadow absolute left-[50%] top-[50%] flex h-[247px] w-[529px] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center rounded-xl border border-border-popup bg-white">
      <span className="text-2xl">{title}</span>
      <div className="mt-8 space-x-8">
        <button
          className="h-[46px] w-[170px] rounded-xl bg-bg-popup-confirm text-white"
          onClick={() => {
            setConversation(newCon);
            handleConfirm('');
          }}
        >
          确认
        </button>
        <button
          className="h-[46px] w-[170px] rounded-xl bg-bg-popup-cancel"
          onClick={() => {
            handleConfirm('');
          }}
        >
          取消
        </button>
      </div>
    </div>
  );
}
