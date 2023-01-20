import { FC, useState } from 'react';
import { Products } from '../../../types/Product';
import { Filter } from '../../../components/Filter/Filter';
import Card from '../../../components/Card/Card';
import { useStateContext } from '../../../context/StateContext';
import { motion } from 'framer-motion';
import { useFetchProducts } from '../../../hooks/useFetchProduct';

const MensProducts: FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>('asc');
  const [isModel, setIsModel] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('Explore our products')
  const { state: { selectedMenCategory, newArrivals } } = useStateContext();
  const { data, isError, isLoading } = useFetchProducts('male', selectedSort, selectedMenCategory, newArrivals);

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
      className='w-full h-full text-gray-600 p-5'>
      <div className="container mx-auto">
        <div className='w-full '>
          <div className='w-full text-center'>
            <h2 className='font-bold text-xl text-black sm:text-2xl capitalize'>{selectedMenCategory === 'All' ? title : `All ${selectedMenCategory}`}</h2>
            <div className='flex h-16  max-w-5xl justify-between px-9 sm:px-0  mx-auto items-center '>
              <div>
                <Filter
                  setSelectedSort={setSelectedSort}
                  selectedSort={selectedSort}
                />
              </div>
              <div className='flex items-center space-x-3'>
                <p className='text-xs truncate'>
                  {data?.length}
                  {data != null && data?.length > 1 ? 'items' : 'item'}
                </p>
                <div className='flex space-x-3'>
                  <button className={`text-sm  ${isModel ? 'border-b border-black' : ''}`} onClick={() => setIsModel(true)}>
                    Model
                  </button>
                  <button className={`text-sm ${isModel ? '' : 'border-b border-black'}`} onClick={() => setIsModel(false)}>
                    Product
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {data?.map(product => (
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
export default MensProducts;
