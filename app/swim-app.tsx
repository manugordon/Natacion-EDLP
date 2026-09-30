'use client';
import { useEffect, useRef, useState } from 'react';
import { athletes, type Athlete, type SwimEvent } from './athletes';
const storageKey = 'edelp-following-v1';
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const initials = (name: string) => `${name.split(' ')[0][0]}${name.split(' ').at(-1)?.[0]}`;
const eventKey = (event: SwimEvent) => `${event.distance}-${event.stroke}`;
export default function SwimApp() {
  const [following, setFollowing] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [route, setRoute] = useState('');
  const [notice, setNotice] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const didNavigate = useRef(false);
  useEffect(() => {
    try { const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(saved)) setFollowing(saved.filter((id): id is string => typeof id === 'string' && athletes.some(a => a.id === id))); } catch { /* Browsers may disable local storage. */ }
    const sync = () => { try { setRoute(decodeURIComponent(location.hash.slice(1))); } catch { setRoute(''); } };
    sync(); window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => { if (didNavigate.current) { window.scrollTo(0, 0); heading.current?.focus({ preventScroll: true }); } didNavigate.current = true; }, [route]);
  const athlete = athletes.find(a => route === a.id);
  const eventRoute = route.startsWith('prueba/');
  const selectedEvent = eventRoute ? athletes.flatMap(a => a.events).find(e => eventKey(e) === route.slice(7)) : undefined;
  const favoritesOnly = route === 'mis-nadadores';
  const known = !route || route === 'equipo' || favoritesOnly || !!athlete || !!selectedEvent;
  const filtered = athletes.filter(a => (!favoritesOnly || following.includes(a.id)) && normalize(a.name).includes(normalize(query.trim())));
  const toggle = (a: Athlete) => {
    const next = following.includes(a.id) ? following.filter(id => id !== a.id) : [...following, a.id];
    setFollowing(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setNotice(next.includes(a.id) ? `Ahora seguís a ${a.name}.` : `Dejaste de seguir a ${a.name}.`); }
    catch { setNotice('Tu selección se conserva mientras esté abierta la página. Este navegador no permite guardarla.'); }
  };
  const followButton = (a: Athlete) => <button className={`follow ${following.includes(a.id) ? 'is-following' : ''}`} aria-pressed={following.includes(a.id)} aria-label={`${following.includes(a.id) ? 'Dejar de seguir a' : 'Seguir a'} ${a.name}`} onClick={() => toggle(a)}><span aria-hidden="true">{following.includes(a.id) ? '♥' : '♡'}</span> {following.includes(a.id) ? 'Siguiendo' : 'Seguir'}</button>;
  const card = (a: Athlete) => <article className="athlete-card" key={a.id}>
    <div className="card-top"><div className="avatar" aria-hidden="true">{initials(a.name)}</div>{followButton(a)}</div>
    <h3><a className="card-main-link" href={`#${a.id}`}>{a.name}</a></h3>
    <p className="athlete-meta">{a.age} años <span>·</span> Categoría {a.category}</p>
    <div className="card-bottom"><span>{a.events.length} pruebas</span><span className="view-label">Ver pruebas <span aria-hidden="true">→</span></span></div>
  </article>;
  return <>
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <header><div className="header-inner"><a className="brand" href="#equipo" aria-label="Natación Estudiantes, volver al equipo"><img src="/escudo-edlp.webp" alt="Escudo de Estudiantes de La Plata" width="37" height="60"/><span>ESTUDIANTES DE LA PLATA<strong>Natación Masters</strong></span></a><nav aria-label="Navegación principal"><a href="#equipo" className={!favoritesOnly ? 'active' : ''} aria-current={!athlete && !eventRoute && !favoritesOnly ? 'page' : undefined}>El equipo</a><a href="#mis-nadadores" className={favoritesOnly ? 'active' : ''} aria-current={favoritesOnly ? 'page' : undefined}><span aria-hidden="true">♡ </span>Mis nadadores <b>{following.length}</b></a></nav></div></header>
    <main id="contenido">
      {athlete ? <section className="detail"><a className="back" href="#equipo">← Volver al equipo</a><div className="profile-heading"><div className="profile-avatar avatar" aria-hidden="true">{initials(athlete.name)}</div><div><p className="eyebrow">NATACIÓN · ESTUDIANTES DE LA PLATA</p><h1 ref={heading} tabIndex={-1}>{athlete.name}</h1><p className="profile-meta">EDELP <span>·</span> {athlete.age} años <span>·</span> Categoría {athlete.category}</p></div>{followButton(athlete)}</div><div className="section-title"><h2>Sus pruebas</h2><span className="count">{athlete.events.length} inscripciones</span></div><p className="info-note"><span aria-hidden="true">ⓘ</span> Estos son tiempos de inscripción, no resultados de carrera.</p><div className="event-grid">{athlete.events.map(e => <article className="event-card" key={e.eventNumber}><div className="event-top"><span className="stroke">{e.stroke}</span><span>Evento #{e.eventNumber}</span></div><h3><a href={`#prueba/${encodeURIComponent(eventKey(e))}`}>{e.distance} m {e.stroke} <span aria-hidden="true">↗</span></a></h3><div className="seed"><span>Tiempo de inscripción</span><strong>{e.seedTime}</strong></div><a className="event-link" href={`#prueba/${encodeURIComponent(eventKey(e))}`}>Ver quiénes nadan esta prueba <span aria-hidden="true">→</span></a></article>)}</div></section>
      : selectedEvent ? <section className="detail"><a className="back" href="#equipo">← Volver al equipo</a><p className="eyebrow">NUESTRO EQUIPO EN ESTA PRUEBA</p><h1 ref={heading} tabIndex={-1}>{selectedEvent.distance} m <span>{selectedEvent.stroke}</span></h1><p className="intro">Nadadores de EDELP inscriptos en esta distancia y estilo.</p><div className="athlete-grid">{athletes.filter(a => a.events.some(e => eventKey(e) === eventKey(selectedEvent))).map(card)}</div></section>
      : !known ? <section className="detail empty"><h1 ref={heading} tabIndex={-1}>No encontramos este perfil</h1><a className="back" href="#equipo">← Volver al equipo</a></section>
      : <>
      {!favoritesOnly && <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="red-dot"/> PANAMERICANO MASTERS · BUENOS AIRES 2026</p><h1 ref={heading} tabIndex={-1}>Seguí a <span>EDELP.</span></h1><p className="intro">Acompañá a nuestros nadadores.<br/>Todas sus pruebas, en un solo lugar.</p><div className="stats"><span><b>8</b> nadadores</span><span><b>27</b> inscripciones individuales</span></div></div><div className="hero-art" aria-hidden="true"><div className="lanes"/><div className="art-label">ORGULLO PINCHARRATA</div><img src="/escudo-edlp.webp" alt=""/><span>EL PINCHA EN EL AGUA</span></div></section>}
      {!favoritesOnly && following.length > 0 && <aside className="favorites"><div><h2>♥ Mis nadadores</h2><span>Guardados en este navegador</span></div><div className="chips">{athletes.filter(a => following.includes(a.id)).map(a => <a href={`#${a.id}`} key={a.id}>{a.name}<span aria-hidden="true">↗</span></a>)}</div></aside>}
      <section className="team"><div className="team-heading"><div><p className="eyebrow">{favoritesOnly ? 'CERCA DE QUIENES SEGUÍS' : 'NUESTROS REPRESENTANTES'}</p><h2 ref={favoritesOnly ? heading : undefined} tabIndex={favoritesOnly ? -1 : undefined}>{favoritesOnly ? 'Mis nadadores' : 'El equipo'} <span className="count">{favoritesOnly ? following.length : athletes.length}</span></h2><p>{favoritesOnly ? 'Tu selección, guardada en este navegador.' : 'Elegí un nadador para conocer sus pruebas.'}</p></div><div className="search"><label htmlFor="athlete-search">Buscar por nombre</label><div className="search-field"><span aria-hidden="true">⌕</span><input id="athlete-search" type="search" placeholder="Buscar nadador…" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button aria-label="Borrar búsqueda" onClick={() => setQuery('')}>×</button>}</div></div></div>
      <div role="status" className="sr-only">{filtered.length} nadadores encontrados</div>
      {filtered.length > 0 ? <div className="athlete-grid">{filtered.map(card)}</div> : <div className="empty"><span aria-hidden="true">{query ? '⌕' : '♡'}</span><h3>{query ? 'No encontramos ese nombre' : 'Todavía no seguís a ningún nadador'}</h3><p>{query ? 'Probá con el nombre o el apellido, sin importar los acentos.' : 'Tocá “Seguir” en las tarjetas del equipo para guardarlas acá.'}</p>{query ? <button className="primary" onClick={() => setQuery('')}>Borrar búsqueda</button> : <a className="primary" href="#equipo">Ver el equipo →</a>}</div>}
      {!favoritesOnly && <p className="follow-hint"><span aria-hidden="true">♡</span> Tocá <strong>Seguir</strong> para tener a tus nadadores siempre a mano.</p>}
      </section></>}
      <footer><div className="footer-brand"><img src="/escudo-edlp.webp" alt="" width="24" height="39"/><strong>Vamos, Pincha.</strong></div><div><p>PanAm Aquatics Masters Championships · Buenos Aires 2026</p><p>Información basada en el Psych Sheet de inscripciones.</p><p>Espacio de seguimiento del equipo · No es el sitio oficial del torneo.</p></div><span className="footer-mark">EDELP / 2026</span></footer>
    </main><div className="sr-only" role="status" aria-live="polite">{notice}</div>
  </>;
}
