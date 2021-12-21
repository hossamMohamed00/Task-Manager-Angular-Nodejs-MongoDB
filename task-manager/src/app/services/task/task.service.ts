import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpRequestsService } from '../httpRequests/http-requests.service'
import { Task } from '../../models/task.model'
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
   * @returns All available tasks ids
   */
  getTasksIds(listId: string): Observable<Object> {
    return this.httpRequestService.getSpecificField(
      `lists/${listId}/tasks`,
      '_id'
    )
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

  /**
   * @purpose : Update task data
   * @param _listId -The list id that the task belongs to
   * @param _taskID -The task id to be updated
   * @param newTitle - the updated title
   */
  updateTask(
    _listId: string,
    _taskId: string,
    newTitle: string
  ): Observable<any> {
    return this.httpRequestService.patch(`lists/${_listId}/tasks/${_taskId}`, {
      title: newTitle,
      completed: false
    })
  }

  /**
   * @purpose - Delete task
   * @param task -The task to be deleted
   */
  deleteTask(task: Task): Observable<any> {
    const uri = `lists/${task.listId}/tasks/${task._id}`
    return this.httpRequestService.delete(uri)
  }
}
