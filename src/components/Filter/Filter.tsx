import { type Dispatch, type FC, useState, SetStateAction } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import FilterLists from './Lists';

export type Props = {
	setSelectedSort: Dispatch<SetStateAction<string>>;
	selectedSort: string;
};

export const Filter: FC<Props> = ({ setSelectedSort, selectedSort }) => {
	const [clicked, setClicked] = useState<boolean>(false);

	return (
		<section className='h-full w-full pt-1 transition-all ease duration-500'>
			<div className=' h-full relative w-full flex flex-col'>
				<button
					name='sort'
					title='sort'
					className='flex items-center'
					onClick={() => setClicked(!clicked)}
				>
					<p className='uppercase font-bold text-xs text-center leading-4 truncate'>
						Sort by
					</p>
					{clicked ? (
						<IoMdArrowDropup size={20} color='black' />
					) : (
						<IoMdArrowDropdown size={20} color='black' />
					)}
				</button>
			</div>
			<FilterLists
				clicked={clicked}
				selectedSort={selectedSort}
				setClicked={setClicked}
				setSelectedSort={setSelectedSort}
			/>
		</section>
	);
};
