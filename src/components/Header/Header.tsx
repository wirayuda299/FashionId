import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Buttons } from './Buttons';

export const Header = () => {
	return (
		<header className='container mx-auto h-full text-black px-5 w-full bg-white'>
			<div className='w-full h-full flex justify-between items-center py-5'>
				<Link
					to='/'
					className='text-lg md:text-3xl font-extrabold uppercase header-title h-min'
				>
					fashion
				</Link>
				<Buttons />
			</div>
			<Navbar />
		</header>
	);
};
