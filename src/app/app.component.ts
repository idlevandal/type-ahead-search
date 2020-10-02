import { HttpClient } from '@angular/common/http';
// @ts-check
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('searchInput') input: ElementRef;

  public users: any;
  private readonly ACCESS_KEY = 'unsplash key goes here 😁';

  constructor(private http: HttpClient) {}

  public ngAfterViewInit(): void {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(ev => ev.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        filter(val => val.length > 1),
        tap(() => this.users = []),
        // switchMap((user) => this.http.get(`https://jsonplaceholder.typicode.com/users/${user}`)),
        switchMap((user) => this.http.get(`https://api.unsplash.com/search/users?client_id=${this.ACCESS_KEY}&page=1&query=${user}`)),
      ).subscribe(res => {
        this.users = res['results'];
        
      });
  }
}
