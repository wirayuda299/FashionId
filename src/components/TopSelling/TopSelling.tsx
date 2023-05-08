
import { FC } from 'react';
import { useGetTopSellByGender } from '../../hooks/useGetTopSell';
import { urlFor } from '../../../config/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Products } from '../../types/Product';
import Card from '../Card'

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
            data?.map((product: Products) => (
              <div key={product?._id} className='mb-5'>
                <div className='bg-[#ebebeb] w-24 sm:w-28 px-3 sm:px-5 py-2  sm:py-3 text-center rounded-lg text-black uppercase sm:font-semibold text-xs'>{product?.category}</div>
              </div>
            ))
          }
        </div>
        <div className='w-full h-full p-5'>
          <div className='mx-auto grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              data?.map((item: Products) => (
                <Card
                  key={item._id}
                  isTopSell={item.tags.includes('top selling')}
                  model={true}
                  image={item.preview}
                  title={item.title}
                  category={item.category}
                  gender={item.gender}
                  id={item._id}
                  price={item.price}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
