import { AuthService } from './../../services/auth/auth.service'
import { Component, OnInit } from '@angular/core'
import { HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoginButtonClicked(email: string, password: string) {
    this.authService
      .login(email, password)
      .subscribe((res: HttpResponse<any>) => {
        if (res.status === 200) {
          console.log('Logged In 🔥')
          // Navigate the user to the home page
          this.router.navigate(['/lists'])
        }
      })
  }
}
