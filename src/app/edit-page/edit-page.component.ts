import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AlertService } from '../shared/alert.servise';
import { ErrorService } from '../shared/error.service';
import { Task } from '../shared/interface';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  task: Task;
  unsubsciber$: Subject< void > = new Subject< void >();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private errorService: ErrorService) {}

    ngOnInit(): void {

      this.route.params.pipe(
        takeUntil(this.unsubsciber$),
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

      this.taskService.update({
        ...this.form.value,
        id: this.task.id
      })
      .pipe(takeUntil(this.unsubsciber$))
      .subscribe(() => {
        this.alert.success('Задача была изменена');
        this.form.reset();
        this.router.navigate(['']);
      },
      error => {
        this.errorService.doError(error.message)});
    }


    ngOnDestroy(): void {
      this.unsubsciber$.next();
      this.unsubsciber$.complete();
    }

}
