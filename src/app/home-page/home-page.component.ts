import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
      .subscribe(tasks => {
        this.tasks = tasks
        this.tasks.forEach((item, inx) => {
          item.order = inx + 1
        })        
      })
      this.tasks.sort((a, b) => {return a.order - b.order})
      // setInterval(()=> {console.log(this.tasks[0])}, 4000)
  }

  deadline(str: string) {
    if (new Date(str) > new Date) {
      return 'red'
    } else if (Date.now() - Date.parse(str)  < 259200000) {
      return 'pink'
    }        
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks.forEach((task, inx) => {
      if(task.order !== 0) {
        task.order = inx + 1;
      }
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

    // не работает
    if (this.tasks) {
      this.tasks.forEach((task) => {
        this.taskService.update(task)
      })
    }
  }


}
