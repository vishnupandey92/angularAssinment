import { createAction, props } from "@ngrx/store";

export const loadLocations = createAction(
    '[Locations] Load Locations', props<{ cityName: string }>()
);

export const loadLocationsSuccess = createAction(
    '[Locations] Load Locations Success',
    props<{ locations:any }>()
);

export const loadLocationsFailure = createAction(
    '[Locations] Load Locations Failure'
);

export const DeleteLocation = createAction(
    '[Locations] Delete Location',
    props<{ id: number }>()
);

export const RefreshLocation = createAction(
    '[Locations] Refresh Location',
    props<{ id: number,cityName:string }>()
);

export const ResetAllLocation = createAction(
    '[Locations] Reset All Location'
);