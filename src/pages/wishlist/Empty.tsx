import { FC } from 'react';
import emptyWishList from '../../assets/images/wishlist.jpg';

const Empty:FC = () => {
  return (
    <div className='w-full h-screen py-10'>
      <div className='container mx-auto flex flex-col justify-center items-center text-center sm:font-semibold sm:text-2xl capitalize '>
        <img
          src={emptyWishList}
          alt='Your wishlist is empty'
        />
        <div>
          <p>
            Opss!!.. your wishlist is empty
          </p>
        </div>
      </div>
    </div>
  )
}

export default Empty