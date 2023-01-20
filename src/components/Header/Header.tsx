import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Buttons } from './Buttons/Buttons';

export const Header: FC = () => {
  return (
    <header className='container mx-auto h-full text-black px-5'>
      <div className='w-full h-full flex justify-between items-center py-5'>
        <Link to='/' className='text-lg md:text-3xl font-extrabold uppercase header-title h-min'>
          fashion
        </Link>
        <Buttons />
      </div>
      <Navbar />
    </header>
  );
};
