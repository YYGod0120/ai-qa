import '@/styles/triangle.css';

import { ReactNode } from 'react';

import USER_avator from '@/conversation_icon/USER.png';

export default function USER({ children }: { children: ReactNode }) {
  return (
    <div className="mr-5 flex items-start justify-end">
      <div className=" flex translate-x-[20px] translate-y-1 ">
        <span className="max-w-[50vw]  rounded rounded-tr-none bg-bg-selected p-3 text-conversation_font">
          {children}
        </span>
        <svg
          width="50"
          height="50"
          viewBox="0 0 300 300"
          transform="scale(-1, -1)"
        >
          <polygon
            className="triangle"
            strokeLinejoin="round"
            points="300,190 200,290 300,290"
          />
        </svg>
      </div>
      <img
        src={USER_avator}
        alt=""
        className="h-[57px] w-[57px] rounded-[28.5px]"
      />
    </div>
  );
}
