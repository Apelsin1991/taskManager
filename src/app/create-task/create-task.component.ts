import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/alert.servise';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  form: FormGroup
  task: Task
  cSub: Subscription

  constructor(
    private taskService: TaskService,
    private router: Router,
    private alert: AlertService) {}
        
  ngOnInit(): void {
    this.form = new FormGroup ({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    })
  }
  
  submit() {
    this.alert.success('Задача была создана')

    this.task = {
      id: this.form.value.id,
      text: this.form.value.text,
      title: this.form.value.title,
      date: this.form.value.date
    }

    this.cSub = this.taskService.create(this.task)
    .subscribe(() => {
      this.form.reset()
      this.router.navigate([''])
    })
  }

  ngOnDestroy(): void {
    if(this.cSub) {
      this.cSub.unsubscribe()
    }
  }
}
