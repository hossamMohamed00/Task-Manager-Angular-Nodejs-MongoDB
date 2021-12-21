import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpRequestsService } from '../services/http-requests.service'
import { Task } from '../models/task.model'
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
  getTasks(listId: string): Observable<any> {
    const uri = `lists/${listId}/tasks`
    return this.httpRequestService.get(uri)
  }

  /**
   * @purpose Create new task for specified list
   * @param listId : The list to add the task to it
   * @return: <Observable> of the new task
   */
  createTask(listId: string, title: string): Observable<any> {
    const uri = `lists/${listId}/tasks`
    return this.httpRequestService.post(uri, { title })
  }

  /**
   * @purpose - Toggle the task completed value
   * @param task - Object contains all task information
   * @returns <Observable> of task to be subscribed
   */
  toggleComplete(task: Task): Observable<any> {
    const uri = `lists/${task.listId}/tasks/${task._id}`
    return this.httpRequestService.patch(uri, { completed: !task.completed })
  }
}
