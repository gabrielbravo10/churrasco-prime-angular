import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  subject = new Subject<string>();
  subscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.subscription = this.subject.pipe(debounceTime(500)).subscribe((value) => {
      console.log("testing", value)
      this.router.navigateByUrl(`/search/${value}`);
    })
  }

  doSearch(value: string) {
    this.subject.next(value);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
