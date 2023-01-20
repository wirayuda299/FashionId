import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className='bg-white dark:bg-black text-white w-full h-screen fixed'>
      <div className='container mx-auto flex justify-center flex-col items-center h-full'>
        <div className='loader'>
          <div className='loader-square'></div>
          <div className='loader-square'></div>
          <div className='loader-square'></div>
          <div className='loader-square'></div>
          <div className='loader-square'></div>
          <div className='loader-square'></div>
          <div className='loader-square'></div>
        </div>
      </div>
    </div>
  );
};
