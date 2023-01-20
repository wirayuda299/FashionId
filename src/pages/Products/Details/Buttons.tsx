import { useState, useEffect, FC } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useStateContext } from '../../../context/StateContext';
import { Products } from '../../../types/Product';

interface Props {
  product: Products;
  id: string | undefined;
}

const Buttons: FC<Props> = ({ product, id }) => {
  const [addedToWishList, setAddedToWishList] = useState(false);
  const { state: { wishLists }, dispatch } = useStateContext();

  const addToWishList = (product: Products) => {
    const checkDuplicates = wishLists.find(
      (item: Products) => item._id === product._id
    );
    if (checkDuplicates) {
      return toast.error(
        'This item already in your wishlist'
      );
    }

    dispatch({
      type: 'ADD-TO-WISHLIST', payload: { product }
    });
    toast.success('This item successfully added to wishlist');
  };

  const deleteWishListItem = (product: Products) => {
    dispatch({
      type: 'REMOVE-FROM-WISHLIST', payload: { product }
    });
    setAddedToWishList(false);
    toast.success('Item has been remove from your wish list');
  };
  useEffect(() => {
    const isInWishList = wishLists.find((item: Products) => item._id === id
    );
    if (isInWishList) {
      setAddedToWishList(true);
    } else {
      setAddedToWishList(false);
    }
  }, [wishLists]);
  return (
    <div>
      {addedToWishList ? (
        <button
          className='rounded-full w-10 h-10  border-0 inline-flex items-center justify-center text-gray-500 ml-4'
          title='Remove to wish list'
          onClick={() => deleteWishListItem(product)}>
          <AiFillHeart size={30} fill='red' />
        </button>
      ) : (
        <button
          className='rounded-full w-10 h-10  border-0 inline-flex items-center justify-center text-gray-500 ml-4'
          title='Add to wish list'
          onClick={() => addToWishList(product)}>
          <AiOutlineHeart size={30} />
        </button>
      )}
    </div>
  );
};
export default Buttons;
