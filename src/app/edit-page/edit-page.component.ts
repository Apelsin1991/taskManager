import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';

import {
  Observable
} from 'rxjs';

import {
  switchMap
} from 'rxjs/operators';

import {
  Task
} from '../shared/interface';

import {
  TaskService
} from '../shared/task.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  task: Task

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) {}
  

    ngOnInit(): void {

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

    submit() {

    this.taskService.update({
      id: this.task.id,
      text: this.form.value.text,
      title: this.form.value.title,
      date: this.form.value.date
    })
    .subscribe((re) => {
      console.log(re)
      this.form.reset()
      this.router.navigate([''])
    }
    )
  }

}
