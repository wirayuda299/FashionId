import type { FC } from 'react';
import { Link } from 'react-router-dom';
import errorImg1 from '../../assets/images/404md.png';
import errorImg2 from '../../assets/images/404sm.png';
const NotFound: FC = () => {
  return (
    <div className='h-screen w-full'>
      <div className='flex items-center justify-center '>
        <div className='bg-white h-screen rounded-md flex items-center justify-center mx-4 md:w-2/3 '>
          <div className='flex flex-col items-center '>
            <picture>
              <source
                srcSet={errorImg1}
                media='(min-width:768px)'
              />
              <img src={errorImg2} alt='' />
            </picture>
            <h1 className='px-4 pt-8 pb-4 text-center text-5xl font-bold leading-10 text-gray-800'>
              OOPS!{' '}
            </h1>
            <p className='px-4 pb-10 text-base leading-none text-center text-gray-600'>
              No signal here! we cannot find the
              page you are looking for{' '}
            </p>
            <Link
              to='/'
              className='mx-4 text-center flex items-center justify-center h-10 w-44 border rounded-md text-white text-base bg-black'>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
