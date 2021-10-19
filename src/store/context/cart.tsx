import { useReducer, createContext } from 'react'
import reducer, { initialState } from '../reducer/cart'
import * as actionTypes from '../actiontypes/cart'
import { ICart, ICartAction, IProduct } from '../models/cart'

export const CartContext = createContext<ICart | any>(initialState)

const CartContextProvider = (props: any): JSX.Element => {
    const [cart, cartDispatch] = useReducer(reducer, initialState)

    const cartInsert = (product: IProduct): ICartAction => {
        return {
            type: actionTypes.CART_INSERT,
            error: null,
            success: null,
            product
        }
    }
    const cartIncreament = (product: IProduct): ICartAction => {
        return {
            type: actionTypes.CART_INCREAMENT,
            error: null,
            success: null,
            product
        }
    }
    const addToCart = (product: IProduct) => {
        product.quantity = 1
        cartDispatch(cartInsert(product))
    }
    const increamentCartProduct = (product: IProduct) => {
        cartDispatch(cartIncreament(product))
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, increamentCartProduct }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider