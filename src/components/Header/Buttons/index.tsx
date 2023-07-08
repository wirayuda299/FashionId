import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../../../context/StateContext';
import LogOutButton from './LogOutButton';
import WishLists from '../WishLists';
import CartButton from './cartButton';

export const Buttons = () => {
	const {
		state: { wishLists, cartItems, user },
	} = useStateContext();
	const [clicked, setClicked] = useState<boolean>(false);
	const [hidden, setHidden] = useState<boolean>(true);
	const [currentUser, setCurrentUser] = useState<string | null>(null);
	const [processing, setProcessing] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		let curr: string | null = '';
		if (user) {
			curr =
				user && user.displayName
					? user?.displayName
					: user.email && user?.email.slice(0, user?.email.indexOf('@'));
		}
		setCurrentUser(curr);
	}, [user]);

	useEffect(() => {
		document.body.addEventListener('click', () => {
			setHidden(true);
		});
		return () => {
			document.body.removeEventListener('click', () => {
				setHidden(true);
			});
		};
	}, []);

	return (
		<div className='flex space-x-2'>
			<div className='flex space-x-3 items-center'>
				<div className='relative flex flex-col'>
					<button
						name={`${clicked ? 'hide' : 'show'}`}
						title={`${clicked ? 'hide' : 'show'}`}
						className='flex items-center'
						onClick={() => setClicked(!clicked)}
					>
						<p className='uppercase font-bold text-xs text-center leading-4'>
							{currentUser}
						</p>
						{clicked ? (
							<IoMdArrowDropup size={20} color='black' />
						) : (
							<IoMdArrowDropdown size={20} color='black' />
						)}
					</button>
					<LogOutButton
						clicked={clicked}
						navigate={navigate}
						processing={processing}
						setClicked={setClicked}
						setProcessing={setProcessing}
					/>
				</div>
			</div>
			<div className='relative transition-all h-full'>
				<Link
					to='/wishlist'
					title={`Your wish lists `}
					onMouseEnter={() => setHidden(false)}
				>
					<AiOutlineHeart className='text-xl md:text-2xl' />
				</Link>
				<WishLists hidden={hidden} wishLists={wishLists} />
			</div>
			<CartButton cartItems={cartItems} />
		</div>
	);
};
