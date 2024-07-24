import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router)

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  
  })
  
  onSubmit(): void {
    if (this.form.valid) {
      
//@ts-ignore
      this.authService.login(this.form.value).subscribe({
        
        next: (response) => {
          this.router.navigate(['/video'])
          console.log('Login successful:', response);
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
  // ngOnInit() { 
  //   console.log(this.form);
    
    
  // }
}
