import { ICart, ICartAction, IProduct } from '../models/cart'
import { updateObject } from '../utility'
import * as actionTypes from '../actiontypes/cart'
export const initialState: ICart = {
    error: null,
    success: null,
    loading: false,
    products: null
}
const cartIncrement = (state: ICart, action: ICartAction): ICart => {
    var otherProducts = state.products?.filter((product: IProduct) => product.name !== action.product.name)
    return updateObject(
        state,
        {
            error: null,
            success: null,
            loading: false,
            // products: [...state.products?.filter((product: IProduct) => product.name === action.product.name)]
        }
    )
}
const cartInsert = (state: ICart, action: ICartAction): ICart => {
    return updateObject(
        state,
        {
            error: null,
            success: null,
            loading: false,
            products: state.products === null ? [action.product] : [...state.products, action.product]
        }
    )
}
const reducer = (state: ICart, action: ICartAction): ICart => {
    switch (action.type) {
        case actionTypes.CART_INCREAMENT:
            return cartIncrement(state, action)
        case actionTypes.CART_INSERT:
            return cartInsert(state, action)
        default:
            return state
    }
}

export default reducer