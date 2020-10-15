import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router) {}
    task: Task
    
  ngOnInit(): void {


    this.form = new FormGroup ({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    })
  }

  
  submit() {
      this.taskService.create({
        id: this.form.value.id,
        text: this.form.value.text,
        title: this.form.value.title,
        date: this.form.value.date
      })
      .subscribe(() => {
        this.router.navigate([''])
      })
  }
}
