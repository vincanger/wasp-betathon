import React from 'react';
import './Main.css';
import Nav from './components/Navbar';
import SubmissionForm from './components/SubmissionForm';
import RegistrationForm from './components/RegistrationForm';
import Projects from './components/Projects';
import Countdown from './components/Countdown';
import Scrolling from './components/Scrolling';

const MainPage = () => {
  const [registerOrSubmit, setRegisterOrSubmit] = React.useState(false);

  const startDateString = '2023-06-18T00:00:00';
  const endDateString = '2023-06-22T23:59:00';
  
  // const startDateString = '2023-04-17T00:00:00';
  // const endDateString = '2023-04-23T23:59:00';
  
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return (
    <div>
      <Nav startDate={startDate} />
      <main>
        {/* <Scrolling /> */}
        <iframe
          className='mb-16 sm:w-[585px] sm:h-[330px] w-full h-[205px]'
          src='https://www.youtube.com/embed/ts2mQHLBnc0'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
        ></iframe>
        <Countdown startDate={startDate} endDate={endDate} />
        <Projects />
        <div className='skew-y-min2 border-double border-2 border-t border-b border-yellow-500/25 w-full mb-10'></div>
        <div className='flex flex-row items-center space-x-4 justify-center mt-6' id='submit-project'>
          <button
            disabled={!registerOrSubmit}
            className='inline-flex justify-center rounded-md border border-yellow-600 text-yellow-600 py-2 px-4 text-sm font-semibold shadow-sm disabled:opacity-60 enabled:hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
            onClick={() => setRegisterOrSubmit(!registerOrSubmit)}
          >
            Register
          </button>
          <span> | </span>
          <button
            disabled={registerOrSubmit}
            onClick={() => setRegisterOrSubmit(!registerOrSubmit)}
            className='inline-flex justify-center rounded-md border border-yellow-600 text-yellow-600 py-2 px-4 text-sm font-semibold shadow-sm disabled:opacity-60 enabled:hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
          >
            Submit a Project
          </button>
        </div>
        {registerOrSubmit ? <SubmissionForm startDate={startDate} endDate={endDate} /> : <RegistrationForm />}
      </main>
    </div>
  );
};
export default MainPage;
