import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useStateContext } from '../../context/StateContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../types/formInput';

export const Subscription: FC = () => {
  const { state: { user } } = useStateContext();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    defaultValues: { email: 'Your email' },
  });
  const handleSubscribe: SubmitHandler<FormInput> = (): void => {
    if (user && user.isSubscribe) {
      toast.error('You already subscribe to our newsletter');
      return
    }
    toast.success('Thank you for Subscribe to our newsletter');
  };

  return (
    <div className='w-full h-full flex justify-center '>
      <div className='max-w-3xl h-[500px] flex justify-center items-center flex-col'>
        <div className='text-xl sm:text-3xl md:text-4xl text-center capitalize font-bold  text-black'>
          <h2 className='pb-9'>
            Subscribe to our news letter to get
            monthly promo
          </h2>
        </div>
        <form
          className='flex justify-center items-center flex-col'
          onSubmit={handleSubmit(handleSubscribe)}>
          <input
            className=' w-80 md:w-96 text-slate-500 py-4 bg-transparent focus:border-slate-400 focus:outline-none rounded-lg placeholder:text-slate-500 border pl-5'
            type='email'
            placeholder='Enter your email...'
            {...register('email', { required: true })}
          />
          {errors.email?.type === 'required' && (
            <p className='text-xs pt-1 text-red-700'>
              Email is required
            </p>
          )}
          <button
            name='subscribe'
            title='subscribe'
            type='submit'
            className='bg-[#000000e7] transition-all ease-out duration-300 py-2 px-5 rounded-md mt-3 text-white hover:bg-[#000]'>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};
