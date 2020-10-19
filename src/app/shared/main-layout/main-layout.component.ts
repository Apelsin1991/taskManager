import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  errorText = '';

  constructor(private servise: ErrorService) {}

  ngOnInit(): void {
    this.servise.erText
    .subscribe(errorMessage => {this.errorText = errorMessage})
  }

  clearError() {
    this.errorText = ''
  }
}
