import { FC } from 'react';
import { AiFillCreditCard, AiOutlineStar } from 'react-icons/ai';
import { IoPaperPlaneOutline } from 'react-icons/io5';

interface OverViewText {
  id: number;
  title: string;
  icon: JSX.Element;
}
export const Overview: FC = () => {
  const text: OverViewText[] = [
    {
      id: 1,
      title: 'Fast secure payments',
      icon: <AiFillCreditCard size={30} />
    },
    {
      id: 2,
      title: 'Premium Products',
      icon: <AiOutlineStar size={45} />
    },
    {
      id: 3,
      title: 'Free and fast delivery',
      icon: <IoPaperPlaneOutline size={30} />
    }
  ];
  return (
    <div className='w-full max-w-5xl h-full grid grid-cols-1 md:grid-cols-3 place-items-center mx-auto'>
      {text.map(item => (
        <div key={item.id} className={`w-full h-28 ${item?.id !== 2 ? 'bg-white' : 'bg-black'} flex justify-center items-center `}>
          <h2 className={`text-base sm:text-xl truncate p-3 font-semibold flex items-center uppercase ${item?.id !== 2 ? 'text-black' : 'text-white'}`}>
            <span className='pr-2'>{item?.icon}</span>
            {item?.title}
          </h2>
        </div>
      ))}
    </div>
  );
};
