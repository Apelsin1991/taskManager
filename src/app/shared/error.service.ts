import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  erText: Subject<string> = new Subject();

  public doError(errorMessage: string): any {
    return this.erText.next(errorMessage)
  }
}
