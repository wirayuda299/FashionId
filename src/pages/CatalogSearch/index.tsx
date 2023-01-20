import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import Card from '../../components/Card/Card';
import { Filter } from '../../components/Filter/Filter';
import { useLocation } from 'react-router-dom';
import { Products } from '../../types/Product';

const CatalogSearchResult: FC = () => {
  const [selectedSort, setSelectedSort] =useState('asc');
  const [isModel, setIsModel] = useState(true);
  const location = useLocation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: 'easeInOut' }}
      className='w-full h-full  text-gray-600 bg-white'>
      <div className='flex h-16 max-w-5xl justify-between px-9 sm:px-0 mx-auto items-center'>
        <div>
          <Filter
            setSelectedSort={setSelectedSort}
            selectedSort={selectedSort}
          />
        </div>
        <div className='flex items-center space-x-3'>
          <p className='text-xs truncate'>
            {location.state.response?.length}{' '}
            {location.state.response?.length > 1
              ? 'items'
              : 'item'}
          </p>
          <div className='flex space-x-3'>
            <button
              className={`text-xs sm:text-sm ${
                isModel
                  ? 'border-b border-black'
                  : ''
              }`}
              onClick={() => {
                setIsModel(true);
              }}>
              Model
            </button>
            <button
              className={`text-xs sm:text-sm ${
                isModel
                  ? ''
                  : 'border-b border-black'
              }`}
              onClick={() => {
                setIsModel(false);
              }}>
              Product
            </button>
          </div>
        </div>
      </div>

      <section>
        <div className='container px-5 mx-auto h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5'>
          {location?.state?.response.map(
            (product: Products) => (
              <Card
                key={product?._id}
                image={product?.preview}
                title={product?.title}
                price={product?.price}
                id={product?._id}
                model={isModel}
                category={product.category}
                gender={product.gender}
                isTopSell={product.tags.includes(
                  'top selling'
                )}
              />
            )
          )}
        </div>
      </section>
    </motion.section>
  );
};
export default CatalogSearchResult;
