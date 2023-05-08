import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import type  { FC } from 'react';
import FooterLinks from './FooterLinks';

interface Icons {
  id: number;
  icon: JSX.Element;
}

export const Footer: FC = () => {
  const icons: Icons[] = [
    {
      id: 1,
      icon: <FaFacebookF color='#000' size={15} />
    },
    {
      id: 2,
      icon: <FaInstagram color='#000' size={15} />
    },
    {
      id: 3,
      icon: <FaTwitter color='#000' size={15} />
    },
    {
      id: 4,
      icon: <FaLinkedin color='#000' size={15} />
    }
  ];

  return (
    <footer className='w-full h-auto flex flex-col justify-center items-center mx-auto  px-4 transition-all ease duration-500  bg-black text-white '>
      <div className=' flex border-b pb-4 justify-center items-center container max-w-4xl p-5 transition-all flex-col '>
        <h2 className='text-lg font-bold uppercase'>Fashion</h2>
        <div className='flex w-full justify-center items-center h-full p-5 transition-all'>
          {icons.map(item => (
            <div key={item.id} className='bg-[#ffef5eff] p-2 rounded-lg my-0 mx-3 transition-all'>
              {item.icon}
            </div>
          ))}
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
};
