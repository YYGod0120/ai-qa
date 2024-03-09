import '@/styles/triangle.css';

import { ReactNode } from 'react';

import again from '@/conversation_icon/again.png';
import ai_avator from '@/conversation_icon/ai_avator.png';
import del from '@/conversation_icon/del.png';
import transToWord from '@/conversation_icon/transToWord.png';

export default function AI({
  children,
  handleDelete,
  handleExport,
  id,
  time,
}: {
  children: ReactNode;
  id: number;
  time?: string;
  handleDelete: React.Dispatch<React.SetStateAction<string | number>>[];
  // eslint-disable-next-line no-unused-vars
  handleExport: (id: number) => Promise<void>;
}) {
  const [setDelTitle, setDeleteId] = handleDelete;
  return (
    <div className="flex items-start">
      <img
        src={ai_avator}
        alt=""
        className="h-[57px] w-[57px] rounded-[28.5px] translate-y-[50%]"
      />
      <div className="flex flex-col items-end ">
        <span className=" mb-3 translate-x-[25px] self-start text-time-font">
          {time}
        </span>
        <div className=" flex translate-x-[-20px] translate-y-1 ">
          <svg
            width="50"
            height="50"
            viewBox="0 0 300 300"
            transform="scale(1, -1)"
          >
            <polygon
              className="triangle"
              strokeLinejoin="round"
              points="300,190 200,290 300,290"
            />
          </svg>
          <div className="flex flex-col">
            <span className="max-w-[55vw] rounded rounded-tl-none bg-bg-selected p-3 text-conversation_font">
              {children}
            </span>
            <div className="flex w-[116px] items-center justify-between space-x-2 rounded-[1vw] border-[1px] border-border-btns bg-bg-btns px-4 py-1">
              <img
                src={again}
                alt="重试"
                title="重试"
                className="h-[22px] w-[18px]"
              />
              <img
                src={transToWord}
                title="导出为Word"
                alt="导出为Word"
                className="h-[17px] w-[17px]"
                onClick={() => {
                  handleExport(id);
                }}
              />
              <img
                src={del}
                alt="删除"
                title="删除"
                className="h-[19px] w-[19px]"
                onClick={() => {
                  setDelTitle('确认删除本对话？');
                  setDeleteId(id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
