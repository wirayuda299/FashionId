import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import type { SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';

type Args = {
	setProcessing: React.Dispatch<SetStateAction<boolean>>;
	setClicked: React.Dispatch<SetStateAction<boolean>>;
	navigate: NavigateFunction;
};

type LogOutFunc = (args: Args) => Promise<void>;

export const logOut: LogOutFunc = async (args) => {
	const { setProcessing, navigate, setClicked } = args;
	await signOut(auth).then(() => {
		localStorage.clear();
		navigate('/login');
		setClicked(false);
		setProcessing(false);
		toast.success('success logout');
	});
};
