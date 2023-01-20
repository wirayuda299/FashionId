
import { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useGetTopSellByGender } from '../../hooks/useGetTopSell';
import { urlFor } from '../../../config/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Products } from '../../types/Product';

export const TopSelling: FC = () => {
  const { data, isLoading, isError } = useGetTopSellByGender();
  
  if (isError) {
    return (
      <p className='text-center w-full text-black'>
        Something went wrong, please try again
        later
      </p>
    );
  }
  if (isLoading) {
    return (
      <p className='text-center w-full text-black'>
        Loading....
      </p>
    );
  }

  return (
    <div className='w-full h-full max-w-6xl mx-auto '>
      <div className='w-full h-full '>
        <h2 className='text-xl sm:text-3xl md:text-4xl text-center font-extrabold py-14 uppercase text-black topSelling-title '>Browse top selling products</h2>
        <div className='container mx-auto flex overflow-x-auto justify-center gap-2 pb-5'>
          {
            data?.map((product:Products) => (
              <div key={product?._id} className='mb-5'>
                <div className='bg-[#ebebeb] w-24 sm:w-28 px-3 sm:px-5 py-2  sm:py-3 text-center rounded-lg text-black uppercase sm:font-semibold text-xs'>{product?.category}</div>
              </div>
            ))
          }
        </div>
        <div className='w-full h-full p-5'>
          <div className='columns-1 md:columns-3 lg:columns-4'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              data?.map((item:Products) => (
                <Link to={`products/${item.gender}/${item._id}`} key={item._id} title={item.title}>
                  <motion.div
                    initial={{
                      opacity: 0,
                      filter: 'blur(5px)',
                      pointerEvents: 'none'
                    }}
                    whileInView={{
                      opacity: 1,
                      filter: 'blur(0)',
                      pointerEvents: 'all'
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.4 }}
                    className="relative mb-4 before:content-[''] topsell active before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-10 hover:before:bg-opacity-30 transition-all ease duration-500">
                    <img className='w-full rounded-md' src={urlFor(item.preview[0]).toString()} title={item.title} alt={item.title} />
                    <div className='absolute bottom-0 inset-0 p-5 text-white flex flex-col'>
                      <div className='relative bottom-0 mt-auto '>
                        <h2 className='text-xl font-bold mb-3 h-full text-center'>{item.title}</h2>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
