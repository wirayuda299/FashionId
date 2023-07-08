import toast from 'react-hot-toast';
import { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { SubmitHandler, useForm } from 'react-hook-form';
import intro from '../../assets/video/intro.mp4';
import { useStateContext } from '../../context/StateContext';
import { errMessages } from '../../data/errorMessages';

const Login: FC = () => {
	const navigate = useNavigate();
	const { dispatch } = useStateContext();
	const [processing, setProcessing] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInput>({
		defaultValues: {
			email: 'YourEmail@example.com',
			password: '@StrongPassword1233',
		},
	});
	const SigninUser: SubmitHandler<FormInput> = async (data) => {
		try {
			setProcessing(true);
			const login = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password
			).then((user) => {
				navigate('/');
				localStorage.setItem('user', user.user.uid);
				toast.success('successfully log in');
				dispatch({
					type: 'SET-USER',
					payload: {
						user: {
							email: user?.user?.email || '',
							displayName: user?.user?.displayName || '',
							uid: user?.user?.uid,
							isSubscribe: false,
							phoneNumber: user?.user?.phoneNumber || '',
							emailVerified: user?.user?.emailVerified,
						},
					},
				});
			});
			setProcessing(false);
			return login;
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className='w-full h-full bg-gray-200 relative text-white overflow-hidden'>
			<div className='w-full h-screen flex justify-center items-center flex-col'>
				<div
					className=' absolute top-0 left-0 w-full h-full z-[9]'
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
				></div>
				<video
					autoPlay
					muted
					loop
					controlsList='nodownload'
					disablePictureInPicture={true}
					className='absolute top-0 left-0 w-full h-full object-cover'
				>
					<source src={intro} type='video/mp4' />
				</video>
				<div className='p-5 w-full flex justify-center items-center relative z-10'>
					<div className='p-5 sm:p-10 bg-[#0000008e] rounded-md shadow-xl w-[450px] h-full sm:max-w-xl'>
						<h1 className='pt-8 sm:pt-5 text-3xl font-semibold text-center uppercase'>
							Sign In
						</h1>
						<form
							className=' w-full mx-auto h-full'
							onSubmit={handleSubmit(SigninUser)}
						>
							<div className='mb-2 w-full'>
								<label className='block text-sm font-semibold'>Email</label>
								<input
									type='email'
									placeholder='Your registered email....'
									{...register('email', {
										required: true,
										maxLength: 90,
										pattern: /^[^\s]+@[^\s]+$/,
									})}
									className='block w-full px-4 py-3 mt-2 text-xs  bg-white text-black border rounded-md focus:outline-none '
								/>
								{errors.email?.type === 'required' && (
									<p className='text-xs pt-1 text-red-700'>Email is required</p>
								)}
								{errors.email?.type === 'maxLength' && (
									<p className='text-xs pt-1 text-red-700'>
										Max charachters on email input is 90
									</p>
								)}
								{errors.email?.type === 'pattern' && (
									<p className='text-xs pt-1 text-red-700'>
										Add correct email pattern, email cannot contain whitespaces
										and must include @
									</p>
								)}
							</div>
							<div className='mb-2'>
								<label className='block text-sm font-semibold'>Password</label>
								<input
									type='passwords'
									placeholder='Your password....'
									{...register('password', {
										required: true,
										pattern:
											/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
									})}
									className='block text-xs w-full px-4 py-3 mt-2 bg-white text-black border rounded-md focus:outline-none'
								/>
								{errors.password?.type === 'required' && (
									<p className='text-xs pt-2 text-red-700'>
										Password is required
									</p>
								)}
								{errors.password?.type === 'pattern' && (
									<ul className='text-xs pt-2 text-red-700 list-disc'>
										Password must be match to be following criteria:
										{errMessages.map((err) => (
											<li className='pl-1 ml-5' key={err}>
												{err}
											</li>
										))}
									</ul>
								)}
							</div>
							<div className='mt-6'>
								<button
									className={`w-full px-4 py-2 rounded-md tracking-wide text-white transition-colors duration-200 transform bg-[#0000008c] hover:bg-[#000] ${
										processing ? 'cursor-wait' : 'cursor-pointer'
									}`}
									type='submit'
								>
									{processing ? 'Please wait...' : 'Sign In'}
								</button>
							</div>
							<div className='mt-8 text-xs font-light text-center flex space-x-3 justify-center items-center text-gray-500'>
								<p>Don't have an account?</p>
								<Link
									to='/signup'
									className='font-medium text-white hover:underline'
								>
									Sign Up
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
