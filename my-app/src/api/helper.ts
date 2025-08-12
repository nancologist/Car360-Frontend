import {catchError, map, Observable, of, startWith} from 'rxjs';


export interface RequestState<T> {
    data?: T;
    loading: boolean;
    errMsg?: string;
}

export function requestWithLoadingAndError<T>(response$: Observable<T>): Observable<RequestState<T>> {
    return response$.pipe(
        map(data => ({data, loading: false, errMsg: undefined})),
        startWith({data: undefined, loading: true, errMsg: undefined}),
        catchError(error => of({ data: undefined, loading: false, errMsg: error.message || 'Unknown error occurred' }))
    );
}
