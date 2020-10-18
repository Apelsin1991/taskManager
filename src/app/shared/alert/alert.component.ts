import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../alert.servise';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  public text: string;
  public type = 'success';
  unsubsciber$: Subject< void > = new Subject< void >()

  aSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$
    .pipe(takeUntil(this.unsubsciber$))
    .subscribe( alert => {
      this.text = alert.text;
      this.type = alert.type;
      setTimeout(() => {
        this.text = '';
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    this.unsubsciber$.next();
    this.unsubsciber$.complete();
  }

}

