import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from '../../core/interfaces/interfaces';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectAllCounters = createSelector(
  selectCounterState,
  (state) => state.ids.map((id) => ({ id, count: state.entities[id] }))
);

export const selectTotalCounters = createSelector(
  selectCounterState,
  (state) => state.ids.length
);