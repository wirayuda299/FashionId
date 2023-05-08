import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import {type  FC, useState } from 'react';
import { withPage } from '../../hoc/withPage';

const SidebarWithPage = withPage(Sidebar);
const ProductsLayout: FC = () => {
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <div className='relative flex '>
      <aside
        className={`h-screen w-44 sm:bg-white fixed transition-all ease duration-300 top-0 ${hidden ? '-left-[176px]' : 'left-0 bg-white '} z-30 sm:sticky`}>
        <SidebarWithPage
          page='female'
          hidden={hidden}
          setHidden={setHidden}
        />
      </aside>
      <div className=' w-full h-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default ProductsLayout;
