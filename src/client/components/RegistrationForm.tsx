import React from 'react';
import registerProject from '@wasp/actions/registerProject';

export type Registration = {
  name: string;
  email: string;
};

const RegistrationForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    try {
      await registerProject(value as Registration);
      alert('Registered successfully!');
      event.target.reset();
    } catch (e) {
      alert(e.message || 'Error while registering');
    }
  };

  return (
    <>
      <div className='relative mt-6 pt-6 px-3 sm:mt-0 sm:px-20 sm:mx-10 lg:w-1/2 w-4/5' id='submission'>
        <div className='md:grid md:grid-cols-2 md:gap-6'>
          <div className='md:col-span-2 md:mt-0'>
            <form onSubmit={handleSubmit} method='POST'>
              <div className='overflow-hidden shadow-md sm:rounded-md'>
                <div className='bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6'>
                      <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Personal or Team Name *
                      </label>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        required
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email address *
                      </label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        required
                        autoComplete='email'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white shadow-sm disabled:opacity-60 enabled:hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200'></div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
