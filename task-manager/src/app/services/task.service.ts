import { Injectable } from '@angular/core'
import { HttpRequestsService } from '../services/http-requests.service'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpRequestService: HttpRequestsService) {}

  /**
   * @purpose Get all the tasks belongs to specified list
   * @param listId : The list id to get its tasks
   * @return: <Observable> of tasks
   */
  getTasks(listId: string) {
    const uri = `lists/${listId}/tasks`
    return this.httpRequestService.get(uri)
  }
}
