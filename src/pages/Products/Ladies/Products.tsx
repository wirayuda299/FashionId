import { FC, useState } from 'react';
import Card from '../../../components/Card';
import { Filter } from '../../../components/Filter/Filter';
import { useStateContext } from '../../../context/StateContext';
import { motion } from 'framer-motion';
import { useFetchProducts } from '../../../hooks/useFetchProduct';
import ProductLoader from '../../../components/Loader/ProductLoader';

const LadiesProduct: FC = () => {
	const [selectedSort, setSelectedSort] = useState<string>('asc');
	const [isModel, setIsModel] = useState<boolean>(true);
	const [title, setTitle] = useState<string>('Explore our products');
	const {
		state: { newArrivals, selectedLadiesCategory },
	} = useStateContext();

	const { data, isError, isLoading } = useFetchProducts(
		'female',
		selectedSort,
		selectedLadiesCategory,
		newArrivals
	);
	if (isLoading) return <ProductLoader />;

	if (isError) {
		return (
			<p className='text-center w-full text-black'>
				Something went wrong, please try again later
			</p>
		);
	}

	return (
		<motion.section
			initial={{ opacity: 0, filter: 'blur(5px)' }}
			whileInView={{ opacity: 1, filter: 'blur(0)' }}
			transition={{ ease: 'easeOut', duration: 0.4 }}
			className='w-full h-full text-gray-600 p-5'
		>
			<div className='container mx-auto'>
				<div className='w-full '>
					<div className='w-full text-center'>
						<h2 className='font-bold text-xl text-black sm:text-2xl'>
							{selectedLadiesCategory === 'All'
								? title
								: `All ${selectedLadiesCategory}`}
						</h2>
						<div className='flex h-16  max-w-5xl justify-between px-9 sm:px-0  mx-auto items-center '>
							<div>
								<Filter
									setSelectedSort={setSelectedSort}
									selectedSort={selectedSort}
								/>
							</div>
							<div className='flex items-center space-x-3'>
								<p className='text-xs truncate'>
									<span>{data?.length} </span>
									{data != null && data?.length > 1 ? 'items' : 'item'}
								</p>
								<div className='flex space-x-3'>
									<button
										className={`text-xs sm-text-sm  ${
											isModel ? 'border-b border-black' : ''
										}`}
										onClick={() => setIsModel(true)}
									>
										Model
									</button>
									<button
										className={`text-xs sm-text-sm ${
											isModel ? '' : 'border-b border-black'
										}`}
										onClick={() => setIsModel(false)}
									>
										Product
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='w-full h-full'>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
							{data?.map((product) => (
								<Card
									key={product?._id}
									image={product?.preview}
									title={product?.title}
									price={product?.price}
									id={product?._id}
									gender={product.gender}
									category={product.category}
									isTopSell={product.tags.includes('top selling')}
									model={isModel}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</motion.section>
	);
};
export default LadiesProduct;
