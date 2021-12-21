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

  /**
   * @returns All available lists ids
   */
  getListsId(): Observable<Object> {
    return this.httpRequestService.getSpecificField('lists', '_id')
  }

  /**
   * @purpose : Update list data
   * @param _listId -The list id to be updated
   * @param newTitle - the updated title
   */
  updateList(_listId: string, newTitle: string): Observable<any> {
    return this.httpRequestService.patch(`lists/${_listId}`, {
      title: newTitle
    })
  }

  /**
   * @purpose - Delete the list by the list id provided
   * @param _listId - The list id to be deleted
   */
  deleteList(_listId: string): Observable<any> {
    return this.httpRequestService.delete(`lists/${_listId}`)
  }
}
