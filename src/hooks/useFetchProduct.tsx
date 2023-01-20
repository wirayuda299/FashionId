import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { client } from '../../config/client';
import { Products } from '../types/Product';

export const useFetchProducts = ( gender: string, selectedSort: string, selectedCategory: string | undefined, isNewArrival: boolean ) => {
  const { data, isError, isLoading } = useQuery([`sorted products ${gender}`, gender, selectedSort, selectedCategory, isNewArrival],
    async () => {
      try {
        let query;
        switch (selectedSort) {
          case 'asc':
            query = `*[_type == "product" && gender == "${gender}"] | order(title asc)`;
            break;
          case 'desc':
            query = `*[_type == "product" && gender == "${gender}"] | order(title desc)`;
            break;
          case 'lowest':
            query = `*[_type == "product" && gender == "${gender}"] | order(price asc)`;
            break;
          case 'highest':
            query = `*[_type == "product" && gender == "${gender}"] | order(price desc)`;
            break;
          default:
            throw new Error('Invalid sort order');
        }
        const response = await client.fetch(query);
        return response;
      } catch (error: any) {
        toast.error(error.message);
      }
    },{
      select: (data: Products[]) => {
        return data.filter(item =>
          selectedCategory === 'All' ? item
            : item.category === selectedCategory
        );
      },
    }
  );

  return { data, isError, isLoading };
};
