import { Routes, Route, useLocation } from 'react-router-dom';
import { FC, lazy, Suspense } from 'react';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// layout
import ProductsLayout from '../Layouts/LadiesLayout/ProductLayout';
import MensProductLayout from '../Layouts/MenLayout/MensProductLayout';
import CatalogSearchLayout from '../Layouts/CatalogSearch/CatalogSearchLayout';

import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer';

// protected
import { ProtectedHomePage } from '../Protected/ProtectedHomePage';
import ProtectedCatalogSearch from '../Protected/ProtectedCatalogSearch';

import { Loader } from '../components/Loader/Loader';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AnimatePresence } from 'framer-motion';

// pages
const Cart = lazy(async () => await import('../pages/Cart'));
const Ladies = lazy(async () => await import('../pages/Products/Ladies'));
const Men = lazy(async () => await import('../pages/Products/Mens'));
const MensProducts = lazy(async () => await import('../pages/Products/Mens/Products'));
const LadiesProduct = lazy(async () => await import('../pages/Products/Ladies/Products'));
const Home = lazy(async () => await import('../pages/Home'));
const Detail = lazy(async () => await import('../pages/Products/Details'));
const Wishlist = lazy(async () => await import('../pages/wishlist'));
const NotFound = lazy(async () => await import('../pages/NotFound'));
const CatalogSearchResult = lazy(async () => await import('../pages/CatalogSearch'));

export const AnimatedRoutes: FC = () => {
  const location = useLocation();
  const user = localStorage.getItem('user');
  const queryClient = new QueryClient({
    defaultOptions: {
     queries: {
      staleTime: 720000,
      cacheTime: 720000,
      
     }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        <Suspense fallback={<Loader />}>
          <section className={`w-full bg-white ${user ? 'block' : 'hidden'} `}>
            <Header />
          </section>
          <Routes location={location} key={location.pathname}>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedHomePage />}>
              <Route path='/' element={<Home />} />
              <Route path='/ladies' element={<Ladies />} />
              <Route path='/men' element={<Men />} />
              <Route element={<ProductsLayout />}>
                <Route path='/ladies/products' element={<LadiesProduct />} />
              </Route>
              <Route element={<MensProductLayout />}>
                <Route path='/men/products' element={<MensProducts />} />
              </Route>
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/products/:gender/:id' element={<Detail />} />
              <Route element={<ProtectedCatalogSearch />}>
                <Route element={<CatalogSearchLayout />}>
                  <Route path='/catalog-search' element={<CatalogSearchResult />} />
                </Route>
              </Route>
              <Route path='/cart' element={<Cart />} /> 
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
          <section className={`w-full ${user ? 'block' : 'hidden'}`}>
            <Footer />
          </section>
        </Suspense>
      </AnimatePresence>
      <ReactQueryDevtools
        initialIsOpen={false}
        position='bottom-right'
      />
    </QueryClientProvider>
  );
};
