import { motion } from 'framer-motion';
import {type FC, memo } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './Image';
import ProductInfo from './ProductInfo';

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

const Card: FC<Props> = (props) => {
  const { image, title, price, className, id, gender, category, model, isTopSell } = props;

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
        <ProductImage
          image={image}
          title={title}
          model={model}
        />
        <ProductInfo
          title={title}
          price={price}
          isTopSell={isTopSell}
          category={category}
        />
      </Link>
    </motion.div>
  );
};

export default memo(Card);
