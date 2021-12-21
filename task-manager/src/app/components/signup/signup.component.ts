import { HttpResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSignupButtonClick(name: string, email: string, password: string) {
    this.authService
      .signup(name, email, password)
      .subscribe((res: HttpResponse<any>) => {
        console.log('Signup Done 🔥')
      })
  }
}
