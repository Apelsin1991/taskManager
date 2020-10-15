import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  tasks: Task[] = []
  tSub: Subscription
  rSub: Subscription
  search = ''
  poster: any

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {   

      this.tSub = this.taskService.getAll()
      .subscribe((response) => {
          this.tasks = response
          this.tasks.sort((a, b) => {return a.order - b.order})          
      })
  }

  deadline(str: string) {
    if (new Date(str) > new Date()) {
      return 'red'
    } else if (Date.now() - Date.parse(str)  < 259200000) {
      return 'pink'
    }        
  }

  // deadline(str: string) {
    // if ( Date.parse(str) < Date.parse(Date())) {
      // console.log(true)
      // return 'red'
    // } else if (Date.parse(Date()) - Date.parse(str)  < 259200000) {
      // console.log(false)
      // return 'pink'
    // }        
  // }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks.forEach((task, inx) => {
      if(task.order !== 0) {
        task.order = inx + 1;
      }
    }
    )  
    this.tasks.forEach((item) => {
      this.taskService.update(item)
      .subscribe()
    })  
  }

  remove(id: string) {
    this.rSub = this.taskService.deletePost(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(post => post.id !== id)
      })
  }

  completeTask(id: number) {
    this.taskService.completeTask(id)
      .subscribe((task) => {
        this.tasks.find(t => t.id === task.id).completed = true
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
