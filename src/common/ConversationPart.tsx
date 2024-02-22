import { ReactNode } from 'react';

import AI from '@/components/AI';
import USER from '@/components/USER';

export function Dialog(
  identity: 'AI' | 'USER',
  word: string,
  id: number,
  handleDelete: (
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
  )[],
  other?: ReactNode,
  time?: string
) {
  return word !== undefined ? (
    identity === 'AI' ? (
      <AI id={id} handleDelete={handleDelete}>
        <span>{word}</span>
        {other}
      </AI>
    ) : (
      <USER id={id} time={time} handleDelete={handleDelete}>
        <span>{word}</span>
        {other}
      </USER>
    )
  ) : (
    <></>
  );
}
