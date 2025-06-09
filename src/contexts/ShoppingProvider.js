import { createContext, useReducer } from 'react';

export const ShoppingContext = createContext();

const INIT_STATE = {
    cart: [],
    totalPrice: 0,
    totalItems: 0,
}


const shoppingReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload;
            const existingItemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id);
            if (existingItemIndex !== -1) {
                // If item already exists in cart, update its quantity
                const updatedCart = [...state.cart];
                const updatedItem = {...updatedCart[existingItemIndex]};
                updatedItem.quantity = updatedItem.quantity + item.quantity
                updatedCart[existingItemIndex] = updatedItem;
                return {
                    ...state,
                    cart: updatedCart,
                    totalPrice: state.totalPrice + item.price * item.quantity,
                    totalItems: state.totalItems + item.quantity,
                };
            } 
            // If item does not exist in cart, add it
            console.log('Running the add to cart');
            console.log(item);
            const newItem = { ...item, quantity: item.quantity || 1 }; // Ensure quantity is at least 1
            return {
                ...state,
                cart: [...state.cart, newItem],
                totalPrice: state.totalPrice + newItem.price * newItem.quantity,
                totalItems: state.totalItems + newItem.quantity,
            };
            return state;
        case 'REMOVE_FROM_CART':
            const itemId = action.payload;
            const itemToRemoveIndex = state.cart.findIndex(cartItem => cartItem.id === itemId);
            if (itemToRemoveIndex !== -1) {
                const itemToRemove = state.cart[itemToRemoveIndex];
                const updatedCart = state.cart.filter(cartItem => cartItem.id !== itemId);
                return {
                    ...state,
                    cart: updatedCart,
                    totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
                    totalItems: state.totalItems - itemToRemove.quantity,
                };
            }
            // If item not found, return the current state
            return state;
        case 'CLEAR_CART':
            // Clear the cart and reset total price and items
            return {
                ...state,
                cart: [],
                totalPrice: 0,
                totalItems: 0,
            };
        case 'INCREASE_ITEM_QUANTITY':
            const increaseItemId = action.payload;
            const increaseItemIndex = state.cart.findIndex(cartItem => cartItem.id === increaseItemId);
            if (increaseItemIndex !== -1) {
                const updatedCart = [...state.cart];
                const updatedItem = { ...updatedCart[increaseItemIndex] };
                updatedItem.quantity += 1; // Increase quantity by 1
                updatedCart[increaseItemIndex] = updatedItem;
                return {    
                    ...state,
                    cart: updatedCart,
                    totalPrice: state.totalPrice + updatedItem.price, // Add price of the item
                    totalItems: state.totalItems + 1, // Increase total items by 1
                };
            }
            // If item not found, return the current state
            return state;
        case 'DECREASE_ITEM_QUANTITY':
            const decreaseItemId = action.payload;
            const decreaseItemIndex = state.cart.findIndex(cartItem => cartItem.id === decreaseItemId);
            if (decreaseItemIndex !== -1) {
                const updatedCart = [...state.cart];
                const updatedItem = { ...updatedCart[decreaseItemIndex] };
                if (updatedItem.quantity > 1) {
                    updatedItem.quantity -= 1; // Decrease quantity by 1
                    updatedCart[decreaseItemIndex] = updatedItem;
                    return {
                        ...state,
                        cart: updatedCart,
                        totalPrice: state.totalPrice - updatedItem.price, // Subtract price of the item
                        totalItems: state.totalItems - 1, // Decrease total items by 1
                    };
                } else {
                    // If quantity is 1, remove the item from the cart
                    const newCart = state.cart.filter(cartItem => cartItem.id !== decreaseItemId);
                    return {
                        ...state,
                        cart: newCart,
                        totalPrice: state.totalPrice - updatedItem.price, // Subtract price of the item
                        totalItems: state.totalItems - 1, // Decrease total items by 1
                    };
                }
            }
            // If item not found, return the current state
            return state;
        case 'UPDATE_ITEM_QUANTITY':
            const { itemId: updateItemId, quantity } = action.payload;
            const updateItemIndex = state.cart.findIndex(cartItem => cartItem.id === updateItemId);
            if (updateItemIndex !== -1) {
                const updatedCart = [...state.cart];
                const updatedItem = { ...updatedCart[updateItemIndex] };
                const quantityDifference = quantity - updatedItem.quantity;
                updatedItem.quantity = quantity; // Update to the new quantity
                updatedCart[updateItemIndex] = updatedItem;
                return {
                    ...state,
                    cart: updatedCart,
                    totalPrice: state.totalPrice + (updatedItem.price * quantityDifference), // Adjust total price
                    totalItems: state.totalItems + quantityDifference, // Adjust total items
                };
            }
            // If item not found, return the current state
            return state;
        default:
            return state;
    }
};

function ShoppingProvider({ children }) {
    const [state, dispatch] = useReducer(shoppingReducer, INIT_STATE);

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };
    const removeFromCart = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const increaseItemQuantity = (itemId) => {
        dispatch({ type: 'INCREASE_ITEM_QUANTITY', payload: itemId });
    };

    const decreaseItemQuantity = (itemId) => {
        dispatch({ type: 'DECREASE_ITEM_QUANTITY', payload: itemId });
    };

    const updateQuantity = (itemId, quantity) => {
        dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { itemId, quantity } });
    };

    const value = {
        cart: state.cart,
        totalPrice: state.totalPrice,
        totalItems: state.totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseItemQuantity,
        decreaseItemQuantity,
    };
    return (  
        <ShoppingContext.Provider value={value}>
            {children}
        </ShoppingContext.Provider>
    );
}

export default ShoppingProvider;