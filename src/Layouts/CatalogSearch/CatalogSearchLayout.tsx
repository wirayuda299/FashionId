import { type FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { withPage } from '../../hoc/withPage';

const SidebarWithPage = withPage(Sidebar);
const CatalogSearchLayout: FC = () => {
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <div className='relative flex '>
      <aside
        className={`h-screen w-44 sm:bg-white fixed transition-all top-0 ${hidden
            ? '-left-[176px]'
            : 'left-0 bg-white '
          } z-10 sm:sticky`}>
        <SidebarWithPage
          page='/catalog-search'
          hidden={hidden}
          setHidden={setHidden}
        />
      </aside>
      <div className='flex-1 w-full h-full'>
        <Outlet />
      </div>
    </div>
  );
};
export default CatalogSearchLayout;
