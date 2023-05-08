
import {  type Dispatch, type FC, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { sortMenu } from '../../data/sortMenuLists';

interface Props {
  setSelectedSort: Dispatch<React.SetStateAction<string>>;
  selectedSort: string;
}

export const Filter: FC<Props> = ({ setSelectedSort, selectedSort }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <section className='h-full w-full pt-1 transition-all ease duration-500'>
      <div className=' h-full relative w-full flex flex-col'>
        <button className='flex items-center' onClick={() => setClicked(!clicked)}>
          <p className='uppercase font-bold text-xs text-center leading-4 truncate'>Sort by</p>
          {clicked ? (
            <IoMdArrowDropup size={20} color='black' />
          ) : (
            <IoMdArrowDropdown size={20} color='black' />
          )}
        </button>
      </div>
      <ul className={`bg-white p-3 w-max border rounded-md  ${clicked ? 'absolute z-10' : 'hidden'}`}>
        {sortMenu.map(menu => (
          <li
            key={menu.id}
            onClick={() => setSelectedSort(menu.title)}
            title={menu.value}
            onMouseEnter={() => setClicked(true)}
            className={`py-1 truncate pr-5 text-left list-item cursor-pointer transition-all ease-linear duration-300 hover:bg-slate-100 w-full text-xs ${selectedSort === menu.title ? 'border-r-2 border-black' : ''}`}>
            {menu.value}
          </li>
        ))}
      </ul>
    </section>
  );
};
