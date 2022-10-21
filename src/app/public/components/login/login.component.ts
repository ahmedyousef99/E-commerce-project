import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formInitialize();
  }

  ngOnInit(): void {}
  formInitialize(): void {
    this.form = this.formBuilder.group({
      email: [``, Validators.required],
      password: [``, Validators.required],
    });
  }

  onClickLogin() {
    console.log(this.form.value);
    this.auth
      .login(this.form.get(`email`).value, this.form.get(`password`).value)
      .subscribe((res) => {
        console.log(res);
        this.accountService.setUser(res);
        let doneMessage: string = `${this.accountService.getFullName()} is logged in`;
        this.toastr.success(doneMessage);
        if (this.accountService.isAdminRole()) {
          this.router.navigate([`admin`]);
        } else if (this.accountService.isUser()) {
          this.router.navigate([`product`]);
        }
      });
  }
}
