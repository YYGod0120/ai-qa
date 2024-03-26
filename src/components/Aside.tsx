import '@/styles/list_item_fade.css';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, List } from 'antd';
import { useEffect, useState } from 'react';

import edit from '@/aside_icon/edit.png';
import message from '@/aside_icon/message.png';
import { deleteSessionDelete, putSessionTitle } from '@/service/session';
import { useAsideStore, useConversationStore, useIsTakingStore } from '@/store';
const categories = {
  common: '默认',
  attraction: '景点',
  human: '人文历史',
  food: '美食',
  transport: '交通',
  tour: '乡村旅游',
  hot: '网红/热门',
};
function handleClass(isSelected: boolean, isDisabled: boolean = true) {
  const classname_noselected =
    'mb-3 h-[65px]  text-xl leading-[65px] flex items-center justify-between px-5 rounded-lg';
  const selected = ' border text-selected mb-3';
  const disabled = ' cursor-not-allowed';
  return (
    classname_noselected +
    (isSelected
      ? selected + ' bg-bg-selected border-selected'
      : ' bg-white border-default-border') +
    (isDisabled ? disabled : '')
  );
}
const iconShapes = 'h-[30px] w-[30px]';
const { Search } = Input;
export default function Aside({
  handleChooseIdentity,
  loading,
  getData,
}: {
  handleChooseIdentity: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  getData: any;
}) {
  const [editingId, setEditingId] = useState(-1);
  const title = useConversationStore((state) => state.title);
  const id = useConversationStore((state) => state.id);
  const setId = useConversationStore((state) => state.setId);
  const editTitle = useConversationStore((state) => state.editTitle);
  const setIdentity = useConversationStore((state) => state.setIdentity);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
  const sessions = useAsideStore((state) => state.sessions);
  const setSession = useAsideStore((state) => state.setSessions);
  const selectedId = useAsideStore((state) => state.selectedId);
  const setSelectedId = useAsideStore((state) => state.setSelectedId);
  const sessionsHistory = useAsideStore((state) => state.sessionsHistory);
  const talking = useIsTakingStore((state) => state.isTaking);
  const [filterStr, setFilterStr] = useState<string>('');

  const handleClick = async (index: string, title: string) => {
    setId(index);
    editTitle(title);
    setSelectedId(index);
    const history = sessionsHistory.filter((item) => {
      return item.sessionId === index;
    })[0];
    if (history.history.length > 0) {
      setConversation(history.history);
    }
  };
  useEffect(() => {
    if (!loading) {
      if (sessions.length > 0) {
        handleClick(sessions[0].session_id, sessions[0].metadata.title);
      }
    }
  }, [loading]);
  return (
    <div className="mx-5  mb-[1vh] mt-[3vh] w-aside space-y-5 rounded-2xl border border-solid border-default-border bg-bg-selected">
      <div className=" h-[8vh]  px-5 pt-5">
        <Search
          className="rounded-xl bg-white"
          placeholder="搜索历史记录"
          onSearch={(value) => {
            setFilterStr(value);
          }}
        />
      </div>

      <div className="flex h-[85vh] cursor-pointer flex-col justify-between bg-bg-selected px-3 pb-5">
        <List
          itemLayout="horizontal"
          dataSource={
            !loading
              ? sessions.filter((i) => {
                  return i.metadata.title.includes(filterStr);
                })
              : []
          }
          renderItem={(item, index) => (
            <div
              className={handleClass(item.session_id === selectedId, talking)}
              onClick={
                !talking
                  ? () => {
                      handleClick(item.session_id, item.metadata.title);
                      setIdentity(item.metadata.category);
                      setEditingId(-1);
                      if (item.metadata.category === '') {
                        handleChooseIdentity(false);
                      } else {
                        handleChooseIdentity(true);
                      }
                    }
                  : null
              }
            >
              <div className=" flex items-center  space-x-2 ">
                {item.session_id === selectedId ? (
                  <img src={message} className={iconShapes} />
                ) : (
                  <></>
                )}

                {editingId === index ? (
                  <input
                    className="w-[200px] overflow-hidden h-[50px] bg-page-bg border-2 border-solid border-default-border text-default-font"
                    defaultValue={item.metadata.title}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      editTitle(e.target.value);
                    }}
                  ></input>
                ) : (
                  <span
                    className={
                      item.session_id === selectedId
                        ? 'left-to-right-fade w-[200px]'
                        : 'overflow-hidden text-nowrap pl-[38px] w-[220px]'
                    }
                  >
                    {item.metadata.title}
                  </span>
                )}
                {item.session_id !== selectedId ? (
                  <div className="text-sm self-end pb-3 ">
                    {categories[item.metadata.category]}
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {item.session_id === selectedId ? (
                <div className="flex space-x-5">
                  <img
                    src={edit}
                    className="h-[20px] w-[20px]"
                    title={item.metadata.title}
                    onClick={async (e) => {
                      setEditingId(index === editingId ? -1 : index);
                      if (index === editingId) {
                        const rep = await putSessionTitle({
                          session_id: item.session_id,
                          title: title,
                        });
                        if (rep.info) {
                          getData();
                        }
                      }
                      e.stopPropagation();
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        />
        <div className="mt-5 flex items-center justify-between ">
          <Button
            className="h-[47px] w-[165px] px-3 py-1"
            style={{
              backgroundColor: '#8C7BF7',
              color: 'white',
              border: 'none',
            }}
            onClick={() => {
              setSession([
                ...sessions,
                {
                  created_at: '',
                  id: -1,
                  metadata: {
                    title: '新对话',
                    category: '',
                  },
                  session_id: '111',
                  updated_at: '',
                  user_id: '',
                  uuid: '',
                },
              ]);
            }}
          >
            + 创建新对话
          </Button>
          <Button
            className=" h-[47px] w-[146px] px-3 py-1"
            style={{
              backgroundColor: '#DEDCFC',
              color: '#8C7BF7',
              border: 'none',
            }}
            onClick={() => {
              deleteSessionDelete({ session_id: id });
              setSession(
                sessions.filter((session) => session.session_id !== id)
              );
              getData();
            }}
            icon={<DeleteOutlined />}
          >
            删除对话
          </Button>
        </div>
      </div>
    </div>
  );
}
