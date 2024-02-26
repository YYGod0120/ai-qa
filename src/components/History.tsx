import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import ai_avator from '@/conversation_icon/ai_avator.png';
import close_history from '@/conversation_icon/close_history.png';
import USER_avator from '@/conversation_icon/USER.png';
import { useConversationStore } from '@/store';

export default function History({
  handleClose,
}: {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const conversations = useConversationStore((state) => state.conversation);
  const converTitle = useConversationStore((state) => state.title);
  return (
    <div className="popup-shadow absolute left-[50%] top-[50%] h-[500px] w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-bg-history">
      <div className="flex  items-center justify-between  rounded-t-xl bg-white p-[15px] text-lg">
        <span className=" translate-x-[250px] self-center">{converTitle}</span>
        <img
          src={close_history}
          alt=""
          className="h-[20px] w-[20px] "
          onClick={() => {
            handleClose(false);
          }}
        />
      </div>
      <div className="p-5">
        <Input
          className="w-[500px]  bg-white"
          placeholder="搜索历史记录"
          addonBefore={<SearchOutlined></SearchOutlined>}
        />
      </div>
      <div className="flex h-[370px] flex-col overflow-y-scroll px-5">
        {conversations.map((conversation, index) => {
          const conversationValues = Object.values(conversation);
          const conversationKeys = Object.keys(conversation);
          return (
            <div className="flex flex-row space-x-5 " key={index}>
              <img
                src={conversationKeys[0] === 'AI' ? ai_avator : USER_avator}
                alt=""
                className="h-[57px] w-[57px] rounded-[28.5px]"
              />
              <div className="flex flex-col ">
                <div className="mb-3 text-sm text-time-font">
                  {conversationValues[1] ? conversationValues[1] : ''}
                </div>
                <div>{conversationValues[0]}</div>
                <div className=" my-[25px]  h-[1px] bg-bg-divider"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
