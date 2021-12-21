import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  catchError,
  EMPTY,
  empty,
  Observable,
  switchMap,
  tap,
  throwError
} from 'rxjs'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
  refreshingAccessToken: Boolean = false

  constructor(private authService: AuthService) {}

  // Implement the intercept method
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Handle the request
    req = this.addAuthHeader(req)

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if the user is unauthorized, redirect to login
        if (error.status === 401 && !this.refreshingAccessToken) {
          // Try to refresh the access token
          return this.refreshAccessToken().pipe(
            // switch to a new observable.
            switchMap(() => {
              req = this.addAuthHeader(req)
              return next.handle(req)
            }),
            catchError((error: any) => {
              // Navigate to the login page
              this.authService.logout()

              //Just emits 'complete', and nothing else.
              return EMPTY
            })
          )
        }

        // Throw the error if it is not 401
        return throwError(() => error)
      })
    )
  }

  /**
   * @purpose - Get the access token from the local storage and add it in the request headers
   * @param req The request object
   * @returns the request object with the access token in the header
   */
  addAuthHeader(req: HttpRequest<any>) {
    // Get the access token
    const accessToken = this.authService.getAccessToken()

    if (accessToken) {
      // Add the token to the request
      return req.clone({
        setHeaders: {
          'x-access-token': accessToken
        }
      })
    }

    // return the request object
    return req
  }

  /**
   * @purpose - Try to refresh the access token for the user
   */
  refreshAccessToken() {
    this.refreshingAccessToken = true
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false
        console.log('Token Refreshed 💃🏻💃🏻')
      })
    )
  }
}
