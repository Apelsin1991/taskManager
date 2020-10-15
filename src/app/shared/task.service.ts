import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Task } from './interface';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) {}

    create(task: Task): Observable < Task > {
        return this.http.post < Task > (`http://localhost:3004/tasks`, task)
    }

    getAll(): Observable<Task[]> {
        return this.http.get < Task[] > (`http://localhost:3004/tasks`)

    }

    deletePost(id: string): Observable <void> {
        return this.http.delete < void > (`http://localhost:3004/tasks/${id}`)
         
    }

    getById(id: string): Observable<Task>{
        
        return  this.http.get < Task > (`http://localhost:3004/tasks/${id}`)    
    }

    update(task: Task): Observable<Task> {
        return this.http.patch < Task > (`http://localhost:3004/tasks/${task.id}`, task)
    }

    completeTask(id: number): Observable <Task> {
        return this.http.patch <Task> (`http://localhost:3004/tasks/${id}`, {
          completed: true}, 
          {responseType: 'json'})
      }

}