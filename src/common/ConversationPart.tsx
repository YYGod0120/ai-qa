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
  // eslint-disable-next-line no-unused-vars
  handleExport: (id: number) => Promise<void>,
  other?: ReactNode,
  time?: string
) {
  return word !== undefined ? (
    identity === 'AI' ? (
      <AI id={id} handleDelete={handleDelete} handleExport={handleExport}>
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
