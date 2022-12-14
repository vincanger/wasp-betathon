import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { useQuery } from '@wasp/queries';
import getParticipants from '@wasp/queries/getParticipants';

export const Scrolling = () => {
  const { data } = useQuery(getParticipants);
  const [participants, setParticipants] = useState();

  useEffect(() => {
    console.log(data);
    if (data) {
      setParticipants(data);
    }
  }, [data]);

  return (
    <div className='text-neutral-700 sm:w-[585px] w-3/4 mb-8'>
      <Marquee gradient={true} gradientWidth={10} gradientColor={[245, 245, 245]} speed={45}>
        <code className='w-full'>
          {`[đ] Welcome, Internet Friends đ Hackathon dates Dec. 5th - Dec. 14th! đ Register below. ${participants} friends already have! âšī¸ Check the `}
          <strong>RULES</strong>
          {` section above for more Info [đ]`}
        </code>
        <code>{'-'}</code>
      </Marquee>
    </div>
  );
};

export default Scrolling;
