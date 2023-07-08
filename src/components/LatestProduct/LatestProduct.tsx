import { useEffect, useState, FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from '../Card';
import { client } from '../../config/client';
import { useQuery } from '@tanstack/react-query';
import ProductLoader from '../Loader/ProductLoader';

export const LatestProduct = () => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	const { data, isError, isLoading } = useQuery(
		['latest product'],
		async () => {
			return (await client.fetch(
				'*[_type == "product" ][0..5] | order(_createdAt asc)'
			)) as Products[];
		},
		{
			staleTime: 60000,
		}
	);

	if (isError) {
		return (
			<p className='text-center w-full text-black'>
				Something went wrong, please try again later
			</p>
		);
	}

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

	return (
		<div className='w-full h-full max-w-5xl mx-auto'>
			<div className='w-full'>
				<h2 className='text-xl sm:text-3xl md:text-4xl text-center font-extrabold py-14 uppercase text-black'>
					Latest Products
				</h2>
			</div>
			<div className='w-full h-full max-w-4xl mx-auto '>
				{isLoading ? (
					<ProductLoader />
				) : (
					<Carousel
						autoPlay
						infiniteLoop
						showStatus={false}
						showThumbs={false}
						centerMode={windowWidth >= 600}
						interval={5000}
						swipeable={false}
						centerSlidePercentage={windowWidth >= 768 ? 55 : 100}
						showIndicators={false}
						showArrows={false}
					>
						{data?.map((product) => (
							<div key={product?._id} className='mx-5 md:mx-3'>
								<Card
									image={product?.preview}
									title={product?.title}
									price={product?.price}
									id={product?._id}
									model={true}
									category={product.category}
									gender={product.gender}
									isTopSell={product.tags.includes('top selling')}
								/>
							</div>
						))}
					</Carousel>
				)}
			</div>
		</div>
	);
};
