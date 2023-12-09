import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private menuHeaderTitle: BehaviorSubject<string>;
  private isLoading: BehaviorSubject<boolean>;

  constructor() { 
    this.menuHeaderTitle = new BehaviorSubject<string>("");
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  getMenuHeaderTitle() {
    return this.menuHeaderTitle.asObservable();
  }

  setMemuHeaderTitle(title: string) {
    this.menuHeaderTitle.next(title);
  }

  getIsLoading() {
    return this.isLoading.asObservable();
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

}
