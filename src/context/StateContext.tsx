import {
	type ReactNode,
	createContext,
	useContext,
	useReducer,
	useEffect,
	type Dispatch,
} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import itemReducer, { IActionsType } from '../store/ItemReducer';

interface IProps {
	state: InitialState;
	dispatch: Dispatch<IActionsType>;
}

const States: InitialState = {
	cartItems: [],
	quantity: 0,
	totalPrices: 0,
	totalQuantities: 0,
	wishLists: [],
	newArrivals: false,
	selectedLadiesCategory: 'All',
	selectedMenCategory: 'All',
	user: null,
	query: '',
	selectedSize: '',
};

const contextIntial: IProps = {
	state: States,
	dispatch: () => {},
};
const StateContext = createContext(contextIntial);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(itemReducer, States);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				return dispatch({
					type: 'SET-USER',
					payload: {
						user: {
							email: user?.email || '',
							displayName: user?.displayName || '',
							uid: user?.uid,
							isSubscribe: false,
							phoneNumber: user?.phoneNumber || '',
							emailVerified: user?.emailVerified,
						},
					},
				});
			}
		});
		return unsub;
	}, []);

	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
