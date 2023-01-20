import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { client } from "../../../config/client";
import { Products } from "../../types/Product";
import { useStateContext } from "../../context/StateContext";
import { BiRightArrow } from "react-icons/bi";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import useGetCategories from "../../hooks/useGetCategories";

interface Props {
  page: string;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>
  >;
}
export const Sidebar: FC<Props> = ({ page, hidden, setHidden }) => {
  const { dispatch, state: { selectedLadiesCategory, selectedMenCategory } } = useStateContext();
  const { data, isError, isLoading } = useGetCategories(page)

  if (isError) {
    return (
      <p className='text-center w-full text-black'>
        Something went wrong, please try again later
      </p>
    );
  }
  if (isLoading) {
    return (
      <p className='text-center w-full text-black'>
        Loading....
      </p>
    );
  }

  const chooseCategory = (category: string, page: string) => {
    return dispatch({
      type: "SELECT-CATEGORY", payload: {
        men: page === 'male' ? category : 'All',
        ladies: page === 'female' ? category : 'All',
      },
    });

  };

  return (
    <nav className="w-full h-full shadow-xl">
      <ul className="flex flex-col p-5 sm:p-3 relative ">
        <h2 className="font-bold pb-5 pl-1">Categories</h2>
        {
          data?.map(category => (
            <li className={`categories active py-2 cursor-pointer text-slate-800 hover:bg-slate-100 transition-all ease duration-300  rounded-md px-1 font-medium text-sm capitalize ${selectedLadiesCategory === category && page === 'female' || selectedMenCategory === category && page === 'male' ? 'border-r-4 rounded-none pr-0 border-slate-700' : ''}`}
              key={category}
              onClick={() => chooseCategory(category, page)}>
              {category}
            </li>
          ))}
        <button className="absolute -right-5 top-1/2 sm:hidden" onClick={() => setHidden(!hidden)}>
          <BiRightArrow size={25} />
        </button>
      </ul>
    </nav>
  )
}
