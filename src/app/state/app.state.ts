import { ActionReducerMap } from "@ngrx/store";
import { CounterState, LocationState } from "../core/interfaces/interfaces";
import { counterReducer } from "./counter/counter.reducer";
import { locationReducer } from "./location/loacation.reducer";

export interface AppState {
    counter: CounterState;
    location:LocationState
}

export const AppReducers: ActionReducerMap<AppState> = {
    counter: counterReducer,
    location:locationReducer
};