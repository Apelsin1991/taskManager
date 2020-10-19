import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../shared/alert.servise';
import { ErrorService } from '../shared/error.service';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  form: FormGroup;
  unsubsciber$: Subject< void > = new Subject< void >();

  constructor(
    private taskService: TaskService,
    private router: Router,
    private alert: AlertService,
    private errorService: ErrorService) {}

  ngOnInit(): void {
    this.form = new FormGroup ({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }

  submit(): void {

    const task: Task = this.form.value;

    this.taskService.create(task)
    .pipe(takeUntil(this.unsubsciber$))
    .subscribe(() => {
      this.alert.success('Задача была создана');
      this.form.reset();
      this.router.navigate(['']);
    },
      error => {
      this.errorService.doError(error.message)}
    );
  }

  ngOnDestroy(): void {
    this.unsubsciber$.next();
    this.unsubsciber$.complete();
  }
}
