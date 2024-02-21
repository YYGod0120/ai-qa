import { ReactNode } from 'react';

import AI from '@/components/AI';
import USER from '@/components/USER';

export function Dialog(
  identity: 'AI' | 'USER',
  word: string,
  id: number,
  other?: ReactNode,
  time?: string
) {
  return word !== undefined ? (
    identity === 'AI' ? (
      <AI id={id}>
        <span>{word}</span>
        {other}
      </AI>
    ) : (
      <USER id={id} time={time}>
        <span>{word}</span>
        {other}
      </USER>
    )
  ) : (
    <></>
  );
}
