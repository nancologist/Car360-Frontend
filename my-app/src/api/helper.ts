import {catchError, map, Observable, of, startWith} from 'rxjs';


export interface RequestState<T> {
    data?: T;
    loading: boolean;
    error?: string;
}

export function requestWithLoadingAndError<T>(obs$: Observable<T>): Observable<RequestState<T>> {
    return obs$.pipe(
        map(data => ({data, loading: false, error: undefined})),
        startWith({data: undefined, loading: true, error: undefined}),
        catchError(error => of({ data: undefined, loading: false, error: error.message }))
    );
}
