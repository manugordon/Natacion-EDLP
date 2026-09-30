'use client';
import { useEffect, useRef, useState } from 'react';
import { athletes, type Athlete } from './athletes';
const initials = (name: string) => `${name.split(' ')[0][0]}${name.split(' ').at(-1)?.[0]}`;
export default function SwimApp() {
  const [route, setRoute] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const didNavigate = useRef(false);
  useEffect(() => {
    const sync = () => { if (location.hash === '#contenido') return; try { setRoute(decodeURIComponent(location.hash.slice(1))); } catch { setRoute(''); } };
    sync(); window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => { if (didNavigate.current) { window.scrollTo(0, 0); heading.current?.focus({ preventScroll: true }); } didNavigate.current = true; }, [route]);
  const athlete = athletes.find(a => route === a.id);
  const card = (a: Athlete) => <article className="athlete-card" key={a.id}>
    <div className="card-top"><div className="avatar" aria-hidden="true">{initials(a.name)}</div></div>
    <h3><a className="card-main-link" href={`#${a.id}`}>{a.name}</a></h3>
    <p className="athlete-meta">{a.age} años <span>·</span> Categoría {a.category}</p>
    <div className="card-bottom"><span>{a.events.length} pruebas</span><span className="view-label">Ver pruebas <span aria-hidden="true">→</span></span></div>
  </article>;
  return <>
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <header><div className="header-inner"><a className="brand" href="#equipo" aria-label="Natación Estudiantes, volver al equipo"><img src="/escudo-edlp.webp" alt="Escudo de Estudiantes de La Plata" width="37" height="60"/><span>ESTUDIANTES DE LA PLATA<strong>Natación Masters</strong></span></a></div></header>
    <main id="contenido" tabIndex={-1}>
      {athlete ? <section className="detail"><a className="back" href="#equipo">← Volver al equipo</a><div className="profile-heading"><div className="profile-avatar avatar" aria-hidden="true">{initials(athlete.name)}</div><div><p className="eyebrow">NATACIÓN · ESTUDIANTES DE LA PLATA</p><h1 ref={heading} tabIndex={-1}>{athlete.name}</h1><p className="profile-meta">EDELP <span>·</span> {athlete.age} años <span>·</span> Categoría {athlete.category}</p></div></div><div className="section-title"><h2>Sus pruebas</h2><span className="count">{athlete.events.length} inscripciones</span></div><p className="info-note"><span aria-hidden="true">ⓘ</span> Estos son tiempos de inscripción, no resultados de carrera.</p><div className="event-grid">{athlete.events.map(e => <article className="event-card" key={e.eventNumber}><div className="event-top"><span className="stroke">{e.stroke}</span><span>Evento #{e.eventNumber}</span></div><h3>{e.distance} m {e.stroke}</h3><div className="seed"><span>Tiempo de inscripción</span><strong>{e.seedTime}</strong></div></article>)}</div></section>
      : <>
      <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="red-dot"/> PANAMERICANO MASTERS · BUENOS AIRES 2026</p><h1 ref={heading} tabIndex={-1}>Seguí a <span>EDELP.</span></h1><p className="intro">Acompañá a nuestros nadadores.<br/>Todas sus pruebas, en un solo lugar.</p><div className="stats"><span><b>8</b> nadadores</span></div></div><div className="hero-art" aria-hidden="true"><div className="lanes"/><div className="art-label">ORGULLO PINCHARRATA</div><img src="/escudo-edlp.webp" alt=""/><span>EL PINCHA EN EL AGUA</span></div></section>
      <section className="team"><div className="team-heading"><div><p className="eyebrow">NUESTROS REPRESENTANTES</p><h2>El equipo <span className="count">{athletes.length}</span></h2><p>Elegí un nadador para conocer sus pruebas.</p></div></div>
      <div className="athlete-grid">{athletes.map(card)}</div>
      </section></>}
      <footer><div className="footer-brand"><img src="/escudo-edlp.webp" alt="" width="24" height="39"/><strong>Vamos, Pincha.</strong></div><div><p>PanAm Aquatics Masters Championships · Buenos Aires 2026</p><p>Información basada en el Psych Sheet de inscripciones.</p><p>Espacio de seguimiento del equipo · No es el sitio oficial del torneo.</p></div><span className="footer-mark">EDELP / 2026</span></footer>
    </main>
  </>;
}
