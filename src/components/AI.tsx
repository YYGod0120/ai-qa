import '@/styles/triangle.css';

import { ReactNode } from 'react';

import ai_avator from '@/conversation_icon/ai_avator.png';
export default function AI({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start">
      <img
        src={ai_avator}
        alt=""
        className="h-[57px] w-[57px] rounded-[28.5px]"
      />
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
        <span className="max-w-[55vw] rounded rounded-tl-none bg-bg-selected p-3 text-conversation_font">
          {children}
        </span>
      </div>
    </div>
  );
}
