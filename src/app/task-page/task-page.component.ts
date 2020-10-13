import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, OnDestroy {

  post$: Observable<Task>
  rSub: Subscription

  constructor(
    private route: ActivatedRoute, 
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((param: Params) => {
       return this.taskService.getById(param['id']) 
      })
    )
  }

  remove(id: string) {
    this.rSub = this.taskService.deletePost(id)
      .subscribe(() => {
        this.router.navigate([''])
      })
  }

  ngOnDestroy() {
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
    
  }

}
