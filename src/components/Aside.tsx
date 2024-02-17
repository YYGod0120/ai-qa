import '@/styles/list_item_fade.css';

import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, List } from 'antd';
import { useState } from 'react';

import edit from '@/aside_icon/edit.png';
import message from '@/aside_icon/message.png';
import top from '@/aside_icon/top.png';
import { useConversationStore } from '@/store';
const DATA = [
  {
    title: '2月10日-重庆-旅行攻略',
  },
  {
    title: '2月10日-重庆-旅行攻略',
  },
  {
    title: '2月10日-重庆-旅行攻略',
  },
  {
    title: '2月10日-重庆-旅行攻略',
  },
];

const classname_noselected =
  'mb-3 h-[65px]  text-xl leading-[65px] flex items-center justify-between px-5 rounded-lg';
const classanme_selected =
  classname_noselected + ' ' + 'border  text-selected mb-3 ';
const iconShapes = 'h-[30px] w-[30px]';
export default function Aside() {
  const [selectedId, setSelectedId] = useState(0);
  const setId = useConversationStore((state) => state.setId);
  const editTitle = useConversationStore((state) => state.editTitle);
  const handleClick = (index: number, title: string) => {
    setId(index);
    editTitle(title);
    setSelectedId(index);
  };
  return (
    <div className="mx-5  mb-[1vh] mt-[3vh] w-[18vw] space-y-5 rounded-2xl border border-solid border-default-border bg-bg-selected">
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
          dataSource={DATA}
          renderItem={(item, index) => (
            <div
              className={
                index === selectedId
                  ? classanme_selected + ' bg-bg-selected' + ' border-selected'
                  : classname_noselected +
                    ' bg-white' +
                    ' border-default-border'
              }
              onClick={() => {
                handleClick(index, item.title);
              }}
            >
              <div className=" flex items-center  space-x-2 ">
                {index === selectedId ? (
                  <img src={message} className={iconShapes} />
                ) : (
                  <></>
                )}
                <span
                  className={
                    index === selectedId ? 'left-to-right-fade ' : '  pl-[38px]'
                  }
                >
                  {item.title}
                </span>
              </div>
              {index === selectedId ? (
                <div className="flex space-x-5">
                  <img
                    src={edit}
                    className="h-[20px] w-[20px]"
                    title={item.title}
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
            icon={<DeleteOutlined />}
          >
            删除对话
          </Button>
        </div>
      </div>
    </div>
  );
}
