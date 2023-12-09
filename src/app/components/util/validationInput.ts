import { FormControl, Validators } from "@angular/forms"

export const FormCntrolsPerson = {
  firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
  gender: new FormControl(0, [Validators.required, Validators.pattern(/[0-1]/)]),
  email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
  phone: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]),
  address: new FormControl('', [Validators.maxLength(100)])
}
// (809) 559-2434
export const FormControlsUserAuth = {
  email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)]),
}