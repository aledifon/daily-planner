import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);

  protected readonly registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
  });

  protected onCreateAccount(): void {
    if (this.isSubmitting())
      return;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Reset the UI state for the new register attempt.
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.authService.register(this.registerForm.getRawValue())
      .subscribe({
      // Executed when the HTTP Observable emits a successful response.
      next: () => {
        
        this.successMessage.set('Account created successfully.');
        this.isSubmitting.set(false);

        // Navigate to the login page after successful registration.
        this.router.navigateByUrl('/login', {  replaceUrl: true });
      },

      // Executed when the request emits an HTTP or network error.
      error: (error) => {
        console.error(error);
        this.errorMessage.set(error.error?.message || "Unable to create account.");
        this.isSubmitting.set(false);
      },
    });
  }
}
