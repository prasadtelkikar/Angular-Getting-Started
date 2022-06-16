import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient){}
    getProducts() : Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap((data: any) => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    private handleError(handleError: HttpErrorResponse) {
        let errorMessage = '';
        if(handleError.error instanceof ErrorEvent)
        {
            //A client-side or network error occurred. Handle it accordingly 
            errorMessage = `An Error occured: ${handleError.error.error}`;
        }
        else{
            //Backend returned an unsuccessful response code.
            //The response body may contain clues as to what went wrong
            errorMessage = `Server returned code ${handleError.status} error message is: ${handleError.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}