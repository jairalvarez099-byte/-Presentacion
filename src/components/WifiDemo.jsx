import { useState } from 'react';

export function WifiDemo() {
  const [showWarning, setShowWarning] = useState(false);

  const handleDangerClick = () => setShowWarning(true);

  return (
    <div className="wifi-demo">
      <p className="demo-question">¿A cuál te conectarías?</p>
      <div className="wifi-networks">
        <div className="network safe">
          📶 Aeropuerto_Oficial <span className="badge safe-badge">Necesita contraseña</span>
        </div>
        <div
          className="network danger"
          role="button"
          tabIndex={0}
          onClick={handleDangerClick}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDangerClick()}
        >
          📶 WiFi_Gratis_SinContraseña <span className="badge danger-badge">¡PELIGRO!</span>
        </div>
        <div className="network safe">
          📶 Hotel_Hilton <span className="badge safe-badge">Con VPN</span>
        </div>
        <div
          className="network danger"
          role="button"
          tabIndex={0}
          onClick={handleDangerClick}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDangerClick()}
        >
          📶 Free_Internet_Rapido <span className="badge danger-badge">Hacker esperando</span>
        </div>
      </div>
      {showWarning && (
        <div className="warning-message" style={{ display: 'block' }} role="alert">
          ⚠️ El hacker te ve, tú no lo ves
        </div>
      )}
    </div>
  );
}
