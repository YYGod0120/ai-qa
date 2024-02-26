import './index.css';
import './styles/shadow.css';

import { useState } from 'react';

import clear from './aside_icon/clean_con.png';
import export_word from './aside_icon/export_word.png';
import full_scene from './aside_icon/full_scene.png';
import history from './aside_icon/history.png';
import smaller from './aside_icon/smaller.png';
import { Dialog } from './common/ConversationPart';
// import AiIdentity from './components/AiIdentity';
import Aside from './components/Aside';
import FQ from './components/FQ';
import History from './components/History';
import Popup from './components/Popup';
// import USER from './components/USER';
import backToBottom from './conversation_icon/back-to-bottom.png';
import { useConversationStore } from './store';
import { getCurrentTime } from './utils/time';
import { doAnimation } from './utils/useAnimation';
import { useTranslateHtml } from './utils/useTranslate';
function handleBottomBtnClick() {
  const container = document.getElementById('conversation_box');
  let startTop = container.scrollTop;

  let endTop = container.scrollHeight - container.clientHeight;

  let scrollAnimationFn = doAnimation(startTop, endTop, 300, container);

  let interval = setInterval(() => {
    scrollAnimationFn(interval);
  }, 10);
}

function ConversationBox({
  handleClick,
  handleDelete,
}: {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
  )[];
}) {
  const conversations = useConversationStore((state) => state.conversation);
  return (
    <div
      className=" ml-5 mt-5 h-[70vh] space-y-7 overflow-y-scroll"
      id="conversation_box"
    >
      {conversations.map((conversation, index) => {
        const conversationValues = Object.values(conversation);
        const conversationKeys = Object.keys(conversation);
        return Dialog(
          conversationKeys[0] as 'AI' | 'USER',
          conversationValues[0],
          index,
          handleDelete,
          index === 0 && conversationValues[0] ? (
            <FQ handleClick={handleClick} />
          ) : null,
          conversationValues[1] ? conversationValues[1] : null
        );
      })}
      <img
        src={backToBottom}
        alt=""
        className=" fixed bottom-[120px]  left-[85vw]"
        onClick={handleBottomBtnClick}
      />
    </div>
  );
}
function App() {
  const [inputValue, setInputValue] = useState('');
  const [largerInput, setLargerInput] = useState(false);
  const [delTitle, setDelTitle] = useState('');
  const [deleteId, setDeleteId] = useState<number>(null);
  const [historyPopup, setHistoryPopup] = useState(false);
  const title = useConversationStore((state) => state.title);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
  const conversations = useConversationStore((state) => state.conversation);
  const handleExport = useTranslateHtml();
  function handleOutput(words: string) {
    setConversation([
      ...conversations,
      { USER: words, time: getCurrentTime() },
    ]);
  }

  const deleteFns = [setDelTitle, setDeleteId];

  return (
    <div className="flex h-[100vh] flex-row bg-page-bg  ">
      <Aside />
      <div className="box-shadow  mb-[1vh] mt-[3vh] flex w-[70vw] flex-col rounded-2xl bg-white">
        <div className={largerInput ? 'h-[40vh]' : 'h-[85vh]'}>
          <div className="flex  w-[70vw] items-center justify-between rounded-t-2xl border-b-2 border-main-divider bg-gradient-to-r from-[#F6F9FE] via-transparent to-[#FFFFFF] pl-10 text-xl leading-[8vh]">
            <span className="self-start text-center text-default-font">
              {title}
            </span>
            <div className="flex space-x-5 pr-5">
              <img
                src={export_word}
                alt="导出为word"
                title="导出为word"
                onClick={() => {
                  handleExport();
                }}
              />
              <img
                src={clear}
                alt="清除对话"
                title="清除对话"
                onClick={() => {
                  setDelTitle('确认清除该对话中所有问答记录?');
                }}
              />
            </div>
          </div>

          <ConversationBox
            handleClick={setInputValue}
            handleDelete={deleteFns}
          ></ConversationBox>
        </div>
        <div className=" relative mt-4  w-[70vw]  px-5">
          <textarea
            className={
              largerInput
                ? 'text-input-shadow h-[52vh] w-[68vw] resize-none rounded-md px-4 py-2  text-base outline-none'
                : 'text-input-shadow h-[59px] w-[68vw] resize-none rounded-md px-4 text-base leading-[59px] outline-none'
            }
            placeholder="请问我任何关于重庆文旅的问题"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleOutput(inputValue);
                e.preventDefault();
                setInputValue('');
              }
            }}
          ></textarea>

          <div
            className={
              largerInput
                ? ' absolute  right-8  flex translate-y-[-200%] space-x-4 '
                : 'absolute bottom-[50%] right-8  flex  translate-y-[50%] space-x-4'
            }
          >
            <img
              src={history}
              alt="历史记录"
              title="历史记录"
              onClick={() => {
                setHistoryPopup(true);
              }}
            />
            <img
              src={largerInput ? smaller : full_scene}
              alt="全屏"
              title="全屏"
              onClick={() => {
                setLargerInput(!largerInput);
              }}
            />
          </div>
        </div>
      </div>
      {delTitle ? (
        <Popup
          title={delTitle}
          handleComfirm={setDelTitle}
          id={deleteId}
        ></Popup>
      ) : (
        <></>
      )}
      {historyPopup ? <History handleClose={setHistoryPopup} /> : null}
    </div>
  );
}

export default App;
