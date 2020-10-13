import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  form: FormGroup

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const task: Task = {
      title: this.form.value.title,
      text: this.form.value.text,
      date: this.form.value.date 
    } 

    this.taskService.create(task).subscribe((ob) => {
      this.form.reset()
      console.log(ob)
    })

  }

}
