import { FC } from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../../config/client';
import { motion } from 'framer-motion';
import { AiOutlineArrowRight } from 'react-icons/ai';

interface Props {
  img: string
  title: string
  author: string
  paragraf: string,
  createdAt: string
}

const BlogCard: FC<Props> = ({ title, img, paragraf, author, createdAt }) => {
  const pastDate = new Date(createdAt);
  const now = new Date();
  const timeDiff = now.getTime() - pastDate.getTime();
  const daysPassed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0)', }}
      transition={{ ease: 'easeOut', duration: 0.4, }}
      className="bg-white  shadow-md border border-gray-200 rounded-lg w-full aspect-square relative"
      title={title}>
      <div className='flex px-2 items-center py-2 justify-between w-full absolute top-0'>
        <p className='text-gray-400 text-xs'>{author}</p>
        <p className='text-xs text-gray-400'>{daysPassed} days ago</p>
      </div>
      <img
        className="w-full aspect-square"
        width={300}
        height={300}
        src={urlFor(img[0]).toString()} alt="" />
      <div className="p-5">
        <h5 className="truncate text-gray-900 sm:font-semibold text-base pb-2">{title}</h5>
        <p className="font-normal text-gray-700 mb-3 truncate text-sm">{paragraf}</p>
        <Link to={`/blog/${title}`}
          className="text-white bg-black bg-opacity-90 hover:bg-opacity-100 transition-all ease duration-300 font-medium rounded-lg text-xs px-3 py-2 text-center flex gap-2 w-max items-center">
          Read more
          <AiOutlineArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
