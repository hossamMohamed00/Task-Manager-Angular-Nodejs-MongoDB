import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpRequestsService } from '../httpRequests/http-requests.service'
import { shareReplay, tap } from 'rxjs/operators'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpRequestService: HttpRequestsService,
    private router: Router,
    private http: HttpClient
  ) {}

  /**
   * @purpose - Signup new user
   * @param name - User's name
   * @param email- User's email
   * @param password - User's password
   */
  signup(name: string, email: string, password: string) {
    return this.httpRequestService.signup(name, email, password).pipe(
      shareReplay(),
      // tap == do
      tap((res: HttpResponse<any>) => {
        // Now, the authTokens available in the response header
        // Store the auth tokens
        const accessToken = res.headers.get('x-access-token')
        const refreshToken = res.headers.get('x-refresh-token')

        // Save the session
        this.setSession(res.body._id, accessToken, refreshToken)

        // Navigate the user to the home page
        this.router.navigate(['/lists'])
      })
    )
  }

  /**
   * @purpose - Try to login user and get his tokens
   * @param email - USer's email address
   * @param password - User's password'
   */
  login(email: string, password: string): Observable<any> {
    return this.httpRequestService.login(email, password).pipe(
      shareReplay(),
      // tap == do
      tap((res: HttpResponse<any>) => {
        // Now, the authTokens available in the response header
        // Store the auth tokens
        const accessToken = res.headers.get('x-access-token')
        const refreshToken = res.headers.get('x-refresh-token')

        // Save the session
        this.setSession(res.body._id, accessToken, refreshToken)
      })
    )
  }

  /**
   * @purpose - Logout the user by remove his access tokens
   */
  logout() {
    // Remove the session data from the local storage
    this.removeSession()

    // Navigate the user
    this.router.navigate(['/login'])
  }

  /**
   * @purpose - This method is used to generate new access token to the user
   * @returns New access token
   */
  getNewAccessToken() {
    const uri = `${this.httpRequestService.URL}/users/me/access-token`
    return this.http
      .get(uri, {
        headers: {
          'x-refresh-token': this.getRefreshToken(),
          _id: this.getUserId()
        },
        observe: 'response'
      })
      .pipe(
        // tap == do
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'))
        })
      )
  }

  /**
   * @return - The user id
   */
  getUserId(): any {
    return localStorage.getItem('user-id')
  }

  /**
   * @returns The user access token
   */
  getAccessToken(): any {
    return localStorage.getItem('x-access-token')
  }

  /**
   * Set the user access token in the local storage
   * @param accessToken - User's access token'
   */
  setAccessToken(accessToken: any) {
    localStorage.setItem('x-access-token', accessToken)
  }

  /**
   * @returns The user refresh token
   */
  getRefreshToken(): any {
    return localStorage.getItem('x-refresh-token')
  }

  /**
   * @purpose - Save the tokens in the local storage
   * @param userId - The user to store its tokens
   * @param accessToken - User's accessToken
   * @param refreshToken - User's refreshToken'
   */
  private setSession(userId: string, accessToken: any, refreshToken: any) {
    localStorage.setItem('user-id', userId)
    localStorage.setItem('x-access-token', accessToken)
    localStorage.setItem('x-refresh-token', refreshToken)
  }

  /**
   * @purpose - Remove the tokens from the local storage
   */
  private removeSession() {
    localStorage.removeItem('user-id')
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-refresh-token')
  }
}
