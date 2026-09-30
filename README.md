# Natación EDELP · Panamericano Masters 2026

Micrositio responsive para los 8 nadadores de Estudiantes de La Plata, con 27 inscripciones individuales del brief. Los tiempos son de inscripción; no son resultados.

## Desarrollo

Requiere Node.js 22.13 o posterior.

```sh
npm ci
npm run dev
npm run build
npm test
```

## Contenido y comportamiento

- `app/athletes.ts`: datos del equipo y pruebas; campos futuros opcionales sin información inventada.
- `app/swim-app.tsx`: listado, perfiles, búsqueda sin distinción de acentos, favoritos y navegación por prueba.
- `app/globals.css`: diseño responsive y accesibilidad.
- `public/escudo-edlp.webp`: escudo provisto por el usuario.
- Favoritos locales en `edelp-following-v1`; sin cuenta ni backend. Si el navegador bloquea el almacenamiento, funcionan durante la sesión con aviso accesible.
- Navegación mediante fragmentos de URL, compatible con volver/avanzar y enlaces directos.
- Las categorías, tiempos, orden y eventos provienen del brief. No se recibió un PDF adicional para contrastarlos.

## Validación

Las pruebas verifican las 27 inscripciones y la página renderizada. No se realizó QA visual ni interacción de navegador porque el navegador integrado no estuvo disponible.
