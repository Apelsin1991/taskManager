import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  switchMap
} from 'rxjs/operators';
import { AlertService } from '../shared/alert.servise';

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
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  task: Task;
  uSub: Subscription;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService) {}

    ngOnInit(): void {

      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.taskService.getById(params.id);
        })
              ).subscribe((task: Task) => {
        this.task = task;
        this.form = new FormGroup({
          title: new FormControl(task.title, Validators.required),
          text: new FormControl(task.text, Validators.required),
          date: new FormControl(task.date, Validators.required)
        });
      });
    }

    submit(): void {
      this.alert.success('Задача была изменена');

      this.taskService.update({
        id: this.task.id,
        text: this.form.value.text,
        title: this.form.value.title,
        date: this.form.value.date
      })
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['']);
      });
    }

    ngOnDestroy(): void {
      if (this.uSub) {
        this.uSub.unsubscribe();
      }
    }

}
