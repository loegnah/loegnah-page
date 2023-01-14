import tw from 'tailwind-styled-components';

type Props = {
  children?: React.ReactNode;
  additionalStyle?: string;
};

export default function Widget({ children, additionalStyle }: Props) {
  return <Wrapper $additionalStyle={additionalStyle}>{children}</Wrapper>;
}

const Wrapper = tw.section<{ $additionalStyle?: string }>`
  p-5
  shadow-md shadow-themeA-shadow
  ring-1 ring-themeA-shadow
  
  ${({ $additionalStyle }) => $additionalStyle}
`;
