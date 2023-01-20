import { FC } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { useStateContext } from '../../../context/StateContext';
import { Products } from '../../../types/Product';

interface Props {
  item: Products;
}

export const ProductCartDetail: FC<Props> = ({ item }) => {
  const { dispatch } = useStateContext();
  
  const decreaseQuantity = (product: Products) => {
    return dispatch({
      type: 'DECREASE-QUANTITY',
      payload: {
        _id: product._id
      }
    });
  };
  const increaseQuantity = (product: Products) => {
    return dispatch({
      type: 'INCREASE-QUANTITY',
      payload: {
        _id: product._id
      }
    });
  };
  const removeItem = (product: Products) => {
    return dispatch({
      type: 'REMOVE-FROM-CART',
      payload: {
        _id: product._id
      }
    });
  };
  
  return (
    <section className='w-full md:px-5'>
      <div className='pt-3'>
        <span className='text-xs'>H&M</span>
        <h2 className='font-bold text-xl sm:text-2xl md:text-4xl cartItem-title capitalize'>
          {item?.title}
        </h2>
      </div>
      <div className='flex justify-between w-full py-2'>
        <p className='text-left text-sm sm:text-base text-gray-500'>
          Price: ${item?.price}
        </p>
        <button title='remove item' onClick={() => removeItem(item)}>
          <BsTrash className='text-2xl' />
        </button>
      </div>
      <div>
        <div className='flex space-x-2 items-center'>
          <p className='text-left text-sm sm:text-base text-gray-500'>
            Color: {item?.color}
          </p>
          <div className='w-5 h-5 rounded-full border' style={{
            backgroundColor: item?.hex,
          }}></div>
        </div>
        <p className='text-left text-sm sm:text-base pt-1 text-gray-500'>
          Size: {item.selectedSize}
        </p>
      </div>
      <div className='pt-4 flex space-x-3 pb-5 text-gray-500'>
        <p>Quantity : </p>
        <button
          title='decrease quantity'
          className='border rounded-lg p-1'
          onClick={() => decreaseQuantity(item)}>
          <AiOutlineMinus size={15} />
        </button>
        <span className='px-2'>
          {item.quantity}
        </span>
        <button
          title='increase quantity'
          className='border rounded-lg p-1'
          onClick={() => increaseQuantity(item)}>
          <AiOutlinePlus size={15} />
        </button>
      </div>
    </section>
  );
};
