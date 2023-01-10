'use client';

import { useState, useRef } from 'react';
import tw from 'tailwind-styled-components';
import type { CoinTradeInfo } from '@/lib/upbit';
import { motion } from 'framer-motion';
import Image from 'next/image';
import upDouble from '~/public/icons/upDouble.svg';
import downDouble from '~/public/icons/downDouble.svg';

type Props = {
  coinInfo: CoinTradeInfo;
  order: number;
};

export default function CoinBox({ coinInfo, order }: Props) {
  const [haveBeenHovered, setHaveBeenHovered] = useState(false);

  const { market, trade_price, change, change_rate, change_price, change_level } = coinInfo;
  const delay = Math.floor((order / (Math.random() * 5)) % 4);
  const realChange = change_level === 0 ? 'EVEN' : change;

  return (
    <Wrapper $changeLevel={change_level} $change={change} $isClicked={haveBeenHovered}>
      <motion.div
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
        <MotionDiv
          initial={{ rotate: 100, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: delay / 4,
          }}
        >
          <NameBox>{`${market.substring(4)}`}</NameBox>
          <ArrowBox
            $change={realChange}
            initial={{
              y: realChange === 'FALL' ? 0 : heightByLevel[change_level],
            }}
            animate={{
              y: realChange === 'FALL' ? heightByLevel[change_level] : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 6,
              delay: 5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: realChange !== 'EVEN' ? 1 : 0 }}
              transition={{ delay: 5 }}
            >
              {realChange === 'RISE' ? (
                <Arrow src={upDouble} alt="upDouble" width={16} />
              ) : (
                <Arrow src={downDouble} alt="downDouble" width={16} />
              )}
            </motion.div>
          </ArrowBox>
        </MotionDiv>
      </motion.div>
    </Wrapper>
  );
}

const Wrapper = tw.div<{
  $changeLevel: CoinTradeInfo['change_level'];
  $change: CoinTradeInfo['change'];
  $isClicked: boolean;
}>`
  flex justify-center items-center
  ${({ $changeLevel }) => spanByLevel[$changeLevel]}
  ${({ $isClicked }) => $isClicked && 'text-slate-400'}
`;

const MotionDiv = tw(motion.div)`
  flex gap-x-1
`;

const NameBox = tw.span`
  cursor-pointer
`;

const ArrowBox = tw(motion.div)<{
  $change: CoinTradeInfo['change'];
}>`
  text-sm
  ${({ $change }) => styleByChange[$change]}
`;

const Arrow = tw(Image)`
  contrast-200
`;

const spanByLevel: { [key in CoinTradeInfo['change_level']]: string } = {
  0: 'row-span-1 col-span-1 text-lg',
  1: 'row-span-2 col-span-1 text-2xl',
  2: 'row-span-3 col-span-2 text-4xl',
  3: 'row-span-4 col-span-2 text-6xl',
};

const heightByLevel: { [key in CoinTradeInfo['change_level']]: number } = {
  0: 18 - 6,
  1: 24 - 8,
  2: 36 - 12,
  3: 60 - 16,
};

const styleByChange: { [key in CoinTradeInfo['change']]: string } = {
  FALL: 'text-blue-600',
  EVEN: '',
  RISE: 'text-red-500',
};
