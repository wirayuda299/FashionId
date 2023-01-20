
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
const ProtectedCatalogSearch = () => {
  const { state: { query } } = useStateContext();
  
  useEffect(() => {
    if (query === '' ) {
      toast.error('Please fill search query ');
    } 
  }, []);

  return query === '' ? <Navigate to='/' replace/> : <Outlet />;
};
export default ProtectedCatalogSearch;

