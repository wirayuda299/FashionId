import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import hero from '../../../assets/images/heroMen1.jpg';
import Card from '../../../components/Card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useGetTopSellByGender } from '../../../hooks/useGetTopSell';

const Men: FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { data, isLoading, isError } = useGetTopSellByGender('male');

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWindowWidth(prev => prev);
      });
    };
  }, [windowWidth]);

  if (isError) {
    return (
      <p className='text-center w-full text-black'>
        Something went wrong, please try again
        later
      </p>
    );
  }
  if (isLoading) {
    return (
      <p className='text-center w-full text-black'>
        Loading....
      </p>
    );
  }
  return (
    <motion.section
      initial={{ opacity: 0, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0)' }}
      transition={{ ease: 'easeOut', duration: 0.4 }}
      className='text-black'>
      <div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
        <div className='max-w-4xl '>
          <img
            className=' mb-10 object-cover object-center rounded'
            alt='hero'
            src={hero}
          />
        </div>
        <div className='text-center lg:w-2/3 w-full'>
          <h1 className='font-extrabold sm:text-4xl text-3xl mb-4 text-black'>
            Men's Style for the Modern Man
          </h1>
          <p className='mb-8 text-gray-600 text-sm sm:text-base'>
            Elevate your style game with our
            collection of fashionable men's
            apparel. From sleek suits to trendy
            streetwear, we've got you covered with
            the latest styles and trends. Whether
            you're heading to the office or
            hitting the town, our selection of
            stylish clothes will help you make a
            statement. Be a fashion hero with our
            curated collection of men's fashion
          </p>
          <div className='flex justify-center'>
            <Link
              to='/men/products'
              className=' text-white bg-black border-0 py-2 px-6 focus:outline-none rounded text-lg'>
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
            showStatus>
            { data?.map(product => (
              <Card
                key={product._id}
                image={product.preview}
                title={product.title}
                price={product.price}
                id={product._id}
                gender={product.gender}
                category={product.category}
                isTopSell={product.tags.includes(
                  'top selling'
                )}
                model={true}
              />
            ))}
          </Carousel>
        </div>
      </section>
    </motion.section>
  );
};

export default Men;
