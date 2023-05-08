import { FC, useEffect, useState } from 'react';
import { Products } from '../../types/Product';
import { Carousel } from 'react-responsive-carousel';
import Card from '../Card';

interface Props {
  products: Products[];
}

export const Recommended: FC<Props> = ({ products }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
      });
    }
  }, [])


  return (
    <section className='max-w-4xl mx-auto h-full mt-5'>
      <h2 className='font-bold text-2xl py-16 md:text-4xl text-center capitalize text-black '>
        Recommended Products
      </h2>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        centerMode={windowWidth >= 600}
        interval={6000}
        centerSlidePercentage={windowWidth >= 768 ? 50 : 100}
        showIndicators={false}
        showArrows={true}>
        {products.map(product => (
          <div
            key={product._id}
            className='mx-5 md:mx-3 w-[350px]'>
            <Card
              image={product?.preview}
              title={product?.title}
              price={product?.price}
              id={product?._id}
              category={product.category}
              gender={product.gender}
              model={true}
              isTopSell={product.tags.includes('top selling')}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};
