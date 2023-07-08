import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedHomePage = () => {
	const uid = localStorage.getItem('user');
	return uid ? <Outlet /> : <Navigate to='/signup' replace />;
};
