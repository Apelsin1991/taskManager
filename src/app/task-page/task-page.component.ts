import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
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
  completed = false;
  unsubsciber$: Subject< void > = new Subject< void >();

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
    this.taskService.deletePost(id)
      .pipe(takeUntil(this.unsubsciber$))
      .subscribe(() => {
        this.alert.warning('Задача была удалена');
        this.router.navigate(['']);
      });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id)
    .pipe(takeUntil(this.unsubsciber$))
      .subscribe(() => {
        this.alert.danger('Задача завершена');
        this.router.navigate(['']);
      });
    this.completed = true;
  }

  ngOnDestroy(): void {
    this.unsubsciber$.next();
    this.unsubsciber$.complete();
  }
}
