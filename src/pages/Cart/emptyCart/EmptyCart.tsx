import { Link } from 'react-router-dom';
import img from '../../../assets/images/emptyCart.jpg';
import { FC } from 'react';

export const EmptyCart: FC = () => {
  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <img src={img} alt='empty cart' className='object-cover mx-auto' width={500} height={500} />
      <div className='text-center pb-5'>
        <h1 className='text-2xl font-bold text-center py-3'>Your Cart is Empty</h1>
        <Link to='/products' title='productgo to products'>
          Shop Now!
        </Link>
      </div>
    </div>
  );
};
