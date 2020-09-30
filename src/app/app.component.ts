import { HttpClient } from '@angular/common/http';
// @ts-check
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('searchInput') input: ElementRef;

  public user: any;

  constructor(private http: HttpClient) {}

  public ngAfterViewInit(): void {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(ev => ev.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((user) => this.http.get(`https://jsonplaceholder.typicode.com/users/${user}`)),
      ).subscribe(user => {
        this.user = user;
      });
  }
}
