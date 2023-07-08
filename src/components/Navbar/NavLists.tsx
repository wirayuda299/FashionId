import type { Dispatch, FC, SetStateAction } from 'react';
import { list } from '../../data/navLists';
import { NavLink } from 'react-router-dom';

interface IProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavLists: FC<IProps> = ({ open, setOpen }) => {
	return (
		<>
			{list.map((item) => (
				<NavLink
					onClick={() => setOpen(!open)}
					to={item.path}
					title={item.name}
					key={item.id}
					className={`navlink no-underline text-white uppercase text-base font-semibold  text-center w-min my-5 mx-auto flex items-center justify-center transition-all py-1 px-3 rounded-md md:hover:text-slate-600  md:capitalize relative md:static md:rounded-none md:mt-0 md:py-0 md:tracking-normal md:mx-2 md:text-sm md:text-black md:font-light ${
						open ? `list${item?.id}` : ''
					}`}
				>
					{item.name}
				</NavLink>
			))}
		</>
	);
};
export default NavLists;
