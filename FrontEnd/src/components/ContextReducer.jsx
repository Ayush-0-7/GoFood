import { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer  = (state,action) => {
  switch(action.type){
    case "ADD":
        let arr1 = [...state,{id:action.id,name:action.name,img:action.img,price:action.price,size:action.size,qty:action.qty}]
        return [...new Set(arr1)]
    case "REMOVE":
      let newarr = [...state];
      newarr.splice(action.index,1);
      return newarr;
    case "UPDATE":
      let arr=[...state]
      arr.find((food, index) => {
        if (food.id == action.id) {
            arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
        }
        return arr
    })
      return arr;
      case "DROP":
         let emptyArray = [] ;
         return emptyArray;  
    default:
    console.log("Error Occured.");
  }
}

export const CartProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,[])
    return (
        <cartDispatchContext.Provider value={dispatch}>
                    <cartStateContext.Provider value={state}>
                        {children}
                    </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    )
}

export const useDispatchCart = () => useContext(cartDispatchContext);

export const usecart = () => useContext(cartStateContext);