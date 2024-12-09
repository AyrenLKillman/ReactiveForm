import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


  function equalValues(controlName1: string, controlName2: string) {

    return (control: AbstractControl) => {
      const Value1 = control.get(controlName1)?.value
      const Value2 = control.get(controlName2)?.value
  
      if (Value1 === Value2) {
        return null;
      }
      return {valuessNotEqual: true}
    }

  }

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),

    passwords: new FormGroup({
      password: new FormControl('',{
        validators: [Validators.minLength(6), Validators.required]
      }),
      confirmPassword: new FormControl('',{
        validators: [Validators.minLength(6), Validators.required]
      }),
    }, {validators: [equalValues('password', 'confirmPassword')]}),

    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),

    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required]
      }),
      number: new FormControl('', {
        validators: [Validators.required]
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required]
      }),
      city: new FormControl('', {
        validators: [Validators.required]
      })
    }),
    role: new FormControl<"student" | "teacher" | "employee" | "founder" | "other" >('student', {
      validators: [Validators.required]
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {validators: [Validators.required]})
  });


  onSubmit() {
    if (this.form.invalid){
      console.log('invalid form')
      return;
    }

    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }


}

