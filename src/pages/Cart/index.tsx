import { EmptyCart } from './emptyCart/EmptyCart';
import { Carousel } from 'react-responsive-carousel';
import { urlFor } from '../../../config/client';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FC, useEffect, useMemo, useState } from 'react';
import { useStateContext } from '../../context/StateContext';
import { Products } from '../../types/Product';
import { CheckOut } from './checkout/CheckOut';
import { ProductCartDetail } from './Detail/ProductCartDetail';

const Cart: FC = () => {
  const [total, setTotal] = useState<number>(0);
  const { state: { cartItems} } = useStateContext();

  const totalPrices = useMemo(() => {
    return cartItems.reduce((acc: number, curr: { price: number; quantity: number }) => acc + curr.price * curr.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    if (totalPrices !== undefined) {
      setTotal(totalPrices);
    }
  }, [totalPrices]);



  return (
    <div className='w-full h-full'>
      <h1 className='text-2xl font-bold text-center py-3'>
        Your Cart Items
      </h1>
      <div className='w-full h-full flex flex-col justify-center items-center md:gap-x-3'>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          cartItems.map((item: Products) => (
            <div
              className='w-full h-full'
              key={item?._id}>
              <div className='max-w-5xl mx-auto h-full px-3'>
                <div className='h-full p-5 flex flex-col md:flex-row md:justify-around items-center'>
                  <div className='w-full h-full '>
                    <Carousel
                      showStatus={false}
                      showIndicators={false}
                      autoPlay
                      infiniteLoop
                      showThumbs={false}
                      showArrows={false}
                      interval={10000}
                      className='md:w-[300px]'>
                      {item?.image.map(image => (
                        <div className='w-full h-full md:w-52 md:h-52' key={image}>
                          <img
                            src={urlFor(image).toString()}
                            className=' object-cover rounded-lg mx-auto'
                            alt={item.title}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <ProductCartDetail item={item} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <CheckOut
        total={total}
        cartItems={cartItems}
      />
    </div>
  );
};

export default Cart;
