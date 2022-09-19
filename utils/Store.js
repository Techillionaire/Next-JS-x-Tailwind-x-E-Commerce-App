import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart: { cartItems: []},
};

function reducer(state, action) {
    switch (action.type){
        case 'ADD_TO_CART': {
            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find(item => item.slug === newItem.slug);
            const cartItems = existingItem ? state.cart.cartItems.map((item) => item.name === existingItem.name ? newItem : item) : [...state.cart.cartItems, newItem];
            return {...state, cart: {...state.cart, cartItems}}
        }
        default: return state;
    }
}


export function StoreProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}