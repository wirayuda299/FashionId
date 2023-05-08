import type  { FC } from "react";
import { header } from "../../data/wishListsData";

const WishListHeader: FC = () => {

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