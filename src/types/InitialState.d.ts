type InitialState = {
	cartItems: Products[];
	quantity: number;
	totalPrices: number;
	totalQuantities: number;
	wishLists: Products[];
	newArrivals: boolean;
	selectedLadiesCategory: string | undefined;
	selectedMenCategory: string | undefined;
	user: IUsers | null;
	query: string;
	selectedSize: string;
};
