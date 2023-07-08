import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../config/client';

type WishListsProps = {
	wishLists: Products[];
	hidden: boolean;
};

const WishLists: FC<WishListsProps> = ({ wishLists, hidden }) => {
	return (
		<div className='absolute overflow-y-auto max-h-24  top-8 -left-48 z-10 bg-white shadow-md w-56 sm:w-64'>
			{wishLists.length < 1
				? null
				: wishLists.map((item) => (
						<Link
							to='/wishlist'
							key={item._id}
							className={`${
								hidden ? 'hidden' : 'flex border-b mb-1 items-center space-x-3'
							}`}
						>
							<div>
								<img
									className='rounded aspect-square'
									src={urlFor(item.preview[0]).toString()}
									width='50'
									height='50'
									alt='wish lists'
								/>
							</div>
							<p className='text-xs text-center truncate'>{item.title}</p>
						</Link>
				  ))}
		</div>
	);
};
export default WishLists;
