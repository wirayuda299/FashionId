import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedHomePage: FC = () => {
  const uid = localStorage.getItem('user')
  return uid ? <Outlet /> : <Navigate to='/signup' replace />;
};
