import type { FC, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';

type Props = {
  setProcessing: React.Dispatch<SetStateAction<boolean>>;
  setClicked: React.Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
  clicked: boolean;
  processing: boolean;
};

const LogOutButton: FC<Props> = (props) => {
  const { navigate, setClicked, setProcessing, clicked, processing } = props
  return (
    <div className={`w-full h-auto bg-white absolute top-7 -right-4 transition-all ease duration-300 rounded-md ${clicked ? 'opacity-1' : 'opacity-0'}`}>
      <button
        name='signout'
        title='signout'
        type='button'
        className={`text-xs py-1 truncate bg-black rounded-md text-white font-medium h-full px-3 text-center ${processing ? 'cursor-wait' : 'cursor-pointer'}`}
        onClick={async () => {
          const { logOut } = await import('../../../helper/signout')
          logOut({
            navigate,
            setClicked,
            setProcessing
          })
        }}>
        {processing ? 'Please wait...' : 'Sign out'}
      </button>
    </div>
  )
}

export default LogOutButton