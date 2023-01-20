import { BrowserRouter } from 'react-router-dom';
import { StateContextProvider } from './context/StateContext';
import { AnimatedRoutes } from './Routes/Routes';
import { FC } from 'react';

const App: FC = () => {
  return (
    <StateContextProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </StateContextProvider>
  );
};
export default App;
