import {combineReducers, legacy_createStore} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import tableReducer from "./tableReducer.ts";


const rootReducer = combineReducers({
    table: tableReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatchType>()




export const store = legacy_createStore(rootReducer);

