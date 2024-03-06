import '@/styles/list_item_fade.css';

import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, List } from 'antd';
import { useEffect, useState } from 'react';

import edit from '@/aside_icon/edit.png';
import message from '@/aside_icon/message.png';
import top from '@/aside_icon/top.png';
import {
  deleteSessionDelete,
  getSessionGet,
  putSessionTitle,
} from '@/service/session';
import { useConversationStore } from '@/store';
import { SessionGetResDatum } from '@/types/session';
const classname_noselected =
  'mb-3 h-[65px]  text-xl leading-[65px] flex items-center justify-between px-5 rounded-lg';
const classname_selected =
  classname_noselected + ' ' + 'border  text-selected mb-3 ';
const iconShapes = 'h-[30px] w-[30px]';
export default function Aside({
  handleChooseIdentity,
}: {
  handleChooseIdentity: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedId, setSelectedId] = useState('');
  const [session, setSession] = useState<SessionGetResDatum[]>([]);
  const [editingId, setEditingId] = useState(-1);
  const title = useConversationStore((state) => state.title);
  const id = useConversationStore((state) => state.id);
  const setId = useConversationStore((state) => state.setId);
  const editTitle = useConversationStore((state) => state.editTitle);
  const setIdentity = useConversationStore((state) => state.setIdentity);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
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
    setSession(newSession);
  }
  useEffect(() => {
    getData();
  }, []);
  const handleClick = (index: string, title: string) => {
    setId(index);
    editTitle(title);
    setSelectedId(index);
    setConversation([
      {
        AI: '您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色',
      },
    ]);
  };
  return (
    <div className="mx-5  mb-[1vh] mt-[3vh] w-aside space-y-5 rounded-2xl border border-solid border-default-border bg-bg-selected">
      <div className=" h-[8vh]  px-5 pt-5">
        <Input
          className="rounded-xl bg-white"
          placeholder="搜索历史记录"
          addonBefore={<SearchOutlined></SearchOutlined>}
        />
      </div>

      <div className="flex h-[85vh] cursor-pointer flex-col justify-between bg-bg-selected px-3 pb-5">
        <List
          itemLayout="horizontal"
          dataSource={session}
          renderItem={(item, index) => (
            <div
              className={
                item.session_id === selectedId
                  ? classname_selected + ' bg-bg-selected' + ' border-selected'
                  : classname_noselected +
                    ' bg-white' +
                    ' border-default-border'
              }
              onClick={() => {
                // TODO uuid改为title
                handleClick(item.session_id, item.metadata.title);
                setIdentity(item.metadata.category);
                setEditingId(-1);
                if (item.metadata.category === '') {
                  handleChooseIdentity(false);
                } else {
                  handleChooseIdentity(true);
                }
              }}
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
                        : 'overflow-hidden text-nowrap pl-[38px] w-[250px]'
                    }
                  >
                    {item.metadata.title}
                  </span>
                )}
              </div>
              {item.session_id === selectedId ? (
                <div className="flex space-x-5">
                  <img
                    src={edit}
                    className="h-[20px] w-[20px]"
                    title={item.metadata.title}
                    onClick={(e) => {
                      setEditingId(index === editingId ? -1 : index);
                      if (index === editingId) {
                        // TODO 本地修改title
                        putSessionTitle({
                          session_id: item.session_id,
                          title: title,
                        });
                        getData();
                      }
                      e.stopPropagation();
                    }}
                  />
                  <img src={top} className="h-[20px] w-[20px]" />
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
              // handleChooseIdentity(false);
              setSession([
                ...session,
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
