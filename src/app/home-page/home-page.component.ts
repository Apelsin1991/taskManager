import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  gSub: Subscription;
  dSub: Subscription;
  cSub: Subscription;
  uSub: Subscription;
  search = '';
  poster: any;

  constructor(
    private taskService: TaskService,
    private alert: AlertService) { }

  ngOnInit(): void {
          this.gSub = this.taskService.getAll()
      .subscribe((response) => {
          this.tasks = response;
          this.tasks.sort((a, b) => a.order - b.order);
      });
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
      this.uSub = this.taskService.update(item)
      .subscribe();
    });
  }

  remove(id: string): void {
    this.alert.danger('Задача была удалена');
    this.dSub = this.taskService.deletePost(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(post => post.id !== id);
      });
  }

  completeTask(id: number): void {
    this.alert.warning('Задача завершена');
    this.cSub = this.taskService.completeTask(id)
      .subscribe((task) => {
        this.tasks.find(t => t.id === task.id).completed = true;
      });
  }


  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }

    if (this.cSub) {
      this.cSub.unsubscribe();
    }

    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}
