import {
  // Nanum_Pen_Script,
  // Dongle,
  Jua,
  Nanum_Gothic_Coding,
  Nanum_Gothic,
  Black_Han_Sans,
} from 'next/font/google';

// export const nanum_pen_script = Nanum_Pen_Script({
//   variable: '--font-nanum_pen_script',
//   weight: '400',
//   subsets: ['latin'],
//   display: 'swap',
// });

// export const dongle = Dongle({
//   variable: '--font-dongle',
//   weight: ['300', '400', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

export const jua = Jua({
  variable: '--font-jua',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const nanum_gothic = Nanum_Gothic({
  variable: '--font-nanum_gothic',
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const nanum_gothic_coding = Nanum_Gothic_Coding({
  variable: '--font-nanum_gothic_coding',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const black_han_sans = Black_Han_Sans({
  variable: '--font-black_han_sans',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const fontVariables = `
  ${jua.variable}
  ${nanum_gothic.variable}
  ${nanum_gothic_coding.variable}
  ${black_han_sans.variable}
`;
