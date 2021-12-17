import { Injectable } from '@angular/core';
import { HttpRequestsService } from '../services/http-requests.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private httpRequestService: HttpRequestsService) {}

  /**
   * @purpose Create new list by send get request to the server
   * @param title - The list title
   */
  createList(title: string) {
    // Send request to the server
    return this.httpRequestService.post('lists', { title });
  }
}
