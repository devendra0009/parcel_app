import React, { createContext, useContext, useReducer } from 'react';
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          img: action.img,
          desc: action.desc,
          qty: action.qty,
          sz: action.sz,
        },
      ];
    case 'REMOVE':
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case 'UPDATE':
      let arr=[...state]
    //   console.log(arr);
      arr.find((a,idx)=>{
        // console.log(a,action);
        if(a.id===action.id)
        {
            // console.log('updated',action, a);
            arr[idx]={...a, qty:(parseInt(action.qty)+a.qty), price:(action.price+a.price)} // a is the array jo abhi tk cart m prda tha and action contains the updated object's details
        }
    })
      return arr
    case 'DROP': 
    let empArr=[]
    return empArr
    default:
      console.log('Error in reducer');
      break;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
