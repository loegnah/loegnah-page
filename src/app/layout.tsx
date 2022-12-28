import '@/styles/globals.css';
import tw from 'tailwind-styled-components';
import Header from './Header';
import { fontVariables } from '@/lib/fonts';

type Props = {
  children: React.ReactNode;
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
  bg-themeA-bg text-themeA-blackFont
  font-jua
`;

const Main = tw.section`
  px-20 2xl:px-28
`;
