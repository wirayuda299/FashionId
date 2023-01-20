import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { client } from '../../../config/client';
import { Products } from '../../types/Product';
import { useStateContext } from '../../context/StateContext';

export const SearchInput: FC = () => {
  const {state:{query}, dispatch} = useStateContext()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [queries, setQueries] = useState<string>('')
  const navigate = useNavigate();
  const formRef = useRef<HTMLInputElement>(null);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    return dispatch({type: 'SET-QUERY', payload:{
      query: e.target.value
    }})
  }
  const getProductByQuery = async (e: FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try {
      setIsFetching(true)
      const fetchQuery = `*[_type == "product" && [title, description, category] match ["${query}"]]`
      const response: Products[] = await client.fetch(fetchQuery);
      if (response.length < 1) {
        toast.error("We can't find product that you are looking for");
        setIsFetching(false)
        return;
      }
      navigate('/catalog-search', { state: { response } });
      formRef.current && formRef.current.blur()
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsFetching(false)
    }
  };

  return (
    <form
      className='max-w-xs'
      onSubmit={getProductByQuery}>
      <div className='w-full flex items-center justify-between py-1 rounded-full border overflow-hidden px-3 bg-[#f0f0f09d] relative'>
        <input
          className={`w-full h-full bg-transparent text-xs focus:outline-none ${isFetching ? 'cursor-wait' : 'cursor-auto'}`}
          type='text'
          placeholder='Search on Fashion'
          onChange={e => handleChange(e)}
          value={query}
          ref={formRef}
        />
        <button type='submit'>
          <AiOutlineSearch size={25} className='text-gray-400' />
        </button>
      </div>
    </form>
  );
};
