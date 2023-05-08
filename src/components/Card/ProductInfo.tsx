import { FC } from "react";

type Props  ={
  title: string;
  price: number;
  isTopSell: boolean;
  category: string;
}
const ProductInfo:FC<Props> = ({isTopSell, price, title, category}) => {
  return (
    <div className='w-full'>
          <div>
            <small className='text-gray-400 capitalize '>{isTopSell ? `Top Selling-${category}` : category}
            </small>
            <h2 className='w-full text-sm font-medium sm:font-semibold sm:pb-2 truncate capitalize'>
              {title}
            </h2>
            <p className='text-gray-400 text-sm'>
              ${price}
            </p>
          </div>
        </div>
  )
}
export default ProductInfo