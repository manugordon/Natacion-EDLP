import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Seguí a EDELP · Natación Masters 2026',
  description: 'Acompañá a los 8 nadadores de Estudiantes de La Plata en el Panamericano Masters Buenos Aires 2026. Consultá sus pruebas y tiempos de inscripción.',
  icons: { icon: '/escudo-edlp.webp' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
