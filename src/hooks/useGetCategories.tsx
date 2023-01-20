import { useQuery } from "react-query";
import { client } from "../../config/client";
import { Products } from "../types/Product";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const useGetCategories = (page: string) => {
  const location = useLocation();
  const { data, isError, isLoading } = useQuery([`categories ${page}`, page], async () => {
    try {
      let arr;
      const product: Products[] = await client.fetch(`*[_type == "product" && gender == "${page}"]`)
      const categoriesSet: Set<string> = new Set(product.map((item) => item.category.toLowerCase()));
      const catalog: Set<string> = new Set(location.state?.response.map((item: Products) => item.gender.toLowerCase()));
      if (page === "/catalog-search") {
        arr = ["All", ...catalog];
      } else {
        arr = ["All", ...categoriesSet];
      }
      return arr;
    } catch (err: any) {
      toast.error(err.message)
    }
  }, {
    enabled: page === 'female' || page === 'male' || page === '/catalog-search'
  })
  return { data, isError, isLoading }
}

export default useGetCategories

