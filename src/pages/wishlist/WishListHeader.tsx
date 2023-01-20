import { FC } from "react";

type HeaderProps = {
  id: number;
  title: string;
}
const WishListHeader: FC = () => {
  const header: HeaderProps[] = [
    {
      id: 1,
      title: 'Your Products',
    },
    {
      id: 2,
      title: 'Description',
    },
    {
      id: 3,
      title: 'Price',
    },
    {
      id: 4,
      title: 'More options',
    },
  ];
  return (
    <div className='hidden sm:flex w-full justify-around items-center py-4 px-5 bg-gray-200 '>
      {header.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default WishListHeader