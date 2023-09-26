import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/service/auth.service";
import {take} from "rxjs";
import {Users} from "../../shared/model/users.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm : FormGroup = new FormGroup({});

  isLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.isLogin = true;
    this.initFormulaire();
  }

  initFormulaire(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: [''],
      password: ['', Validators.required],
    });
  }

  getFormControl(name: string): FormControl {
    return <FormControl<any>>this.loginForm.get(name);
  }

  switchToLogin(value: boolean): void {
    this.isLogin = value;
    if (!value) {
      this.getFormControl('username').setValidators([Validators.required]);
    }
    else {
      this.getFormControl('username').clearValidators();
    }

    this.getFormControl('username').updateValueAndValidity();
  }

  loginUser(): void {
    const user : Users = {
      email: this.getFormControl('email').value,
      password: this.getFormControl('password').value,
    }
    this.authService.getUser(user)
      .pipe(take(1))
      .subscribe((data: Users[]) => {
        if (data.length > 0) {
          this.authService.setCurrentUser(data[0]);
          this.router.navigate(['/home-page']);
        }
        else {
          this.loginForm.setErrors({...this.loginForm.errors, noUser: 'Wrong Email' });
        }
      })
  }

  registerUser(): void {
    const user : Users = {
      id: 1,
      email: this.getFormControl('email').value,
      username: this.getFormControl('username').value,
      password: this.getFormControl('password').value,
    }
    this.authService.addUser(user)
      .pipe(take(1))
      .subscribe((data: Users) => {
        this.authService.setCurrentUser(data);
        this.router.navigate(['/home-page']);
      })
  }
}
