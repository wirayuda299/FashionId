import { motion } from 'framer-motion';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../../config/client';

interface Props {
  image: string[] | string;
  title: string;
  price: number;
  className?: string;
  id: string;
  model?: boolean;
  gender: string;
  category: string;
  isTopSell: boolean;
}

const Card: FC<Props> = ({ image, title, price, className, id, gender, category, model, isTopSell}) => {

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0)', }}
      transition={{ ease: 'easeOut', duration: 0.4, }}
      className={`w-full h-full text-black aspect-square p-3  ${className ?? ''}`}>
      <Link
        to={`/products/${gender}/${id}`}
        title={title}
        className='p-3'>
        <div className='w-full h-min aspect-square relative overflow-hidden'>
          <img
            width='500'
            className='object-cover'
            height='500'
            onMouseEnter={e => model ? (
              e.currentTarget.src = urlFor(image[1]).format('jpg').toString())
              : (e.currentTarget.src = urlFor(image[0]).format('jpg').toString())}
            onMouseLeave={e => model ? (
              e.currentTarget.src = urlFor(image[0]).format('jpg').toString())
              : (e.currentTarget.src = urlFor(image[1]).format('jpg').toString())}
            src={model ? urlFor(image[0]).format('jpg').toString() : urlFor(image[1]).format('jpg').toString()}
            alt={title}
          />
        </div>
        <div className='w-full'>
          <div>
            <small className='text-gray-400 capitalize '>{isTopSell ? `Top Selling-${category}` : category}
            </small>
            <h2 className='w-full text-sm font-medium sm:font-semibold sm:pb-2 truncate capitalize'>
              {title}
            </h2>
            <p className='text-gray-400 text-sm'>
              ${price}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default memo(Card);
