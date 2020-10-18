import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../shared/alert.servise';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  search = '';
  poster: any;
  error = '';
  unsubsciber$: Subject< void > = new Subject< void >();
  
  

  constructor(
    private taskService: TaskService,
    private alert: AlertService) { }

  ngOnInit(): void {
      this.taskService.getAll()
      .pipe(takeUntil(this.unsubsciber$))
      .subscribe((response) => {
          this.tasks = response;
          this.tasks.sort((a, b) => a.order - b.order);
      },
        error => {console.log(error.message)
        this.error = error.message}
      );
  }

  deadline(str: string): string {
    const actDate: number = (new Date()).getTime();
    const clientDate: number = new Date(str).getTime();
    const warTime = 259200000;
    if (clientDate < actDate) {
      return 'red';
    } else if (clientDate - actDate < warTime) {
      return 'pink';
    } else  if (actDate - clientDate  < warTime) {
      return 'null';
    }
  }

  drop(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks.forEach((task, inx) => {
      if (task.order !== 0) {
        task.order = inx + 1;
      }
    }
    );
    this.tasks.forEach((item) => {
      this.taskService.update(item)
      .pipe(takeUntil(this.unsubsciber$))
      .subscribe();
    });
  }

  remove(id: string): void {
    this.taskService.deletePost(id)
    .pipe(takeUntil(this.unsubsciber$))
      .subscribe(() => {
        this.alert.danger('Задача была удалена');
        this.tasks = this.tasks.filter(post => post.id !== +id);
      });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id)
    .pipe(takeUntil(this.unsubsciber$))
      .subscribe((task) => {
        this.alert.warning('Задача завершена');
        this.tasks.find(t => t.id === task.id).completed = true;
      });
  }

  ngOnDestroy(): void {
    this.unsubsciber$.next();
    this.unsubsciber$.complete();
  }
}
