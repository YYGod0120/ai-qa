import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, List } from 'antd';
import { useState } from 'react';

import edit from '@/aside_icon/edit.png';
import edit_select from '@/aside_icon/edit_select.png';
import message from '@/aside_icon/message.png';
import message_select from '@/aside_icon/message_select.png';
import notop from '@/aside_icon/notop.png';
import top from '@/aside_icon/top.png';
import { useConversationStore } from '@/store';

const { Search } = Input;

const DATA = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design ',
  },
  {
    title: 'Ant ',
  },
];

const classname_noselected =
  'mb-3 h-12 bg-white text-center text-xl leading-[3rem] flex items-center justify-between px-3 rounded-sm';
const classanme_selected =
  classname_noselected + ' ' + 'border border-selected text-selected mb-3';
const iconShapes = 'h-[24px] w-[24px]';
export default function Aside() {
  const [selectedId, setSelectedId] = useState(2);
  const setId = useConversationStore((state) => state.setId);
  const editTitle = useConversationStore((state) => state.editTitle);
  const handleClick = (index: number, title: string) => {
    setId(index);
    editTitle(title);
    setSelectedId(index);
  };
  return (
    <div className="  w-[18vw] border border-solid border-default-border">
      <div className=" h-[8vh] bg-white px-5 py-2">
        <Search placeholder="搜索历史记录" />
      </div>
      <div className="flex h-[92vh] cursor-pointer flex-col justify-between bg-default-bg px-3 py-5">
        <List
          itemLayout="horizontal"
          dataSource={DATA}
          renderItem={(item, index) => (
            <div
              className={
                index === selectedId ? classanme_selected : classname_noselected
              }
              onClick={() => {
                handleClick(index, item.title);
              }}
            >
              <div className="flex items-center space-x-2 ">
                <img
                  src={index === selectedId ? edit_select : edit}
                  className={iconShapes}
                  title={item.title}
                />
                <span className="w-[100px] truncate text-start">
                  {item.title}
                </span>
              </div>
              <div className="flex space-x-2">
                <img
                  src={index === selectedId ? message_select : message}
                  className={iconShapes}
                />
                <img src={index === 0 ? top : notop} className={iconShapes} />
              </div>
            </div>
          )}
        />
        <div className="mt-5 flex items-center justify-center space-x-3">
          <Button className="px-3 py-1" type="primary" size="large">
            + 创建新对话
          </Button>
          <Button
            className="px-3 py-1"
            type="primary"
            danger
            icon={<DeleteOutlined />}
          ></Button>
        </div>
      </div>
    </div>
  );
}
