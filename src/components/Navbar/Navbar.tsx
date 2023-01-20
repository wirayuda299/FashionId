import { useState, FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { RiMenu3Fill } from 'react-icons/ri';
import { SearchInput } from '../SearchInput/SearchInput';

interface Lists {
  id: number;
  name: string;
  path: string;
}
export const Navbar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const list: Lists[] = [
    {
      id: 1,
      name: 'Home',
      path: '/'
    },
    {
      id: 2,
      name: 'Ladies',
      path: '/ladies'
    },
    {
      id: 3,
      name: 'Men',
      path: '/men'
    },

  ];

  return (
    <nav className='navbar w-full relative md:static h-20 py-0 px-5 transition-all ease duration-500 mt-0 md:justify-center md:text-black flex justify-between items-center md:border-b'>
      <button
        className='bg-transparent absolute right-5 border-none outline-none text-base cursor-pointer md:hidden'
        onClick={() => setOpen(!open)}
        name='menu'
        title='menu'>
        <RiMenu3Fill size={25} color='#000' className={`${open ? 'hidden' : 'block'}`} />
      </button>
      <ul
        className={`flex flex-col w-full h-screen backdrop-blur-sm list-none bg-black opacity-95 fixed top-0 py-10 md:py-0  px-0  z-50 transition-all ease duration-500  md:flex-row md:justify-center md:static md:items-center md:bg-transparent md:backdrop-blur-0 md:w-min md:h-min md:mt-4 md:mr-auto ${open ? '-left-0' : '-left-full'}`}>
        <button
          onClick={() => setOpen(!open)}
          title='close'
          className='bg-transparent absolute border-none top-[30px] right-[30px] cursor-pointer text-white transition-all md:hidden '>
          <AiOutlineClose size={30} color='#fff' className='transition-all active:rotate-45' />
        </button>
        {list.map(item => (
          <NavLink
            onClick={() =>  setOpen(!open)}
            to={item.path}
            title={item.name}
            key={item.id}
            className={`navlink no-underline text-white uppercase text-base font-semibold  text-center w-min my-5 mx-auto flex items-center justify-center transition-all py-1 px-3 rounded-md md:hover:text-slate-600  md:capitalize relative md:static md:rounded-none md:mt-0 md:py-0 md:tracking-normal md:mx-2 md:text-sm md:text-black md:font-light ${open ? `list${item?.id}` : ''
            }`}>
            {item.name}
          </NavLink>
        ))}
      </ul>
      <SearchInput />
    </nav>
  );
};
