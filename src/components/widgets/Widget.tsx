import tw from 'tailwind-styled-components';

type Props = {
  children: React.ReactNode;
  className: string;
};

export default function Widget({ children, className }: Props) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

const Wrapper = tw.section`
  h-36 bg-deep-4
`;
