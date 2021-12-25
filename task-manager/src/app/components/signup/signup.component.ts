import { HttpResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // error message password length is less than 6
  errorMessage:boolean = false
  submitButton:boolean = false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  checkPasswordLength(passwordInput:string){
    if(passwordInput.length < 6 ){
      this.errorMessage = true
      this.submitButton = true
    }
    else{
      this.errorMessage = false
      this.submitButton = false
    }
  }
  onSignupButtonClick(name: string, email: string, password: string) {
    this.authService
      .signup(name, email, password)
      .subscribe((res: HttpResponse<any>) => {
        console.log('Signup Done 🔥')
      })
  }
}
