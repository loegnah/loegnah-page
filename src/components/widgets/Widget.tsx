import tw from 'tailwind-styled-components';

type Props = {
  children: React.ReactNode;
  height?: number;
};

export default function Widget({ children, height }: Props) {
  return <Wrapper style={{ height }}>{children}</Wrapper>;
}

const Wrapper = tw.section<{ height?: string }>`
  h-36 bg-deep-4
`;
