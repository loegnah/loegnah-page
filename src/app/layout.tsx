import '@/styles/globals.css';
import tw from 'tailwind-styled-components';
import Header from './Header';
import { fontVariables } from '@/lib/fonts';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Loegnah Page',
  description: 'Loegnah Homepage',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${fontVariables}`}>
      <head />
      <Body>
        <Header />
        <Main>{children}</Main>
      </Body>
    </html>
  );
}

const Body = tw.body`
  min-w-[1080px]
  bg-themeA-bg text-themeA-blackFont
  font-nanum_gothic
`;

const Main = tw.section`
  px-20 2xl:px-28
`;
