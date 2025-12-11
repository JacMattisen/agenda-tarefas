import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordFieldComponent } from '../../shared/components/password-field/password-field.component';
import { MatIcon } from '@angular/material/icon';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserLoginPayload, UserService } from '../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIcon,
    PasswordFieldComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  //encapsulation: ViewEncapsulation.None, DEPOIS VER ONDE ELE É USADO
})
export class LoginComponent {
  isLoading: boolean = false;
  form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  router: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    });
  }

  get emailErros(): string | null {
    const emailControl = this.form.get('email');
    if (emailControl?.hasError('required')) {
      return 'The email field is required.';
    }
    if (emailControl?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return null;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value as UserLoginPayload;

    this.isLoading = true;

    this.userService
      .login(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(' Error accessing', error);
        },
      });
  }
}
