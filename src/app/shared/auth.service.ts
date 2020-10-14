import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, FbAuthResponse } from './interface';

@Injectable({
    providedIn: 'root'
})

export class AuthServise {

    public error$: Subject<string> = new Subject<string>()

    constructor(private http: HttpClient) {}

    private setToken(response: FbAuthResponse | null) {
        if (response) {
            console.log(response)
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('fb-token', response.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
    }

    get token(): string {
        const expDate = new Date(localStorage.getItem('fb-token-exp'))
        if (new Date() > expDate) {
            this.logout()
            return null
        }
        return localStorage.getItem('fb-token')
    }

    login(user: User): Observable < any > {
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            )
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    handleError(error: HttpErrorResponse) {
        const {
            message
        } = error.error.error

        switch (message) {
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого email нет')
                break;
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email')
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль')
                break;

            default:
                break;
        }

        return throwError(error)
    }

    logout() {
        this.setToken(null)
    }
}