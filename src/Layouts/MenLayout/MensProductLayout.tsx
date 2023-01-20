import { FC, useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { withPage } from '../../hoc/withPage';

const SidebarWithPage = withPage(Sidebar);

const MensProductLayout: FC = () => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className='relative flex '>
      <aside
        className={`h-screen w-44 sm:bg-white fixed transition-all ease duration-300 z-30 top-0 ${
          hidden
            ? '-left-[176px]'
            : 'left-0 bg-white '
        } sm:sticky`}>
        <SidebarWithPage
          page='male'
          hidden={hidden}
          setHidden={setHidden}
        />
      </aside>
      <div className='flex-1 w-full h-full '>
        <Outlet />
      </div>
    </div>
  );
};

export default MensProductLayout;
