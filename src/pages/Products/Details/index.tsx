
import { useState, FC, ChangeEvent, useEffect, FormEvent } from 'react';
import { Outlet, Params, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Products } from '../../../types/Product';
import { client, urlFor } from '../../../../config/client';
import { useStateContext } from '../../../context/StateContext';
import { motion } from 'framer-motion';
import { Recommended } from '../../../components/Recommended/Recommended';
import { useQuery } from 'react-query';
import Buttons from './Buttons';
import toast from 'react-hot-toast';

const Detail: FC = () => {
  const [recommended, setRecommendedProduct] = useState<Products[]>([]);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const { id, gender } = useParams<Readonly<Params<string>>>();
  const [, setClicked] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('')
  const { state: { cartItems, selectedSize }, dispatch } = useStateContext();
  console.log(selectedSize);

  const { data, isError, isLoading } = useQuery(['product detail', id], async () => {
    const response = await client.fetch('*[_type == "product"]') as Products[];
    setRecommendedProduct(response.filter(item => item._id !== id && item.gender === gender));
    const filtered = response.filter(item => item._id === id);
    setSelected(filtered.map(item => item.size[0]).toString())
    return filtered;
  });

  const addToCart = (product: Products) => {
    setClicked(true);
    const checkDuplicates = cartItems.find((item: Products) => item?._id === product?._id);
    if (checkDuplicates) {
      checkDuplicates.quantity++;
      toast.success(`${product.title} quantity has been updated`);
      setClicked(false);
    }
    if (!checkDuplicates) {
      setClicked(true);
      dispatch({
        type: 'ADD-TO-CART',
        payload: {
          product,
          selectedSize: selected,
          quantity: 1
        }
      });
      toast.success(`${product.title} has added to your cart`);
      setTimeout(() => {
        setClicked(false);
      }, 2000);
    }
  }
  useEffect(() => {
    const isInCart = cartItems.find((item: Products) => item._id === id);
    if (isInCart) {
      setAddedToCart(true);
    } else {
      setAddedToCart(false);
    }
  }, [cartItems]);

  if (isError) {
    return (
      <p className='text-center w-full text-black'>
        Something went wrong, please try again later
      </p>
    );
  }
  if (isLoading) {
    return (
      <p className='text-center w-full text-black'>Loading....</p>
    );
  }

  return (
    <div>
      {data?.map(product => (
        <motion.section
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0)' }}
          exit={{ opacity: 0, filter: 'blur(5px)' }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          className='text-gray-600 py-20 px-5'
          key={product?._id}>
          <div className='container mx-auto h-full'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <Carousel
                transitionTime={500}
                autoPlay
                interval={5000}
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                useKeyboardArrows
                emulateTouch>
                {product?.image?.map(image => (
                  <div className='h-full' key={image.toString()}>
                    <img
                      width={300}
                      height={300}
                      src={urlFor(image).fit('max').format('jpg').maxWidth(350).maxHeight(350).toString()}
                      alt={product?.title}
                       />
                  </div>
                ))}
              </Carousel>
              <div className='w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                <small className='text-sm title-font text-gray-500 tracking-widest pb-1'>H&M</small>
                <h1 className='text-gray-900 text-3xl title-font font-bold mb-1 capitalize pb-2'>{product?.title}</h1>
                <p className='text-sm first-letter:uppercase'>{product?.description}</p>
                <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
                  <div className='flex'>
                    <span className='mr-3'>Color :</span>
                    <p>{product?.color}</p>
                  </div>
                  <div className='flex ml-6 items-center'>
                    <span className='mr-3'>Size</span>
                    <div className='relative'>
                      <select className='rounded border appearance-none border-gray-300 py-2 focus:outline-none  text-base pl-3 pr-10' onChange={e => setSelected(e.target.value)}>
                        {product?.size?.map((size: string) => (
                          <option key={size}>{size}</option>
                        ))}
                      </select>
                      <MdKeyboardArrowDown className='pointer-events-none absolute right-0 top-0 h-full w-8 text-gray-400 ' />
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='title-font font-medium md:font-bold text-2xl text-gray-900'>${product?.price}</span>
                  <button
                    className='flex space-x-3 gap-2 items-center ml-auto text-white bg-black border-0 py-2 px-6 focus:outline-none rounded-md'
                    onClick={() => addToCart(product)}
                    title={addedToCart ? 'Increase quantity' : 'Add to Cart'}>
                    {addedToCart ? (
                      'Added'
                    ) : (
                      <>
                        <p>Add to cart</p>
                        <AiOutlineShoppingCart size={20} />
                      </>
                    )}
                  </button>
                  <Buttons product={product} id={id} />
                </div>
              </div>
            </div>
          </div>
          <Recommended products={recommended} />
        </motion.section>
      ))}
      <Outlet />
    </div>
  );
};
export default Detail;
