import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { useQuery } from '@wasp/queries';
import getParticipants from '@wasp/queries/getParticipants';

export const Scrolling = () => {
  const { data: participants } = useQuery(getParticipants);

  return (
    <div className='text-neutral-700 sm:w-[585px] w-3/4 mb-8'>
      <Marquee gradient={true} gradientWidth={10} gradientColor={[245, 245, 245]} speed={45}>
        <code className='w-full'>
          {`[👋] Welcome, Hackers! 📝 Register below. ${participants > 0 && participants} ${
            participants > 0 && participants == 1 ? `hacker already has! ` : `hackers already have!`
          } ℹ️ Check the `}{' '}
          <strong>RULES</strong> {` section above for more Info [🛑] - `}
        </code>
      </Marquee>
    </div>
  );
};

export default Scrolling;
