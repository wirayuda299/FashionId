import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { urlFor } from '../../../../config/client';
import { auth } from '../../../../config/firebase';
import { useStateContext } from '../../../context/StateContext';
import { Products } from '../../../types/Product';

export const Buttons = () => {
  const { state: { wishLists, cartItems, user } } = useStateContext();
  const [clicked, setClicked] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [processing, setProcessing] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    let curr: string | null = ''
    if (user) {
      curr = user && user.displayName ? user?.displayName : user.email && user?.email.slice(0, user?.email.indexOf('@'))
    }
    setCurrentUser(curr)
  }, [user])

  const logOut = async () => {
    try {
      setProcessing(true);
      await signOut(auth).then(() => {
        localStorage.clear();
        navigate('/login');
        setClicked(false);
        setProcessing(false);
        toast.success('success logout');
      });
      return;
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    document.body.addEventListener('click', () => {
      setHidden(true);
    });
    return () => {
      document.body.removeEventListener('click', () => {
        setHidden(true);
      });
    };
  }, [hidden]);

  return (
    <div className='flex space-x-2'>
      <div className='flex space-x-3 items-center'>
        <div className='relative flex flex-col'>
          <button
            className='flex items-center'
            onClick={() => setClicked(!clicked)}>
            <p className='uppercase font-bold text-xs text-center leading-4'>{currentUser}</p>
            {clicked ? <IoMdArrowDropup size={20} color='black' /> : <IoMdArrowDropdown size={20} color='black' />}
          </button>
          <div className={`w-full h-auto bg-white absolute top-7 -right-4 transition-all ease duration-300 rounded-md ${clicked ? 'opacity-1' : 'opacity-0'}`}>
            <button className={`text-xs py-1 truncate bg-black rounded-md text-white font-medium h-full px-3 text-center ${processing ? 'cursor-wait' : 'cursor-pointer'}`} onClick={logOut}>
              {processing ? 'Please wait...' : 'Sign out'}
            </button>
          </div>
        </div>
      </div>
      <div className='relative transition-all h-full'>
        <Link
          to='/wishlist'
          title={`Your have  ${wishLists.length} of wish list ${wishLists.length === 1 ? 'item' : 'items'}`}
          onMouseEnter={() => setHidden(false)}>
          <AiOutlineHeart className='text-xl md:text-2xl' />
        </Link>
        <div className='absolute overflow-y-auto max-h-24  top-8 -left-48 z-10 bg-white shadow-md w-56 sm:w-64'>
          {wishLists.length < 1
            ? null
            : wishLists.map((item: Products) => (
              <Link to='/wishlist' key={item._id} className={`${hidden ? 'hidden' : 'flex border-b mb-1 items-center space-x-3'}`}>
                <div>
                  <img className='rounded aspect-square' src={urlFor(item.preview[0]).toString()} width='50' height='50' alt='' />
                </div>
                <p className='text-xs text-center truncate'>{item.title}</p>
              </Link>
            ))}
        </div>
      </div>
      <Link to='/cart' className='flex items-center gap-1 relative text-xs'>
        <button className='relative flex' title='cart' name='cart'>
          <span className={`absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center text-white rounded-full bg-black ${cartItems.length < 1 ? 'hidden' : 'block'}`}>
            {cartItems?.length}
          </span>
          <FiShoppingBag className='text-xl md:text-2xl' />
        </button>
      </Link>
    </div>
  );
};
