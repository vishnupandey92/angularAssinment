import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectLocationsState = (state: AppState) => state.location;

export const selectLocations = createSelector(
  selectLocationsState,
  (state) => state.location
);

export const selectLoading = createSelector(
    selectLocationsState,
    (state) => state.loading
  );