import { useState } from 'react';

export function TwoFADemo() {
  const [blocked, setBlocked] = useState(false);

  const handleYes = () => setBlocked(false);
  const handleNo = () => setBlocked(true);

  return (
    <div className="twofa-demo">
      <div className="phone-mockup">
        <div className="notification">
          {blocked ? (
            <p style={{ color: '#8bb5c2', padding: '1rem' }}>✅ Cuenta bloqueada. Bien hecho.</p>
          ) : (
            <>
              <span className="app-icon" aria-hidden>🏦</span>
              <div className="notification-content">
                <p className="notif-title">Banco</p>
                <p className="notif-text">Intento de acceso desde Madrid ¿Eres tú?</p>
                <div className="notif-buttons">
                  <button type="button" className="notif-btn yes" onClick={handleYes}>
                    ✅ Sí, soy yo
                  </button>
                  <button type="button" className="notif-btn no" onClick={handleNo}>
                    ❌ No, bloquear
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
