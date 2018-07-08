import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numbersOnSubscription: Subscription;
  CustomSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers =  Observable.interval(1000)
      .map(
        (data: number) => {
          return data * 2;
        }
      );
    this.numbersOnSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      });
    // );
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('package one');
      }, 2000);
      setTimeout(() => {
        observer.next('package two');
      }, 4000);
      setTimeout(() => {
        observer.next('package failed');
      }, 5000);
    });
    this.CustomSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
              console.log('Completed');
            }
    );
  }

  ngOnDestroy() {
    this.numbersOnSubscription.unsubscribe();
    this.CustomSubscription.unsubscribe();
  }
}
