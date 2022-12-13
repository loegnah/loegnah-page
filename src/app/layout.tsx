import '@/styles/globals.css';
import tw from 'tailwind-styled-components';
import Header from './Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
