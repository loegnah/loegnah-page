import tw from 'tailwind-styled-components';

type Props = {
  children: React.ReactNode;
};

export default function BlogLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}

const Layout = tw.div`
  py-4
`;
