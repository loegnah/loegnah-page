import '@/styles/globals.css';
import tw from 'tailwind-styled-components';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
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
`;

const Main = tw.main`
  px-20 2xl:px-28
`;
