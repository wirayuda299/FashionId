import type { FC } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const cartButton: FC<{ cartItems: Products[] }> = ({ cartItems }) => {
	return (
		<Link to='/cart' className='flex items-center gap-1 relative text-xs'>
			<button className='relative flex' title='cart' name='cart'>
				<span
					className={`absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center text-white rounded-full bg-black ${
						cartItems.length < 1 ? 'hidden' : 'block'
					}`}
				>
					{cartItems?.length}
				</span>
				<FiShoppingBag className='text-xl md:text-2xl' />
			</button>
		</Link>
	);
};
export default cartButton;
