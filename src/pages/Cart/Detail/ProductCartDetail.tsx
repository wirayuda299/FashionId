import { FC, useEffect, useState } from 'react';
import {
	AiOutlineHeart,
	AiOutlineMinus,
	AiOutlinePlus,
	AiFillHeart,
} from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { useStateContext } from '../../../context/StateContext';
import toast from 'react-hot-toast';

interface Props {
	item: Products;
}

export const ProductCartDetail: FC<Props> = ({ item }) => {
	const [addedToWishList, setAddedToWishList] = useState(false);
	const {
		dispatch,
		state: { wishLists },
	} = useStateContext();

	const decreaseQuantity = (product: Products) => {
		return dispatch({
			type: 'DECREASE-QUANTITY',
			payload: {
				_id: product._id,
			},
		});
	};
	const increaseQuantity = (product: Products) => {
		return dispatch({
			type: 'INCREASE-QUANTITY',
			payload: {
				_id: product._id,
			},
		});
	};
	const removeItem = (product: Products) => {
		const confirmDeleteItem = confirm(
			`Are you sure want to delete ${product.title} from your cart?`
		);
		if (confirmDeleteItem) {
			dispatch({
				type: 'REMOVE-FROM-CART',
				payload: {
					_id: product._id,
				},
			});
			toast.success(`${product.title} has been removed`);
		}
	};
	const addToWishList = (product: Products) => {
		const checkDuplicates = wishLists.find(
			(item: Products) => item._id === product._id
		);
		if (checkDuplicates) {
			return toast.error('This item already in your wishlist');
		}

		dispatch({ type: 'ADD-TO-WISHLIST', payload: { product } });
		toast.success('This item successfully added to wishlist');
	};
	const deleteWishListItem = (product: Products) => {
		dispatch({
			type: 'REMOVE-FROM-WISHLIST',
			payload: { product },
		});
		setAddedToWishList(false);
		toast.success('Item has been remove from your wish list');
	};

	useEffect(() => {
		const isInWishList = wishLists.find(
			(item: Products) => item._id === item._id
		);
		if (isInWishList) {
			setAddedToWishList(true);
		} else {
			setAddedToWishList(false);
		}
	}, [wishLists]);

	return (
		<section className='w-full md:px-5'>
			<div className='pt-3'>
				<span className='text-xs'>H&M</span>
				<h2 className='font-bold text-xl sm:text-2xl   cartItem-title capitalize'>
					{item?.title}
				</h2>
			</div>
			<div className='flex justify-between items-center space-y-1 w-full py-2'>
				<div className='w-full'>
					<p className='text-left text-sm text-gray-500'>
						Price: ${item?.price}
					</p>
				</div>
				<div className='flex items-center space-x-2 gap-2 w-full'>
					<button title='remove item' onClick={() => removeItem(item)}>
						<BsTrash className='text-2xl' />
					</button>
					<button>
						{addedToWishList ? (
							<AiFillHeart
								size={28}
								color='red'
								title='remove from wish list'
								onClick={() => deleteWishListItem(item)}
							/>
						) : (
							<AiOutlineHeart
								title='Add to wish list'
								size={28}
								onClick={() => addToWishList(item)}
							/>
						)}
					</button>
				</div>
			</div>
			<div>
				<div className='flex space-x-2 items-center'>
					<p className='text-left text-sm  text-gray-500'>
						Color: {item?.color}
					</p>
					<div
						className='w-5 h-5 rounded-full border'
						style={{
							backgroundColor: item?.hex,
						}}
					></div>
				</div>
				<p className='text-left text-sm pt-1 text-gray-500'>
					Size: {item.selectedSize}
				</p>
			</div>
			<div className='pt-4 flex space-x-3 pb-5 text-gray-500'>
				<p className='text-left text-sm pt-1 text-gray-500'>Quantity : </p>
				<button
					title='decrease quantity'
					className='border rounded-lg p-1 shadow-lg'
					onClick={() => decreaseQuantity(item)}
				>
					<AiOutlineMinus size={15} />
				</button>
				<span className='px-2 text-sm font-semibold'>{item.quantity}</span>
				<button
					title='increase quantity'
					className='border rounded-lg p-1 shadow-lg'
					onClick={() => increaseQuantity(item)}
				>
					<AiOutlinePlus size={15} />
				</button>
			</div>
		</section>
	);
};
