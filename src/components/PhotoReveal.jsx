import { useState } from 'react';

const OVERLAY_ITEMS = [
  '📍 Calle visible por la ventana',
  '🏫 Colegio en la mochila',
  '🚗 Matrícula del coche',
  '🐕 Nombre de la mascota (posible contraseña)',
];

export function PhotoReveal() {
  const [show, setShow] = useState(false);

  return (
    <div className="photo-analysis">
      <div className="photo-card">
        <img
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400"
          alt="Familia en casa"
          className="demo-photo"
        />
        <div className={`photo-overlay ${show ? 'show' : ''}`}>
          {OVERLAY_ITEMS.map((item) => (
            <span key={item} className="overlay-item">{item}</span>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="reveal-btn"
        onClick={() => setShow((v) => !v)}
        aria-expanded={show}
        aria-controls="photo-overlay-content"
      >
        🔍 ¿Qué información regalas?
      </button>
    </div>
  );
}
