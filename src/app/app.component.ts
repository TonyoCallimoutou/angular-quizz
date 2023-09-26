import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./shared/service/auth.service";
import {Users} from "./shared/model/users.model";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<boolean>();
  title = 'QuizzLearn';

  currentUser: Users | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Users) => {
        this.currentUser = data;
      });
  }
}
