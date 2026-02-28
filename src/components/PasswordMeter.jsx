import { useState, useCallback } from 'react';

const WORDS = ['Gato', 'Perro', 'Cafe', 'Luna', 'Sol', 'Mar', 'Rio', 'Pan', 'Flor', 'Vino'];

function getStrength(value) {
  if (!value.length) return { width: 0, text: 'Comienza a escribir...', hint: '' };
  let s = value.length * 5;
  if (value.length > 12) s += 20;
  if (/[A-Z]/.test(value)) s += 10;
  if (/[0-9]/.test(value)) s += 10;
  if (/[^A-Za-z0-9]/.test(value)) s += 15;
  const width = Math.min(s, 100);
  const text = width < 30 ? 'Débil' : width < 60 ? 'Media' : 'Fuerte';
  return { width, text, hint: '' };
}

export function PasswordMeter() {
  const [password, setPassword] = useState('');
  const strength = getStrength(password);

  const generate = useCallback(() => {
    const w1 = WORDS[Math.floor(Math.random() * 10)];
    const w2 = WORDS[Math.floor(Math.random() * 10)];
    const num = Math.floor(Math.random() * 90 + 10);
    setPassword(`${w1}${w2}${num}!`);
  }, []);

  return (
    <>
      <div className="password-meter">
        <input
          type="text"
          className="password-input"
          placeholder="Escribe tu contraseña para probarla..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="strengthText exampleHint"
          autoComplete="off"
        />
        <div className="strength-meter">
          <div
            className="strength-bar"
            style={{ width: `${strength.width}%` }}
            role="presentation"
          />
        </div>
        <p className="strength-text" id="strengthText">{strength.text}</p>
        {strength.hint && <p className="example-hint" id="exampleHint">{strength.hint}</p>}
      </div>
      <div className="tip-card">
        <p className="example-password">✨ <strong>Frase secreta de ejemplo:</strong> MiPerroMaxComeCroquetas2024!</p>
        <p className="example-password">✨ <strong>Otra opción:</strong> MeGustaElChocolateConLeche#23</p>
        <p className="example-password">✨ <strong>Para trabajo:</strong> Oficina_Madrid_4toPiso_2024$</p>
      </div>
      <button type="button" className="action-btn" onClick={generate}>
        🎲 Generar frase segura
      </button>
    </>
  );
}
