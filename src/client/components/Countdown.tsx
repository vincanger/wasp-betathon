import { useState, useEffect } from 'react';

export default function Countdown({ startDate, endDate }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [targetDate, setTargetDate] = useState(endDate);
  const now = new Date();

  useEffect(() => {
    if (now.getTime() < startDate.getTime()) {
      setTargetDate(startDate);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const diffInMilliseconds = targetDate.getTime() - new Date().getTime();

      if (diffInMilliseconds <= 0) {
        clearInterval(intervalId);
      } else {
        // calculate the remaining time
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const remainingSeconds = diffInSeconds % 60;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const remainingMinutes = diffInMinutes % 60;
        const diffInHours = Math.floor(diffInMinutes / 60);
        const remainingHours = diffInHours % 24;
        const remainingDays = Math.floor(diffInHours / 24);

        // update the state
        setDays(remainingDays);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

  return (
    <div className='-mt-6 mb-12'>
      <dl className='my-2 grid grid-cols-4 rounded-lg shadow-md'>
        <div className='overflow-hidden bg-white rounded-tl-lg py-3 px-4'>
          <dt className='truncate text-sm font-medium text-gray-500'>days</dt>
          <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>{days}</dd>
        </div>
        <div className='overflow-hidden bg-white py-3 px-4'>
          <dt className='truncate text-sm font-medium text-gray-500'>hours</dt>
          <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>{hours}</dd>
        </div>
        <div className='overflow-hidden bg-white py-3 px-4'>
          <dt className='truncate text-sm font-medium text-gray-500'>minutes</dt>
          <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>{minutes}</dd>
        </div>
        <div className='overflow-hidden bg-white rounded-tr-lg py-3 px-4'>
          <dt className='truncate text-sm font-medium text-gray-500'>seconds</dt>
          <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>{seconds}</dd>
        </div>
        <div className='overflow-hidden bg-white max-w-full col-span-4 rounded-b-lg px-4 pb-2'>
          <dt className='truncate text-sm font-medium max-w-full text-gray-500 text-center'>
            until hackathon {startDate > now ? 'begins' : 'ends'}
          </dt>
        </div>
      </dl>
      {/* <h3 className='text-base font-semibold leading-6 text-gray-900 text-center'>Hackathon starts in: </h3> */}
    </div>
  );
}
