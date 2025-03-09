export interface CounterState {
    ids: number[];
    entities: { [id: number]: number };
    currentCount: number;
}
export interface LocationState {
    location: any[];
    loading:boolean,
    selectedLocation:{}
}

