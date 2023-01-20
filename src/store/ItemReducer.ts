import { InitialState } from '../types/InitialState';
import { Products } from '../types/Product';
import { IUsers } from '../types/User';

interface Action<T extends string, P> {
  type: T;
  payload: P;
}
interface SelectCategory {
  men?: string,
  ladies?: string
}

interface WishlistPayload {
  product: Products
}
interface CartPayload extends WishlistPayload {
  selectedSize: string;
  quantity: number
}
interface SetUserPayload {
  user: IUsers
}
interface QuantityPayload {
  _id: string
}
interface SelecSizePayload {
  size: string
}
interface IQuery {
  query:string 
}

type AddToCartAction = Action<'ADD-TO-CART', CartPayload>;
type SetUserActionAction = Action<'SET-USER', SetUserPayload>;
type IncreaseQuantityAction = Action<'INCREASE-QUANTITY', QuantityPayload>;
type DereaseQuantityAction = Action<'DECREASE-QUANTITY', QuantityPayload>;
type RemoveFromCartAction = Action<'REMOVE-FROM-CART', QuantityPayload>;
type AddToWishListAction = Action<'ADD-TO-WISHLIST', WishlistPayload>;
type RemoveFromWishlistAction = Action<'REMOVE-FROM-WISHLIST', WishlistPayload>
type SelectCategoriesAction = Action<'SELECT-CATEGORY', SelectCategory>
type SelectSizeAction = Action<'SELECT-SIZE', SelecSizePayload>
type SetQueryAction = Action<'SET-QUERY', IQuery>

export type IActionsType = AddToCartAction | SetUserActionAction | IncreaseQuantityAction | DereaseQuantityAction | RemoveFromCartAction | AddToWishListAction | RemoveFromWishlistAction | SelectCategoriesAction | SelectSizeAction | SetQueryAction;

export default function itemReducer(state: InitialState, action: IActionsType) {
  switch (action.type) {
    case 'ADD-TO-CART':
      return {
        ...state,
        cartItems: [
          ...state.cartItems, {
            ...action.payload.product,
            quantity: action.payload.quantity,
            selectedSize: action.payload.selectedSize
          }],
        size: action.payload.selectedSize
      };
    case 'INCREASE-QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        })
      };
    case 'DECREASE-QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1
            };
          }
          return item;
        })
      };
    case 'REMOVE-FROM-CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload._id)
      };
    case 'ADD-TO-WISHLIST':
      return {
        ...state,
        wishLists: [...state.wishLists, action.payload.product]
      };
    case 'REMOVE-FROM-WISHLIST':
      return {
        ...state,
        wishLists: state.wishLists.filter(item => item._id !== action.payload.product._id)
      };
    case 'SELECT-CATEGORY':
      return {
        ...state,
        selectedLadiesCategory: action.payload.ladies,
        selectedMenCategory: action.payload.men,
      };
    case 'SET-USER':
      return {
        ...state,
        user: action.payload.user
      }
    case 'SELECT-SIZE':
      return {
        ...state,
        selectedSize: action.payload.size
      }
      case 'SET-QUERY': 
      return {
        ...state, 
        query: action.payload.query
      }

    default:
      return state;
  }
}
