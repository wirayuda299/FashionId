import { FC, useEffect, useState } from 'react';
import heroLg from '../../../assets/images/heroLG.jpg';
import { Link } from 'react-router-dom';
import Card from '../../../components/Card';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import { useGetTopSellByGender } from '../../../hooks/useGetTopSell';
import Error from '../../../components/Error/Error';
import BannerLoader from '../../../components/Loader/Banner';

const Ladies: FC = () => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const { data, isError, isLoading } = useGetTopSellByGender('female');

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWindowWidth(window.innerWidth);
		});
		return () => {
			window.removeEventListener('resize', () => {
				setWindowWidth((prev) => prev);
			});
		};
	}, [windowWidth]);

	if (isError) return <Error />;

	if (isLoading) return <BannerLoader />;

	return (
		<motion.section
			initial={{ opacity: 0, filter: 'blur(5px)' }}
			whileInView={{ opacity: 1, filter: 'blur(0)' }}
			transition={{ ease: 'easeOut', duration: 0.4 }}
			className='text-black'
		>
			<div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
				<div className='max-w-4xl '>
					<img
						className=' mb-10 object-cover object-center rounded'
						alt='hero'
						src={heroLg}
					/>
				</div>
				<div className='text-center lg:w-2/3 w-full'>
					<h1 className='font-extrabold sm:text-4xl text-3xl mb-4 text-black'>
						Fashionable Clothing for Women
					</h1>
					<p className='mb-8 text-gray-600 text-sm sm:text-base'>
						Step up your style game with our newest line of fashionable clothing
						for women. From trendy tops and dresses to stylish pants and skirts,
						we've got you covered for any occasion. Whether you're looking for a
						statement piece to elevate your everyday wardrobe or something chic
						and elegant for a special event, our selection of high-quality
						fabrics and attention to detail will have you looking and feeling
						your best. Don't miss out on the chance to upgrade your closet shop
						now and make a fashion statement that's all your own.
					</p>
					<div className='flex justify-center'>
						<Link
							to='/ladies/products'
							className=' text-white bg-black border-0 py-2 px-6 focus:outline-none rounded text-lg'
						>
							Shop Now
						</Link>
					</div>
				</div>
			</div>
			<section className='pb-24 max-w-4xl mx-auto'>
				<h2 className='text-xl sm:text-3xl md:text-4xl text-center p-5 font-extrabold'>
					Top Selling
				</h2>
				<div className='max-w-4xl mx-auto'>
					<Carousel
						autoPlay
						infiniteLoop
						showThumbs={false}
						centerMode={windowWidth >= 600}
						interval={5000}
						centerSlidePercentage={windowWidth >= 768 ? 55 : 100}
						showIndicators={false}
						showArrows={false}
						showStatus
					>
						{data?.map((product) => (
							<Card
								key={product._id}
								image={product.preview}
								title={product.title}
								price={product.price}
								id={product._id}
								gender={product.gender}
								category={product.category}
								isTopSell={product.tags.includes('top selling')}
								model={true}
							/>
						))}
					</Carousel>
				</div>
			</section>
		</motion.section>
	);
};

export default Ladies;
