import { combineReducers } from "redux";
import { reducer as NetInfoReducer } from "./NetInfoRedux";
import { reducer as ToastReducer } from './ToastRedux';

export default combineReducers({
    netInfo: NetInfoReducer,
    toast: ToastReducer
})