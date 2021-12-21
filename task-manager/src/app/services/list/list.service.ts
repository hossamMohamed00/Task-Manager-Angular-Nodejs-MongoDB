import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpRequestsService } from '../httpRequests/http-requests.service'

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private httpRequestService: HttpRequestsService) {}

  /**
   * @purpose Create new list by send get request to the server
   * @param title - The list title
   */
  createList(title: string): Observable<any> {
    // Send request to the server
    return this.httpRequestService.post('lists', { title })
  }

  /**
   * @purpose Get all lists
   * @return: All the lists in the db for this user
   */
  getLists(): Observable<any> {
    // Send request to the server
    return this.httpRequestService.get('lists')
  }

  getListsId(): Observable<Object> {
    return this.httpRequestService.getSpecificField('lists', '_id')
  }
}
