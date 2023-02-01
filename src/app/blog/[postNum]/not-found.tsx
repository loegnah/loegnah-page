import tw from 'tailwind-styled-components';

export default function NotFound() {
  return (
    <>
      <H2>Not Found</H2>
      <p>Could not find requested resource</p>
    </>
  );
}

const H2 = tw.h2`
  text-3xl
`;
