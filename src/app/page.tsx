import tw from 'tailwind-styled-components';
import Widget from '@/components/Widget';

export default function RootPage() {
  return (
    <Wrapper>
      <Widget />
      <Widget />
      <Widget />
    </Wrapper>
  );
}
const Wrapper = tw.main`
  px-2 py-6 bg-deep-2
  flex flex-col gap-y-6
`;
