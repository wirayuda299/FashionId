
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import hero1 from '../../assets/images/hero1.jpg';
import hero2 from '../../assets/images/hero2.jpg';

interface Images {
  id: number;
  title: string;
  text: string;
  image: string;
}
export const Hero: FC = () => {
  const images: Images[] = [
    {
      id: 1,
      title: 'Discover Your Next Favorite Thing',
      text: "Welcome to our online marketplace! Browse through our wide selection of products and find everything you need and more. From clothing and accessories and gifts, we've got it all. Start your shopping journey with us today",
      image: hero1
    },
    {
      id: 2,
      title: 'Find Your Perfect Match',
      text: 'Looking for the perfect gift or something for yourself? Look no further! Our online store has a wide variety of products to choose from, including clothing, sneakers, and more. Shop with us and find something special.',
      image: hero2
    }
  ];
  return (
    <Carousel
      autoPlay
      infiniteLoop
      swipeable={false}
      transitionTime={800}
      showThumbs={false}
      interval={10000}
      showIndicators={false}
      showStatus={false}
      showArrows={false}>
      {images.map((image: Images) => (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0)' }}
          transition={{ ease: 'easeOut', duration: 0.4 }}
          className='w-full h-screen relative p-5'
          key={image?.id}>
          <img src={image?.image} alt='hero' className='w-full h-full object-cover object-center rounded-md' />
          <div className='absolute transition-all ease duration-500 w-full max-w-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
            <article className='w-full flex justify-between h-full p-5 text-white'>
              <section className='max-w-2xl h-full p-5'>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'easeOut', duration: 0.5 }}
                    className='text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase pb-3 title text-left '>
                    {image.title}
                  </motion.h1>
                  <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ease: 'easeOut', duration: 0.6 }} className='text-sm md:text-lg pb-5 desc text-left'>
                    {image.text}
                  </motion.p>
                </div>
              </section>
            </article>
          </div>
        </motion.div>
      ))}
    </Carousel>
  );
};
