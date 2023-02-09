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
        {children}
      </Body>
    </html>
  );
}

const Body = tw.body`
  pt-24 lg:px-20 2xl:px-28
`;
