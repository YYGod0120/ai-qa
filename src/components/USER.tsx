import '@/styles/triangle.css';

import { ReactNode, useRef } from 'react';

import del from '@/conversation_icon/del.png';
import USER_avator from '@/conversation_icon/USER.png';
import { getCurrentTime } from '@/utils/time';

export default function USER({ children }: { children: ReactNode }) {
  const time = useRef(getCurrentTime());
  return (
    <div className="mr-5 flex items-center justify-end ">
      <div className="flex flex-col items-end ">
        <span className=" mb-3 translate-x-[-25px] self-end text-time-font">
          {time.current}
        </span>

        <div className="  flex translate-x-[20px] translate-y-[-5px]">
          <div className="flex flex-col items-end">
            <span className="max-w-[50vw]  rounded rounded-tr-none bg-user-ask p-3 text-conversation_font">
              {children}
            </span>
            <div className="flex w-[56px] justify-center rounded-[1vw]   border-[1px]  border-border-btns bg-bg-btns px-1 py-1">
              <img
                src={del}
                alt="删除"
                title="删除"
                className="h-[19px] w-[19px]"
              />
            </div>
          </div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 300 300"
            transform="scale(-1, -1)"
          >
            <polygon
              className="triangle_user"
              strokeLinejoin="round"
              points="300,190 200,290 300,290"
            />
          </svg>
        </div>
      </div>
      <img
        src={USER_avator}
        alt=""
        className="h-[57px] w-[57px] rounded-[28.5px]"
      />
    </div>
  );
}
