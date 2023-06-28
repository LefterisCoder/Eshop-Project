import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CodeVerseFormService {

    constructor() {
    }

    getCreditCardMonths(startMonth: number): Observable<number[]> {

        let data: number[] = [];

        //build array for Month dropdown list

        for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
            data.push(theMonth);
        }
        return of(data);
    }

    getCreditCardYears(): Observable<number[]> {
        let data: number[] = [];

        //build array fot Year dropdown
        const startYear: number = new Date().getFullYear();
        const endYear: number = startYear + 20;

        for (let theYear = startYear; theYear <= endYear; theYear++) {
            data.push(theYear)
        }
        return of(data);
    }
}
