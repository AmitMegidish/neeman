import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { categoryReducer } from './reducers/categoryReducer';
import { productReducer } from './reducers/productReducer';
import { cartItemReducer } from './reducers/cartItemReducer';
import { employeeReducer } from './reducers/employeeReducer';
import { OrderReducer } from './reducers/orderReducer';


const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    categories: categoryReducer,
    products: productReducer,
    cartItems: cartItemReducer,
    employees: employeeReducer,
    order: OrderReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
