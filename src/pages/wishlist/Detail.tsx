import type { FC } from 'react';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { urlFor } from '../../config/client';
import { useStateContext } from '../../context/StateContext';

const Detail: FC<{ item: Products }> = ({ item }) => {
	const { dispatch } = useStateContext();
	return (
		<div
			className='container mx-auto h-full flex justify-center sm:justify-between items-center '
			key={item._id}
		>
			<div className='sm:w-full pb-3 flex flex-col sm:flex-row justify-center items-center sm:justify-between border-b  mt-5'>
				<div className='sm:p-5 sm:mr-auto '>
					<img
						src={urlFor(item.preview[0]).toString()}
						className='rounded-md'
						alt={item.title}
						width={300}
					/>
				</div>
				<div className='w-full pb-3 sm:flex sm:items-center '>
					<div className=' w-full sm:flex sm:flex-1'>
						<small className='text-gray-400 capitalize sm:hidden'>
							{item.category}
						</small>
						<h3 className='w-full sm:text-center font-semibold'>
							{item.title}
						</h3>
						<p className='text-gray-400 text-sm sm:text-center sm:w-full'>
							${item.price}
						</p>
						<div className='w-full h-full flex justify-between items-center mt-4 sm:mt-0'>
							<Link
								to={`/products/${item.gender}/${item._id}`}
								className='sm:w-full h-full truncate text-xs'
							>
								View Details
							</Link>
							<button
								className='sm:w-full h-full'
								onClick={() =>
									dispatch({
										type: 'REMOVE-FROM-WISHLIST',
										payload: {
											product: item,
										},
									})
								}
							>
								<BsTrash size={25} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Detail;
