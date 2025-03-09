import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.action';
import { CounterState } from '../../core/interfaces/interfaces';

const initialState: CounterState = {
    ids: [],
    entities: {},
    currentCount: 0
}

export const counterReducer = createReducer(
    initialState,
    on(CounterActions.addCounter, (state) => ({
        ...state,
        ids: [...state.ids, state.currentCount],
        entities: { ...state.entities, [state.currentCount]: 0 },
        currentCount: state.currentCount + 1,
    })),
    on(CounterActions.incrementCounter, (state, { id }) => ({
        ...state,
        entities: { ...state.entities, [id]: (state.entities[id] || 0) + 1 },
    })),
    on(CounterActions.decrementCounter, (state, { id }) => ({
        ...state,
        entities: { ...state.entities, [id]: Math.max((state.entities[id] || 0) - 1, 0) },
    })),
    on(CounterActions.deleteCounter, (state, { id }) => {
        const newIds = state.ids.filter((_id) => _id !== id);
        const { [id]: _, ...newEntities } = state.entities;
        return { ...state, ids: newIds, entities: newEntities };
    }),
    on(CounterActions.resetCounters, () => initialState)
);

