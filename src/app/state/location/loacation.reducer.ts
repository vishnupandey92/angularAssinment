import { createReducer, on } from '@ngrx/store';
import * as locationActions from './location.actions';
import { LocationState } from '../../core/interfaces/interfaces';

export const initialState: LocationState = {
    location: [],
    loading: false,
    selectedLocation: [] 
};

export const locationReducer = createReducer(
    initialState,
    on(locationActions.loadLocations, (state) => ({
        ...state,
        loading: true, 
    })),
        on(locationActions.loadLocationsSuccess, (state, { locations }) => {
        const existingLocationIndex = state.location.findIndex(location => location.city.id === locations.city.id);
        if (existingLocationIndex !== -1) {
            const updatedLocations = [...state.location];
            updatedLocations[existingLocationIndex] = locations;
            return { ...state, location: updatedLocations,loading: false };
        } else {
            const updatedLocations = [locations, ...state.location];
            return { ...state, location: updatedLocations,loading: false };
        }
    }),
    on(locationActions.loadLocationsFailure, (state) => ({
        ...state,
        loading: false, 
    })),
    on(locationActions.DeleteLocation, (state, { id }) => {
        const updatedLocations = state.location.filter((loc) => loc.city.id !== id);
        return {
            ...state,
            location: updatedLocations,
        };
    }),
    on(locationActions.ResetAllLocation, (state) => (initialState)),
);
