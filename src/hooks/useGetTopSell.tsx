import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { client } from '../../config/client';
import { Products } from '../types/Product';

const getTopSell = async (gender:string | undefined) => {
  try {
    const response:Products[] = await client.fetch(`*[_type == "product"${gender ? ` && gender == "${gender}"` : ''}]`);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const useGetTopSellByGender = (gender?: string) => {
  const { data, isError, isLoading, error } = useQuery([`top sell`], async () => await getTopSell(gender),{
      select: data => {
        switch (gender) {
          case 'female':
            return data?.filter(
              item =>
                item.gender === 'female' &&
                item.tags.includes(
                  'top selling'
                )
            );
          case 'male':
            return data?.filter(
              item =>
                item.gender === 'male' &&
                item.tags.includes(
                  'top selling'
                )
            );
          default:
            return data?.filter(item =>
              item.tags.includes('top selling')
            );
        }
      },
    },
  );
  return { data, isError, isLoading, error };
};
