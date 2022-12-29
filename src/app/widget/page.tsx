import tw from 'tailwind-styled-components';
import UpbitWidget from '@/components/widgets/UpbitWidget';

export default async function WidgetPage() {
  return (
    <Wrapper>
      {/* @ts-expect-error Server Component */}
      <UpbitWidget />
    </Wrapper>
  );
}
const Wrapper = tw.main`
  flex flex-col gap-y-6
  px-2 py-6
`;
