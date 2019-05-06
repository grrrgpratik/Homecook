import { combineReducers } from "redux";
import { reducer as NetInfoReducer } from "./NetInfoRedux";
import { reducer as ToastReducer } from './ToastRedux';
import { reducer as LocationReducer } from "./LocationRedux"

export default combineReducers({
    netInfo: NetInfoReducer,
    toast: ToastReducer,
    location: LocationReducer
})