import { ReactNode } from 'react';

import AI from '@/components/AI';
import USER from '@/components/USER';

export function Dialog(
  identity: 'AI' | 'USER',
  word: string,
  other?: ReactNode
) {
  return identity === 'AI' ? (
    <AI>
      <span>{word}</span>
      {other}
    </AI>
  ) : (
    <USER>
      <span>{word}</span>
      {other}
    </USER>
  );
}
