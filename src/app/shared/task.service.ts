import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task, FbCreateResponse } from './interface';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) {}

    create(task: Task): Observable < Task > {
        return this.http.post(`${environment.fbDbUrl}/posts.json`, task)
            .pipe(
                map((response: FbCreateResponse) => {
                    return {
                        ...task,
                        id: response.name
                    }
                })
            )
    }

    getAll(): Observable<Task[]> {
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
        .pipe(
            map((response: {[key: string]: any}) => {
                console.log('oninit' ,response)
                return Object
                .keys(response)
                .map( key => ({
                    ...response[key],
                    id: key,
                    date: new Date(response[key].date)
                }))
            })
        )
    }

    deletePost(id: string): Observable <void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
         
    }

    getById(id: string): Observable<Task>{
        
        return  this.http.get(`${environment.fbDbUrl}/posts/${id}.json`)
        .pipe(
          map((post: Task) => {
              return {
                  ...post,
                  id: id,
              }
          })
      )
      }

}