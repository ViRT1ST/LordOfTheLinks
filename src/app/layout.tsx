import { Open_Sans, Lato, Roboto } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import './globals.css';

import ModalContaner from '@/components/modal-container';

export const metadata: Metadata = {
  title: 'Template Site'
};

const open_sans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300'],
  display: 'swap',
  variable: '--font-open-sans',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-lato',
});

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-roboto',
});

const rootLayoutClasses = [
  open_sans.variable,
  lato.variable,
  roboto.variable,
  GeistSans.variable, 
  GeistMono.variable,
];

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${rootLayoutClasses.join(' ')} antialiased`}>
        {children}
        <ModalContaner />
      </body>
    </html>
  );
}
