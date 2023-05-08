import { useStateContext } from '../../context/StateContext';
import { Products } from '../../types/Product';
import WishListHeader from './WishListHeader';
import Empty from './Empty';
import Detail from './Detail';
import type { FC } from 'react';

const Wishlist:FC = () => {
  const { state: { wishLists } } = useStateContext();

  return (
    <section className='w-full h-full'>
      <div className='w-full my-5 '>
        <WishListHeader />
        {wishLists.length < 1 ? (
          <Empty />
        ) : (
          wishLists.map((item: Products) => (
            <Detail item={item} key={item._id} />
          ))
        )}
      </div>
    </section>
  );
};

export default Wishlist;
