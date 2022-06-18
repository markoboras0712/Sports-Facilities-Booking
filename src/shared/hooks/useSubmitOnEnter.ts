import { useEffect, useRef } from 'react';

import { useKeyPress } from './useKeyPress';

export function useSubmitOnEnter() {
  const ref = useRef<HTMLButtonElement>(null);
  const enterPressed = useKeyPress('Enter');
  useEffect(() => {
    if (enterPressed) {
      ref.current?.click();
    }
  }, [enterPressed]);

  return ref;
}
