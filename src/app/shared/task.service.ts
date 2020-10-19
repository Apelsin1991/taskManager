import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from './interface';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) {}

    create(task: Task): Observable < Task > {
        return this.http.post < Task > (`${environment.jsonURL}/tasks`, task)
        .pipe(
            catchError(error => {
                return throwError(error)})
        );
    }

    getAll(): Observable<Task[]> {
        return this.http.get < Task[] > (`${environment.jsonURL}/tasks `)
        .pipe(
            catchError(error => {
                return throwError(error)})
        );

    }

    deletePost(id: string): Observable <void> {
        return this.http.delete < void > (`${environment.jsonURL}/tasks/${id}`)
        .pipe(
            catchError(error => {
                return throwError(error)})
        );
    }

    getById(id: string): Observable<Task>{

        return  this.http.get < Task > (`${environment.jsonURL}/tasks/${id}`)
        .pipe(
            catchError(error => {
                return throwError(error)})
        );
    }

    update(task: Task): Observable<Task> {
        return this.http.patch < Task > (`${environment.jsonURL}/tasks/${task.id}`, task)
        .pipe(
            catchError(error => {
                return throwError(error)})
        );
    }

    completeTask(id: number): Observable <Task> {
        return this.http.patch < Task > (`${environment.jsonURL}/tasks/${id}`, {completed: true})
        .pipe(
            catchError(error => {
                return throwError(error)})
        );
    }
}
