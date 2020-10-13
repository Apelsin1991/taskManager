import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  tasks: Task[] = []
  tSub: Subscription
  rSub: Subscription
  search = ''

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tSub = this.taskService.getAll()
      .subscribe(task => {
        this.tasks = task
      })
  }

  remove(id: string) {
    this.rSub = this.taskService.deletePost(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(post => post.id !== id)
      })
  }

  ngOnDestroy() {
    if (this.tSub) {
      this.tSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }
  

}
