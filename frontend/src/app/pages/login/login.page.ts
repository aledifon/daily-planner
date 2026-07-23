import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',

  // ReactiveFormsModule provides reactive-form directives such as
  // formGroup, formControlName and ngSubmit.
  imports: [ReactiveFormsModule],

  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',

  // Performs more selective change detection.
  // Signals read by the template notify Angular when the view must update.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  // Dependencies obtained from Angular's Dependency Injection container.
  // They are private because only this TypeScript class needs them.
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  // Reactive UI state used by the template.
  // protected exposes it to the component template without making it
  // part of the component's public API.
  // readonly prevents replacing the signals, but their values can change
  // through set() or update().
  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);

  // group() creates and returns a FormGroup.
  // NonNullableFormBuilder creates controls whose values are string
  // instead of string | null.
  protected readonly loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  // Called by the form's (ngSubmit) event in the template.
  protected submit(): void {
    if(this.isSubmitting())
      return;

    // Stop submission and reveal validation errors if the form is invalid.
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Reset the UI state for the new login attempt.
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // login() returns an RxJS Observable describing the HTTP request.
    // subscribe() starts the HttpClient request without blocking
    // JavaScript's main thread.
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      // Executed when the HTTP Observable emits a successful response.
      next: () => {
        this.successMessage.set('Login successful.');
        this.isSubmitting.set(false);
      },

      // Executed when the request emits an HTTP or network error.
      error: () => {
        this.errorMessage.set('Invalid email or password.');
        this.isSubmitting.set(false);
      },
    });
  }
}
