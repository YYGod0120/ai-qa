import { ReactNode } from 'react';
import Typist from 'react-typist';

import AI from '@/components/AI';
import USER from '@/components/USER';
import { AI as AIType } from '@/store';

export function Dialog(
  identity: 'AI' | 'USER',
  word: string | AIType,
  id: number,

  handleDelete: (
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
  )[],
  // eslint-disable-next-line no-unused-vars
  handleExport: (id: number) => Promise<void>,
  handleOverTaking: any,
  other?: ReactNode,
  time?: string
) {
  return word !== undefined ? (
    identity === 'AI' ? (
      <AI
        id={id}
        handleDelete={handleDelete}
        handleExport={handleExport}
        time={time}
      >
        <div className="">
          {(word as AIType).map((item) => {
            return item.isChatting ? (
              <Typist
                avgTypingDelay={70}
                cursor={{ show: false }}
                key={item.answer}
                onTypingDone={() => {
                  handleOverTaking(false);
                }}
                className="inline"
              >
                <span>{item.answer}</span>
              </Typist>
            ) : (
              <span>{item.answer || '等待时间过久，请重新问答'}</span>
            );
          })}
        </div>
        {other}
      </AI>
    ) : (
      <USER id={id} time={time} handleDelete={handleDelete}>
        <span>{word as string}</span>
        {other}
      </USER>
    )
  ) : (
    <AI
      id={id}
      handleDelete={handleDelete}
      handleExport={handleExport}
      time={time}
    >
      <div className="">回答错误，请刷新重试</div>
    </AI>
  );
}
