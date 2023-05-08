import type { FC } from 'react';
import { useStateContext } from '../../../context/StateContext';
import { Products } from '../../../types/Product';
import { toast } from 'react-hot-toast';

type Props = {
  total: number;
  cartItems: Products[];
}

type OrderDetailsValues = {
  id: number;
  title: string;
  price: number;
}
export const CheckOut: FC<Props> = ({ total, cartItems }) => {
  const orderDetails: OrderDetailsValues[] = [
    {
      id: 1,
      title: 'Subtotal',
      price: total,
    },
    {
      id: 2,
      title: 'Shipping Cost',
      price: 10,
    },
    {
      id: 3,
      title: 'Total',
      price: total + 10,
    },
  ];
  const { state: { user } } = useStateContext();
  const handleCheckOut = () => {
    if (user && user.emailVerified) {
      toast.success('check out');
    } else {
      toast.error('email not verified');
    }
  };
  return (
    <div className={`w-full max-w-5xl mx-auto h-full p-5 ${cartItems?.length < 1 ? 'hidden' : 'block'}`}>
      <div className='py-2 '>
        <h2 className='font-semibold text-lg pl-3'>
          Order info
        </h2>
        <div className='p-3'>
          {orderDetails.map(item => (
            <div className='flex justify-between py-2' key={item?.id}>
              <p className='font-normal text-gray-400'>
                {item.title}
              </p>
              <p className='font-normal text-gray-400'>
                ${item.price}
              </p>
            </div>
          ))}
          <button
            name='checkout'
            title='checkout'
            type='button'
            className='w-full h-14 bg-black text-white mt-4 rounded-lg'
            onClick={handleCheckOut}>
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};
