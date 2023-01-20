import { FC } from 'react';
import bannerBg from '../../assets/images/banner-bg.jpg.webp';

export const Banner: FC = () => {
  return (
    <div className='w-full max-w-5xl mx-auto h-full pb-5'>
      <div
        className='w-full h-80 text-black'
        style={{
          background: `url(${bannerBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className='flex w-full h-full justify-between items-center p-10 relative'>
          <div>
            <p className='md:text-xl font-medium'>
              New Arrival
            </p>
            <h2 className='text-3xl text-left md:text-6xl font-extrabold uppercase text-black bannerTitle tracking-wider pt-1 pb-5'>
              Striped Shirt
            </h2>
            <div>
              <button className='bg-black text-white w-32 md:w-40 py-4 rounded-full uppercase text-xs md:text-sm font-semibold'>
                Shop Now
              </button>
            </div>
          </div>

          <div className='absolute top-[27px] sm:right-[27px]'>
            <button className='bg-black w-20 md:w-[110px] text-center h-9 rounded-full text-white md:text-2xl font-semibold uppercase'>
              New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
