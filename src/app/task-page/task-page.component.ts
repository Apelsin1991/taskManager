import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '../shared/alert.servise';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, OnDestroy {

  post$: Observable<Task>;
  rSub: Subscription;
  cSub: Subscription;
  completed = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((param: Params) => {
       return  this.taskService.getById(param.id);
      })
    );
  }

  remove(id: string): void {
    this.alert.warning('Задача была удалена');
    this.rSub = this.taskService.deletePost(id)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

  completeTask(id: number): void {
    this.alert.danger('Задача завершена');
    this.cSub = this.taskService.completeTask(id)
      .subscribe(() => {
        this.router.navigate(['']);
      });
    this.completed = true;
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }

    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }
}
