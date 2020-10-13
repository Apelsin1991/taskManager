import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  edit = false
  form: FormGroup

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute) { }
    task: Task

  ngOnInit(): void {
    this.edit = false
    if(this.route.params.value['id']) {
      this.edit = true
      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.taskService.getById(params['id'])
        })
        ).subscribe((task: Task) => {
          this.task = task
          this.form = new FormGroup({
            title: new FormControl(task.title, Validators.required),
            text: new FormControl(task.text, Validators.required),
            date: new FormControl(task.date, Validators.required)
          })
        })
    }


    this.form = new FormGroup ({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    } else if (this.edit === true) {
      this.taskService.update({
        ...this.task,
        text: this.form.value.text,
        title: this.form.value.title,
        date: this.form.value.date
      })
    }

    const task: Task = {
      title: this.form.value.title,
      text: this.form.value.text,
      date: this.form.value.date 
    } 

    this.taskService.create(task).subscribe(() => {
      this.form.reset()
      
    })

  }

}
