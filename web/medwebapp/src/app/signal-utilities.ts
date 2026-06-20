import { Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime } from "rxjs";

export function debouncSignal<T>(signal:Signal<T>,time:number){
    let debounceObserable$=toObservable(signal).pipe(
        debounceTime(400)
    );

    return toSignal(debounceObserable$);
}