import { useEffect, useRef, useState, useCallback } from 'react';
import { MatrixBackground } from './components/MatrixBackground';
import { ProgressBar } from './components/ProgressBar';
import { MagicDemo } from './components/MagicDemo';
import { PasswordMeter } from './components/PasswordMeter';
import { TwoFADemo } from './components/TwoFADemo';
import { PhotoReveal } from './components/PhotoReveal';
import { WifiDemo } from './components/WifiDemo';

function Slide({ active, children, id }) {
  return (
    <section
      className={`slide ${active ? 'active' : ''}`}
      id={id}
      aria-hidden={!active}
    >
      <div className="slide-content">{children}</div>
    </section>
  );
}

export default function App() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalSlides = 10;

  useEffect(() => {
    document.body.classList.add('cyber-theme', 'matrix-theme');
    return () => {
      document.body.classList.remove('cyber-theme', 'matrix-theme');
    };
  }, []);

  const updateProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight } = el;
    const vh = window.innerHeight;
    const maxScroll = scrollHeight - vh;
    setProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
    const index = Math.round(scrollTop / vh);
    setCurrentIndex(Math.min(index, totalSlides - 1));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener('scroll', updateProgress, { passive: true });
    return () => el.removeEventListener('scroll', updateProgress);
  }, [updateProgress]);

  const goTo = (index) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
      <MatrixBackground />
      <ProgressBar progress={progress} />

      <nav className="navigation" aria-label="Navegación por diapositivas">
        <button
          type="button"
          className="nav-btn"
          disabled={currentIndex === 0}
          onClick={() => goTo(currentIndex - 1)}
          aria-label="Diapositiva anterior"
        >
          ←
        </button>
        <span className="slide-indicator" aria-live="polite">
          {currentIndex + 1} / {totalSlides}
        </span>
        <button
          type="button"
          className="nav-btn"
          disabled={currentIndex >= totalSlides - 1}
          onClick={() => goTo(currentIndex + 1)}
          aria-label="Diapositiva siguiente"
        >
          →
        </button>
      </nav>

      <div
        ref={containerRef}
        className="slides-container"
        role="main"
        aria-label="Presentación Ciberseguridad"
      >
        <Slide active={currentIndex === 0} id="slide1">
          <div className="title-animation">
            <h1 className="title-hero">CIBERSEGURIDAD</h1>
          </div>
          <h2 className="subtitle">
            El arte de cuidarte de <span className="highlight">alguien que no ves</span>
          </h2>
          <p className="presenter">Pero que siempre está ahí</p>
          <div className="example-badge">
            <span className="example-icon">📊</span>
            <span className="example-text">+4.000 millones de registros filtrados en 2025</span>
          </div>
          <div className="scroll-hint">
            <span>↓ Desliza para comenzar ↓</span>
          </div>
        </Slide>

        <Slide active={currentIndex === 1} id="slide2">
          <div className="emoji-container">🎭</div>
          <h2>El <span className="gradient-text">Mago Invisible</span></h2>
          <div className="real-example">
            <div className="example-header">
              <span className="example-label">📰 CASO REAL</span>
              <span className="example-year">2020</span>
            </div>
            <p className="example-title"><strong>El hackeo a Twitter:</strong> 130 cuentas verificadas</p>
            <div className="example-details">
              <p>🔸 <strong>Víctimas:</strong> Barack Obama, Elon Musk, Bill Gates</p>
              <p>🔸 <strong>El truco:</strong> Llamada telefónica falsa a empleados</p>
              <p>🔸 <strong>El daño:</strong> Estafa de Bitcoin por <strong>$120,000</strong></p>
            </div>
            <div className="example-lesson">
              <span className="lesson-icon">💡</span>
              <span className="lesson-text"><strong>Lección:</strong> No hicieron falta supercomputadoras, solo <strong>una llamada</strong></span>
            </div>
          </div>
          <div className="stats-card">
            <div className="stat">
              <span className="stat-number">43%</span>
              <span className="stat-label">de ataques van contra individuos</span>
            </div>
          </div>
          <MagicDemo />
        </Slide>

        <Slide active={currentIndex === 2} id="slide3">
          <div className="icon-pulse">📧</div>
          <h2>PELIGRO INVISIBLE #1</h2>
          <h3 className="danger-title">PHISHING</h3>
          <div className="examples-grid">
            <div className="example-card">
              <div className="example-icon">🏦</div>
              <h4>Ejemplo 1: Tu &quot;banco&quot; te escribe</h4>
              <div className="email-card fake">
                <div className="email-header">
                  <span className="sender">Banco Santander</span>
                  <span className="urgency">⚠️ URGENTE</span>
                </div>
                <p className="email-subject">Tu cuenta será bloqueada en 24 horas</p>
                <p className="email-body">&quot;Haz clic aquí para verificar: <span className="fake-link">bancosantander.verifica-seguridad.com</span>&quot;</p>
              </div>
              <p className="example-reality">🔍 <strong>La realidad:</strong> El banco NUNCA pide datos por email</p>
            </div>
            <div className="example-card">
              <div className="example-icon">📦</div>
              <h4>Ejemplo 2: El paquete &quot;perdido&quot;</h4>
              <div className="email-card fake">
                <div className="email-header">
                  <span className="sender">Correos Express</span>
                  <span className="urgency">📦 ENTREGA</span>
                </div>
                <p className="email-subject">Tu paquete está retenido en aduanas</p>
                <p className="email-body">&quot;Paga 2€ para liberarlo: <span className="fake-link">correos.pago-online.com</span>&quot;</p>
              </div>
              <p className="example-reality">🔍 <strong>La realidad:</strong> Pagas 2€ y te vacían la cuenta</p>
            </div>
            <div className="example-card">
              <div className="example-icon">📱</div>
              <h4>Ejemplo 3: El SMS del &quot;banco&quot;</h4>
              <div className="sms-card">
                <div className="sms-header">
                  <span className="sms-sender">CaixaBank</span>
                  <span className="sms-time">Ahora</span>
                </div>
                <p className="sms-body">&quot;Se ha detectado un acceso sospechoso. Confirma tu identidad: https://cai.xa.bank/verificar&quot;</p>
              </div>
              <p className="example-reality">🔍 <strong>La realidad:</strong> El enlace es falso (fíjate: cai.xa.bank no es caixabank.es)</p>
            </div>
          </div>
          <div className="tip-card">
            <p>⚠️ <strong>Los 3 errores que delatan un phishing:</strong></p>
            <ul className="tip-list">
              <li>1️⃣ Te genera URGENCIA (tiempo límite)</li>
              <li>2️⃣ El enlace NO coincide con la web oficial</li>
              <li>3️⃣ Te pide datos personales o dinero</li>
            </ul>
          </div>
        </Slide>

        <Slide active={currentIndex === 3} id="slide4">
          <div className="icon-pulse">🔐</div>
          <h2>PELIGRO INVISIBLE #2</h2>
          <h3 className="danger-title">CONTRASEÑAS DÉBILES</h3>
          <div className="real-example">
            <div className="example-header">
              <span className="example-label">⏱️ TIEMPO DE HACKEO</span>
            </div>
            <div className="hacking-times">
              <div className="time-item">
                <span className="password-example">&quot;123456&quot;</span>
                <span className="time-result red">1 segundo</span>
              </div>
              <div className="time-item">
                <span className="password-example">&quot;contraseña&quot;</span>
                <span className="time-result red">1 minuto</span>
              </div>
              <div className="time-item">
                <span className="password-example">&quot;MiPerroMax2024&quot;</span>
                <span className="time-result yellow">3 años</span>
              </div>
              <div className="time-item">
                <span className="password-example">&quot;MiPerroMaxComeCroquetas2024!&quot;</span>
                <span className="time-result green">+100 años</span>
              </div>
            </div>
          </div>
          <div className="example-card breach-example">
            <div className="example-icon">💥</div>
            <h4>CASO REAL: Filtración de LinkedIn (2021)</h4>
            <p className="breach-detail"><strong>700 millones</strong> de usuarios expuestos</p>
            <p className="breach-detail">🔸 El 80% usaba la misma contraseña en otras webs</p>
            <p className="breach-detail">🔸 Hackers probaron esas claves en bancos y emails</p>
          </div>
          <PasswordMeter />
        </Slide>

        <Slide active={currentIndex === 4} id="slide5">
          <div className="icon-pulse">📱</div>
          <h2>SUPERPODER DIGITAL</h2>
          <h3 className="success-title">2FA: Doble Factor</h3>
          <div className="real-example">
            <div className="example-header">
              <span className="example-label">🛡️ EJEMPLO REAL</span>
            </div>
            <div className="story-example">
              <p className="story-title"><strong>La historia de Marta:</strong></p>
              <p className="story-text">Marta usaba &quot;123456&quot; en Instagram. Un hacker consiguió su clave.</p>
              <div className="story-comparison">
                <div className="without-2fa">
                  <span className="story-badge bad">❌ Sin 2FA</span>
                  <p>Hacker entró directo y publicó estafas.</p>
                </div>
                <div className="with-2fa">
                  <span className="story-badge good">✅ Con 2FA</span>
                  <p>Hacker necesitaba también su móvil → BLOQUEADO</p>
                </div>
              </div>
            </div>
          </div>
          <div className="example-card">
            <div className="example-icon">🐦</div>
            <h4>El CEO de Twitter perdió su cuenta</h4>
            <p>🔸 Jack Dorsey fue hackeado en 2019</p>
            <p>🔸 <strong>¿Por qué?</strong> No tenía 2FA en su número de teléfono</p>
            <p>🔸 Hackers cambiaron su SIM y publicaron tweets racistas</p>
          </div>
          <TwoFADemo />
          <p className="tip">✅ Actívalo YA en: Gmail • WhatsApp • Banco • Instagram</p>
        </Slide>

        <Slide active={currentIndex === 5} id="slide6">
          <div className="icon-pulse">📸</div>
          <h2>PELIGRO INVISIBLE #3</h2>
          <h3 className="danger-title">REDES SOCIALES</h3>
          <div className="examples-grid">
            <div className="example-card">
              <div className="example-icon">🏠</div>
              <h4>Ejemplo 1: Las vacaciones</h4>
              <p className="example-scenario">&quot;Me voy una semana a la playa 🏖️&quot;</p>
              <p className="example-consequence">⚠️ Traducción: &quot;Mi casa está vacía, pueden robarme&quot;</p>
              <p className="example-real">🔸 <strong>Caso real:</strong> Banda de ladrones en 2019 siguió a 50 familias por Instagram</p>
            </div>
            <div className="example-card">
              <div className="example-icon">👧</div>
              <h4>Ejemplo 2: Los hijos</h4>
              <p className="example-scenario">&quot;Mi hija empieza el cole en el San Patricio 🎒&quot;</p>
              <p className="example-consequence">⚠️ Ya saben dónde estudia, dónde esperarla</p>
              <p className="example-real">🔸 <strong>Alerta policial:</strong> No publiques uniformes ni nombres de colegios</p>
            </div>
            <div className="example-card">
              <div className="example-icon">🚗</div>
              <h4>Ejemplo 3: El coche nuevo</h4>
              <p className="example-scenario">&quot;Mi nuevo Audi, matrícula 1234ABC 😎&quot;</p>
              <p className="example-consequence">⚠️ Con la matrícula sacan tu DNI, teléfono y dirección</p>
              <p className="example-real">🔸 <strong>Dato:</strong> Por 1€ en internet consiguen tu domicilio con la matrícula</p>
            </div>
          </div>
          <PhotoReveal />
        </Slide>

        <Slide active={currentIndex === 6} id="slide7">
          <div className="icon-pulse">📡</div>
          <h2>PELIGRO INVISIBLE #4</h2>
          <h3 className="danger-title">WI-FI PÚBLICO</h3>
          <div className="real-example">
            <div className="example-header">
              <span className="example-label">🎭 ATAQUE REAL: &quot;El gemelo malvado&quot;</span>
            </div>
            <div className="story-example">
              <p className="story-text"><strong>Escenario:</strong> Estás en un Starbucks. Ves dos redes:</p>
              <div className="network-comparison">
                <div className="network-safe">
                  <span className="network-name">📶 Starbucks_WiFi</span>
                  <span className="network-status">(la oficial)</span>
                </div>
                <div className="network-danger">
                  <span className="network-name">📶 Starbucks_Free</span>
                  <span className="network-status">⚠️ LA TRAMPA</span>
                </div>
              </div>
              <p className="story-text mt-2">El hacker creó una red con nombre similar. 15 personas se conectaron y <strong>entregaron sus datos</strong> sin saberlo.</p>
            </div>
          </div>
          <div className="example-card">
            <div className="example-icon">👁️</div>
            <h4>En un Wi-Fi público sin VPN, el hacker ve:</h4>
            <ul className="hacker-view">
              <li>🔸 Tus contraseñas (si la web no tiene HTTPS)</li>
              <li>🔸 Los mensajes que envías</li>
              <li>🔸 Las fotos que subes</li>
              <li>🔸 Los números de tarjeta que introduces</li>
            </ul>
          </div>
          <WifiDemo />
          <div className="tip-card">
            <p className="tip-title">💡 SOLUCIÓN ECONÓMICA</p>
            <p className="tip-text">Una VPN cuesta <strong>menos de 3€/mes</strong> (NordVPN, Surfshark)</p>
            <p className="tip-text">O usa tus datos móviles: 4G/5G son más seguros</p>
          </div>
        </Slide>

        <Slide active={currentIndex === 7} id="slideOsint">
          <div className="icon-pulse">🔍</div>
          <h2>INTELIGENCIA ABIERTA</h2>
          <h3 className="success-title">OSINT: Open Source Intelligence</h3>
          <p className="osint-def">Información obtenida de <strong>fuentes públicas</strong>: redes sociales, registros, foros, dominios, metadatos. Usado por investigadores, periodistas, equipos de ciberseguridad y, también, por atacantes.</p>
          <div className="real-example">
            <div className="example-header">
              <span className="example-label">📐 MODELO OSINT (Ciclo)</span>
            </div>
            <div className="osint-cycle">
              <div className="cycle-step"><span className="step-num">1</span> Dirección</div>
              <span className="cycle-arrow">→</span>
              <div className="cycle-step"><span className="step-num">2</span> Recolección</div>
              <span className="cycle-arrow">→</span>
              <div className="cycle-step"><span className="step-num">3</span> Procesamiento</div>
              <span className="cycle-arrow">→</span>
              <div className="cycle-step"><span className="step-num">4</span> Análisis</div>
              <span className="cycle-arrow">→</span>
              <div className="cycle-step"><span className="step-num">5</span> Difusión</div>
            </div>
            <ul className="tip-list text-left">
              <li><strong>Dirección:</strong> Definir qué necesitas saber (objetivo, preguntas).</li>
              <li><strong>Recolección:</strong> Recopilar datos de fuentes abiertas (web, redes, DNS, etc.).</li>
              <li><strong>Procesamiento:</strong> Limpiar, normalizar y estructurar la información.</li>
              <li><strong>Análisis:</strong> Extraer conclusiones y patrones.</li>
              <li><strong>Difusión:</strong> Presentar resultados (informe, mapa, dashboard).</li>
            </ul>
          </div>
          <h4 className="tools-section-title">🛠️ HERRAMIENTAS OSINT</h4>
          <div className="examples-grid osint-tools-grid">
            {[
              { icon: '🔗', name: 'Maltego', desc: 'Visualización de relaciones entre entidades (personas, dominios, emails, IPs). Ideal para mapear conexiones y enlazar datos.' },
              { icon: '📧', name: 'theHarvester', desc: 'Recopila correos, subdominios, hosts y nombres a partir de un dominio. Fuentes: Google, Bing, LinkedIn, etc.' },
              { icon: '🌐', name: 'Shodan', desc: 'Buscador de dispositivos conectados a internet (servidores, cámaras, IoT). Útil para ver exposición de activos.' },
              { icon: '🕷️', name: 'SpiderFoot', desc: 'Automatiza la recolección: DNS, whois, redes sociales, vulnerabilidades. Genera informes de huella digital.' },
              { icon: '⚙️', name: 'Recon-ng', desc: 'Framework en terminal con módulos para dominios, correos, perfiles y búsquedas en fuentes abiertas.' },
              { icon: '🔎', name: 'Google Dorks', desc: 'Búsquedas avanzadas con operadores (site:, filetype:, inurl:) para encontrar información expuesta por error.' },
            ].map((tool) => (
              <div key={tool.name} className="example-card">
                <div className="example-icon">{tool.icon}</div>
                <h4>{tool.name}</h4>
                <p className="tool-desc">{tool.desc}</p>
              </div>
            ))}
          </div>
          <div className="tip-card">
            <p>💡 <strong>Uso ético:</strong> OSINT debe usarse en contextos legales (investigación, pentesting autorizado, periodismo). Revisa la ley y las condiciones de uso de cada fuente.</p>
          </div>
        </Slide>

        <Slide active={currentIndex === 8} id="slide8">
          <div className="icon-pulse">🧠</div>
          <h2>EL MITO MÁS PELIGROSO</h2>
          <h3 className="danger-title">&quot;A MÍ NO ME VA A PASAR&quot;</h3>
          <div className="real-example">
            <div className="example-header">
              <span className="example-label">😔 VÍCTIMAS COMO TÚ</span>
            </div>
            <div className="victim-story">
              <p className="victim-name">Ana, 34 años, profesora</p>
              <p className="victim-text">🔸 Compró en una web falsa de ropa</p>
              <p className="victim-text">🔸 Perdió <strong>450€</strong> y le vaciaron la cuenta</p>
              <p className="victim-lesson">💡 &quot;Pensé que solo pasaba en las películas&quot;</p>
            </div>
            <div className="victim-story">
              <p className="victim-name">Carlos, 28 años, informático</p>
              <p className="victim-text">🔸 Usaba la misma clave para todo</p>
              <p className="victim-text">🔸 Hackearon su email y de ahí su banco</p>
              <p className="victim-lesson">💡 &quot;Y eso que trabajo con ordenadores...&quot;</p>
            </div>
            <div className="victim-story">
              <p className="victim-name">Marta, 52 años, ama de casa</p>
              <p className="victim-text">🔸 Le llegó un SMS de &quot;Su paquete está retenido&quot;</p>
              <p className="victim-text">🔸 Pagó 1.50€ y le robaron 3.000€</p>
              <p className="victim-lesson">💡 &quot;El mensaje parecía de verdad&quot;</p>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-big">
              <span className="big-number">90%</span>
              <span className="big-label">de ataques empiezan por <strong>error humano</strong></span>
            </div>
            <div className="stat-big">
              <span className="big-number">1</span>
              <span className="big-label">clic puede costarte <strong>todo</strong></span>
            </div>
          </div>
          <div className="tip-card urgent">
            <p className="urgent-message">🚨 Si piensas &quot;a mí no me pasa&quot;, ya eres el objetivo perfecto</p>
          </div>
        </Slide>

        <Slide active={currentIndex === 9} id="slide9">
          <h2>🚀 TUS PRÓXIMOS 5 MINUTOS</h2>
          <div className="success-story">
            <div className="success-icon">🏆</div>
            <p className="success-text"><strong>Pedro siguió estos pasos y evitó una estafa:</strong></p>
            <p className="success-detail">Recibió un SMS de &quot;Banco&quot;. Como tenía 2FA, el hacker no pudo entrar. Revisó el enlace y era falso. Lo borró.</p>
          </div>
          <div className="checklist">
            {[
              { id: 'task1', label: '📧 Revisar correos sospechosos (como los ejemplos)', hint: 'Ej: ¿Tienes algún "Netflix" pidiendo datos?' },
              { id: 'task2', label: '🔐 Activar 2FA en el banco', hint: 'Ej: BBVA, Santander, CaixaBank: en Ajustes de seguridad' },
              { id: 'task3', label: '🔑 Cambiar contraseña por frase', hint: 'Ej: "MiHijoJuegaAlFutbol2024!"' },
              { id: 'task4', label: '📱 Revisar privacidad en redes', hint: 'Ej: Instagram → Configuración → Privacidad → "Solo amigos"' },
              { id: 'task5', label: '📡 Borrar redes WiFi guardadas', hint: 'Ej: Esas "WiFi gratis" del aeropuerto de hace 2 años' },
            ].map((item) => (
              <div key={item.id} className="checklist-item">
                <input type="checkbox" id={item.id} />
                <label htmlFor={item.id}>{item.label}</label>
                <span className="check-hint">{item.hint}</span>
              </div>
            ))}
          </div>
          <div className="final-message">
            <p className="quote">&quot;En internet, lo más caro que puedes pagar es la <strong>confianza mal puesta</strong>&quot;</p>
            <p className="subquote">Si no lo ves, no confíes sin verificar</p>
            <div className="remember-example">
              <p className="remember-title">📌 RECUERDA ESTE EJEMPLO:</p>
              <p className="remember-text">
                Si alguien toca a tu puerta diciendo que es de &quot;Movistar&quot; y pide entrar, ¿le abres?<br />
                <strong>Pues online es igual: no abras la puerta a extraños.</strong>
              </p>
            </div>
          </div>
        </Slide>
      </div>
    </>
  );
}
