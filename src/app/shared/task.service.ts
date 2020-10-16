import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './interface';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) {}

    create(task: Task): Observable < Task > {
        return this.http.post < Task > (`${environment.jsonURL}/tasks`, task)
    }

    getAll(): Observable<Task[]> {
        return this.http.get < Task[] > (`${environment.jsonURL}/tasks`)

    }

    deletePost(id: string): Observable <void> {
        return this.http.delete < void > (`${environment.jsonURL}/tasks/${id}`)
         
    }

    getById(id: string): Observable<Task>{
        
        return  this.http.get < Task > (`${environment.jsonURL}/tasks/${id}`)    
    }

    update(task: Task): Observable<Task> {
        return this.http.patch < Task > (`${environment.jsonURL}/tasks/${task.id}`, task)
    }

    completeTask(id: number): Observable <Task> {
        return this.http.patch < Task > (`${environment.jsonURL}/tasks/${id}`, {completed: true})
    }

}