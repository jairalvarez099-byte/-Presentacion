import { useState } from 'react';

export function MagicDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="interactive-demo">
      <p>Haz clic en el sombrero 🎩</p>
      <div
        className="hat-container"
        role="button"
        tabIndex={0}
        onClick={() => setShow(true)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShow(true)}
        aria-label="Revelar mensaje al hacer clic"
      >
        <span className="hat" aria-hidden>🎩</span>
        <span className={`hidden-message ${show ? 'show' : ''}`}>
          ¡Así de fácil acceden a tus datos!
        </span>
      </div>
    </div>
  );
}
