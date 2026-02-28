import { useMemo } from 'react';

const COLS = 28;
const ROWS = 40;

export function MatrixBackground() {
  const grid = useMemo(() => {
    let s = '';
    for (let r = 0; r < ROWS; r++) {
      for (let col = 0; col < COLS; col++) {
        s += `<span class="matrix-digit">${Math.random() > 0.5 ? '0' : '1'}</span>`;
      }
      s += '<br>';
    }
    return s;
  }, []);

  return (
    <div
      className="matrix-bg matrix-theme"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: grid }}
    />
  );
}
