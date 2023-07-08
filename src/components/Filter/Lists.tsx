import type { Dispatch, SetStateAction } from 'react';

import { sortMenu } from '../../data/sortMenuLists';
import { Props } from './Filter';

type FilterListsProps = {
	clicked: boolean;
	setClicked: Dispatch<SetStateAction<boolean>>;
};

export default function FilterLists({
	selectedSort,
	setSelectedSort,
	clicked,
	setClicked,
}: Props & FilterListsProps) {
	return (
		<ul
			className={`bg-white p-3 w-max border rounded-md  ${
				clicked ? 'absolute z-10' : 'hidden'
			}`}
		>
			{sortMenu.map((menu) => (
				<li
					key={menu.id}
					onClick={() => setSelectedSort(menu.title)}
					title={menu.value}
					onMouseEnter={() => setClicked(true)}
					className={`py-1 truncate pr-5 text-left list-item cursor-pointer transition-all ease-linear duration-300 hover:bg-slate-100 w-full text-xs ${
						selectedSort === menu.title ? 'border-r-2 border-black' : ''
					}`}
				>
					{menu.value}
				</li>
			))}
		</ul>
	);
}
