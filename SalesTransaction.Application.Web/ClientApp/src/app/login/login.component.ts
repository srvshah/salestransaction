import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MvLogin } from './login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = null;
  errorMessageType: any = {
    invForm: 'Invalid form!',
    invLogin: 'Invalid username or password!'
  };
  loginForm: FormGroup;
  login: MvLogin = {} as MvLogin;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin(): void {
    if (this.username.errors || this.password.errors){
      this.errorMessage = this.errorMessageType.invForm;
    }
    else {
      this.login.username = this.username.value.trim();
      this.login.password = this.password.value.trim();

      this.loginService.getLogin(this.login).subscribe(res => {
        if (res && res.personId){
          this.openSnackBar('Login Success!', 'success');
          this.router.navigate(['/user-detail', res.personId]);
        }
        else {
          this.errorMessage = this.errorMessageType.invLogin;
        }
      });
    }

  }

  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  openSnackBar(message: string, action: string): any {
    this.snackbar.open(message, 'close', {
      duration: 3000, // in milli-seconds
      panelClass: [action],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
