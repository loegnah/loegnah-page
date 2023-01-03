'use client';

import { useState } from 'react';
import tw from 'tailwind-styled-components';
import type { CoinTradeInfo } from '@/lib/upbit';
import { motion } from 'framer-motion';

type Props = {
  coinInfo: CoinTradeInfo;
  size: 0 | 1 | 2 | 3;
  order: number;
};

export default function CoinBox({ coinInfo, size, order }: Props) {
  const [haveBeenHovered, setHaveBeenHovered] = useState(false);
  const { market, trade_price, change, change_rate, change_price } = coinInfo;
  const delay = Math.floor((order / (Math.random() * 5)) % 4);
  return (
    <Wrapper $size={size} $isClicked={haveBeenHovered}>
      <MotionDiv
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        onTapStart={() => setHaveBeenHovered(true)}
        onHoverEnd={() => setHaveBeenHovered(false)}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <motion.div
          initial={{ rotate: 100, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: delay / 4,
          }}
        >
          {`${market.substring(4)}`}
        </motion.div>
      </MotionDiv>
    </Wrapper>
  );
}

const spanBySize: { [key in Props['size']]: string } = {
  0: 'row-span-1 col-span-1 text-sm',
  1: 'row-span-2 col-span-1 text-xl',
  2: 'row-span-3 col-span-2 text-3xl',
  3: 'row-span-4 col-span-2 text-5xl',
};

const Wrapper = tw.div<{ $size: Props['size']; $isClicked: boolean }>`
  cursor-pointer
  flex justify-center items-center
  ${({ $size }) => spanBySize[$size]}
  ${({ $isClicked }) => $isClicked && 'text-slate-400'}
`;

const MotionDiv = tw(motion.div)`
`;
