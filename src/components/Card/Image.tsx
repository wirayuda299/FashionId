import type { FC } from 'react';
import { urlFor } from '../../config/client';

type Props = {
	image: string;
	title: string;
	model?: boolean;
};
const ProductImage: FC<Props> = ({ image, title, model }) => {
	return (
		<div className='w-full h-min aspect-square relative overflow-hidden'>
			<img
				width='500'
				className='object-cover'
				height='500'
				onMouseEnter={(e) =>
					model
						? (e.currentTarget.src = urlFor(image[1]).format('jpg').toString())
						: (e.currentTarget.src = urlFor(image[0]).format('jpg').toString())
				}
				onMouseLeave={(e) =>
					model
						? (e.currentTarget.src = urlFor(image[0]).format('jpg').toString())
						: (e.currentTarget.src = urlFor(image[1]).format('jpg').toString())
				}
				src={
					model
						? urlFor(image[0]).format('jpg').toString()
						: urlFor(image[1]).format('jpg').toString()
				}
				alt={title}
			/>
		</div>
	);
};

export default ProductImage;
