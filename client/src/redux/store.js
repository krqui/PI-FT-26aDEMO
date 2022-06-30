import reducer from '../redux/reducer';
import { createStore ,applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// el composeWithDevTools es lo minimo que se debe configurar.
const store=createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;