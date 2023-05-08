
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import { images } from '../../data/carouselData';



export const Hero: FC = () => {

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
      {images.map((image) => (
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
