import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  // @ts-ignore
  registerForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      // @ts-ignore
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : {isMatching: true}
    }
  }


  register() {
    console.log(this.registerForm.value);
    /*this.accountService.register(this.model).subscribe(response => {
      this.cancel();
    }, error => {
      this.toastr.error(error.error);
    })*/
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
