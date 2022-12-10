import '@/styles/globals.css';
import MainHeader from '../components/mainHeader';
import tw from 'tailwind-styled-components';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <Body>
        <MainHeader />
        {children}
      </Body>
    </html>
  );
}

const Body = tw.body`
  pt-24 lg:px-20 2xl:px-28
`;
