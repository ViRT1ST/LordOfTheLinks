import { Roboto, Rubik, Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';

import ModalContaner from '@/components/[body-children]/modal-container';

export const metadata: Metadata = {
  title: 'Lord of the Links',
};

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-roboto',
});

const rubik = Rubik({
  subsets: ['latin', 'cyrillic'],
  weight: ['300','400', '500'],
  display: 'swap',
  variable: '--font-rubik',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300','400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const rootLayoutClasses = [
  roboto.variable,
  rubik.variable,
  GeistSans.variable,
  inter.variable,
  'antialiased',
].join(' ');

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={rootLayoutClasses}>
        {children}
        <ModalContaner />
      </body>
    </html>
  );
}
