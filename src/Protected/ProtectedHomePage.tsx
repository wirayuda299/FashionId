import { FC, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedHomePage: FC = () => {
  const uid = localStorage.getItem('user')

  useEffect(() => {
    if (uid === null) {
      toast.error('You are unauthorize')
    }
  }, [uid])
  return uid ? <Outlet /> : <Navigate to='/signup' replace />;
};
