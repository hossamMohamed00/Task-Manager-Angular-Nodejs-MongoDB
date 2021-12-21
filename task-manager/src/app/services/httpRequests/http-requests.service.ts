import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  /* Properties */
  readonly URL

  /* Constructor */
  constructor(private httpClient: HttpClient) {
    this.URL = 'http://localhost:3000'
  }

  /* Methods */
  /**
   * @purpose Send http get request
   * @param uri - The resource to send the request to it
   */
  get(uri: string) {
    // Send the request
    const fullUrl = `${this.URL}/${uri}`
    return this.httpClient.get(fullUrl)
  }

  /**
   * @purpose Send http get request
   * @param uri - The resource to send the request to it
   */
  getSpecificField(uri: string, field: string) {
    // Send the request
    const fullUrl = `${this.URL}/${uri}?fieldName=${field}`
    return this.httpClient.get(fullUrl)
  }

  /**
   * @purpose Send http post request
   * @param uri - The resource to send the request to it
   * @param payload - The data to be sent to the server
   */
  post(uri: string, payload: Object) {
    // Send the request
    const fullUrl = `${this.URL}/${uri}`
    return this.httpClient.post(fullUrl, payload)
  }

  /**
   * @purpose Send http patch request
   * @param uri - The resource to send the request to it
   * @param payload - The data to be sent to the server
   */
  patch(uri: string, payload: Object) {
    // Send the request
    const fullUrl = `${this.URL}/${uri}`
    return this.httpClient.patch(fullUrl, payload)
  }

  /**
   * @purpose Send http delete request
   * @param uri - The resource to send the request to it
   */
  delete(uri: string) {
    // Send the request
    const fullUrl = `${this.URL}/${uri}`
    return this.httpClient.delete(fullUrl)
  }

  /*-----------Auth Requests----------------*/
  /**
   * @purpose - Send post request to the server to login the user
   * @param email - User's email'
   * @param password - User's password'
   * @returns Observable
   */
  login(email: string, password: string) {
    // Send the request
    const fullUrl = `${this.URL}/users/login`
    return this.httpClient.post(
      fullUrl,
      { email, password },
      {
        observe: 'response'
      }
    )
  }

  signup(name: string, email: string, password: string) {
    // Send the request
    const fullUrl = `${this.URL}/users/signup`
    return this.httpClient.post(
      fullUrl,
      { name, email, password },
      {
        observe: 'response'
      }
    )
  }
}
