import './index.css';
import './styles/shadow.css';

import { Spin } from 'antd';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';

import clear from './aside_icon/clean_con.png';
import export_word from './aside_icon/export_word.png';
import full_scene from './aside_icon/full_scene.png';
import history from './aside_icon/history.png';
import smaller from './aside_icon/smaller.png';
import { Dialog } from './common/ConversationPart';
import AiIdentity from './components/AiIdentity';
// import AiIdentity from './components/AiIdentity';
import Aside from './components/Aside';
import FQ from './components/FQ';
import History from './components/History';
import Login from './components/Login';
import Popup from './components/Popup';
// import USER from './components/USER';
import backToBottom from './conversation_icon/back-to-bottom.png';
import { getHistoryGet, new_chat, postMes } from './service/chat';
import { getSessionGet } from './service/session';
import { useAsideStore, useConversationStore, useIsTakingStore } from './store';
import { formattedTimed, getCurrentTime } from './utils/time';
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

interface ConversationBoxProps {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
  )[];
  // eslint-disable-next-line no-unused-vars
  handleExport: (id?: number) => Promise<void>;
}
const ConversationBox = forwardRef(
  (
    { handleClick, handleDelete, handleExport }: ConversationBoxProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const conversations = useConversationStore((state) => state.conversation);
    const handleOverTaking = useIsTakingStore((state) => state.setIsTaking);
    return (
      <div
        ref={ref}
        className=" ml-5 mt-5 h-[70vh] space-y-7 overflow-y-scroll"
        id="conversation_box"
      >
        {conversations.map((conversation, index) => {
          const conversationValues = Object.values(conversation); //1是时间 0是对话内容
          const conversationKeys = Object.keys(conversation);
          return Dialog(
            conversationKeys[0] as 'AI' | 'USER',
            conversationValues[0],
            index,
            handleDelete,
            handleExport,
            handleOverTaking,
            index === 0 &&
              conversationValues[0] &&
              conversationKeys[0] === 'AI' ? (
              <FQ handleClick={handleClick} />
            ) : null,
            (conversationValues[1] as string)
              ? (conversationValues[1] as string)
              : null
          );
        })}
        <img
          src={backToBottom}
          alt=""
          className="fixed bottom-[120px]  left-[85vw]"
          onClick={handleBottomBtnClick}
        />
      </div>
    );
  }
);
ConversationBox.displayName = 'ConversationBox';
function App() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  //设置对话框禁用
  const [handleOutputOver, setHandleOutputOver] = useState(true);
  // ai res
  const renderAIRes = useRef('');

  const [largerInput, setLargerInput] = useState(false);
  const [delTitle, setDelTitle] = useState('');
  const [deleteId, setDeleteId] = useState<number>(null);
  const [historyPopup, setHistoryPopup] = useState(false);
  const [chooseIdentityDone, setChooseIdentityDone] = useState(true);
  const conversation_box = useRef(null);
  const title = useConversationStore((state) => state.title);
  const id = useConversationStore((state) => state.id);
  const identity = useConversationStore((state) => state.identity);
  const sessionsHistory = useAsideStore((state) => state.sessionsHistory);
  const setSessionsHistory = useAsideStore((state) => state.setSessionsHistory);
  const setConversation = useConversationStore((state) => {
    return state.setConversation;
  });
  const conversations = useConversationStore((state) => state.conversation);
  const talking = useIsTakingStore((state) => state.isTaking);
  const setIsTaking = useIsTakingStore((state) => state.setIsTaking);
  const setAsideSession = useAsideStore((state) => state.setSessions);
  const handleExport = useTranslateHtml();

  async function getData() {
    const session = await getSessionGet();
    const newSession = session.data.map((item) => {
      return {
        ...item,
        metadata: {
          ...item.metadata,
          title: item.metadata.title ? item.metadata.title : '新对话',
        },
      };
    });
    const allHistory = await Promise.all(
      newSession.map(async (session) => {
        const conversation = await getHistoryGet({
          session_id: session.session_id,
        });
        if (conversation.data.length > 0) {
          return {
            sessionId: session.session_id,
            history: conversation.data.map((data) => {
              if (data.role.toUpperCase() === 'AI') {
                return {
                  [data.role.toUpperCase()]: [
                    { answer: data.content, isChatting: false },
                  ],
                  time: formattedTimed(data.created_at),
                };
              } else {
                return {
                  [data.role.toUpperCase()]: data.content,
                  time: formattedTimed(data.created_at),
                };
              }
            }),
          };
        } else {
          return {
            sessionId: session.session_id,
            history: [
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
          };
        }
      })
    );
    setSessionsHistory([...sessionsHistory, ...allHistory]);
    setAsideSession(newSession);
    setLoading(false);
  }

  async function handleOutput(words_human: string) {
    setHandleOutputOver(false);
    const askTime = getCurrentTime();
    setConversation([...conversations, { HUMAN: words_human, time: askTime }]);
    conversation_box.current.scrollTop = conversation_box.current.scrollHeight;
    const rep = await new_chat({
      session_id: id,
      category: identity,
      content: words_human,
    });
    const reader = rep.body.getReader();
    const decoder = new TextDecoder();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      if (!talking) {
        setIsTaking(true);
        const decoded = decoder.decode(value, { stream: true });
        console.log(decoded);
        setConversation([
          ...conversations,
          { HUMAN: words_human, time: askTime },
          {
            AI: [
              { answer: renderAIRes.current, isChatting: false },
              { answer: decoded, isChatting: true },
            ],
            time: getCurrentTime(),
          },
        ]);
        renderAIRes.current += decoded;
      }

      if (done) {
        setConversation([
          ...conversations,
          { HUMAN: words_human, time: askTime },
          {
            AI: [{ answer: renderAIRes.current, isChatting: false }],
            time: getCurrentTime(),
          },
        ]);

        const data = await postMes({
          session_id: id,
          answer: renderAIRes.current,
        });
        if (data.status === 200) {
          renderAIRes.current = '';
          setHandleOutputOver(true);
        }
        break;
      }
    }
  }

  const deleteFns = [setDelTitle, setDeleteId];
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (conversation_box.current) {
      conversation_box.current.scrollTop =
        conversation_box.current.scrollHeight;
    }
  }, [conversations]);
  return (
    <div className="flex h-[100vh] flex-row bg-page-bg ">
      <Aside
        handleChooseIdentity={setChooseIdentityDone}
        getData={getData}
        loading={loading}
      />

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

          {chooseIdentityDone && !loading ? (
            <ConversationBox
              handleClick={setInputValue}
              handleDelete={deleteFns}
              handleExport={handleExport}
              ref={conversation_box}
            ></ConversationBox>
          ) : (
            <div className="flex items-center justify-center h-[70vh]">
              <Spin size="large" />
            </div>
          )}
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
            disabled={!handleOutputOver}
          ></textarea>

          <div
            className={
              largerInput
                ? 'absolute  right-8  flex translate-y-[-200%] space-x-4 '
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
          handleConfirm={setDelTitle}
          id={deleteId}
        ></Popup>
      ) : (
        <></>
      )}
      {historyPopup ? <History handleClose={setHistoryPopup} /> : null}
      {!chooseIdentityDone ? (
        <AiIdentity
          handleChooseIdentity={setChooseIdentityDone}
          getData={getData}
        ></AiIdentity>
      ) : (
        <></>
      )}
      {<Login></Login>}
    </div>
  );
}

export default App;
