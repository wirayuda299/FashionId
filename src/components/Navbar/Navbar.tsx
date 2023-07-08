import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiMenu3Fill } from 'react-icons/ri';
import { SearchInput } from '../SearchInput/SearchInput';
import NavLists from './NavLists';

export const Navbar = () => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<nav className='navbar w-full relative md:static h-20 py-0 px-5 transition-all ease duration-500 mt-0 md:justify-center md:text-black flex justify-between items-center md:border-b'>
			<button
				className='bg-transparent absolute right-5 border-none outline-none text-base cursor-pointer md:hidden'
				onClick={() => setOpen(!open)}
				name='menu'
				title='menu'
			>
				<RiMenu3Fill
					size={25}
					color='#000'
					className={`${open ? 'hidden' : 'block'}`}
				/>
			</button>
			<ul
				className={`flex flex-col w-full h-screen backdrop-blur-sm list-none bg-black opacity-95 fixed top-0 py-10 md:py-0  px-0  z-50 transition-all ease duration-500  md:flex-row md:justify-center md:static md:items-center md:bg-transparent md:backdrop-blur-0 md:w-min md:h-min md:mt-4 md:mr-auto ${
					open ? '-left-0' : '-left-full'
				}`}
			>
				<button
					name='close'
					onClick={() => setOpen((prev) => !prev)}
					title='close'
					className='bg-transparent absolute border-none top-[30px] right-[30px] cursor-pointer text-white transition-all md:hidden '
				>
					<AiOutlineClose
						size={30}
						color='#fff'
						className='transition-all active:rotate-45'
					/>
				</button>
				<NavLists open={open} setOpen={setOpen} />
			</ul>
			<SearchInput />
		</nav>
	);
};
