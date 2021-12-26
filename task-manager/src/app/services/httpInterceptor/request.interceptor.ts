/*
  Interceptors transform the outgoing request before passing it to the next interceptor
   in the chain, by calling next.handle(transformedReq). 
*/
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, EMPTY, Observable, switchMap, tap, throwError } from 'rxjs'
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
    // Append the auth header to the request
    req = this.appendAccessTokenToReq(req)

    // Handle the transformed request
    return next.handle(req).pipe(
      // Catch ant errors on the response
      catchError((error: HttpErrorResponse) => {
        // Check if the user is unauthorized, redirect to login
        if (error.status === 401 && !this.refreshingAccessToken) {
          // Try to refresh the access token
          return this.refreshAccessToken().pipe(
            // switch to a new observable.
            switchMap(() => {
              req = this.appendAccessTokenToReq(req)
              return next.handle(req)
            }),
            catchError((error: any) => {
              console.log('Something went wrong', error)

              // Navigate to the login page by logout the user (remove his data from the local storage)
              this.authService.logout()

              //Just emits 'complete', and nothing else.
              return EMPTY
            })
          )
        } else {
          // Throw the error if it is not 401
          return throwError(() => error)
        }
      })
    )
  }

  /**
   * @purpose - Get the access token from the local storage and add it in the request headers
   * @param req The request object
   * @returns the request object with the access token in the header
   */
  appendAccessTokenToReq(req: HttpRequest<any>) {
    // Get the access token
    const accessToken = this.authService.getAccessToken()

    if (accessToken) {
      // Add the token to the request
      /* 
      The clone() method's hash argument lets you mutate specific properties
       of the request while copying the others.
      */
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
      // tap == do
      tap(() => {
        this.refreshingAccessToken = false
        console.log('Token Refreshed 💃🏻💃🏻')
      })
    )
  }
}
