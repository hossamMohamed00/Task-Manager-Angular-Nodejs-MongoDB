import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { TaskService } from '../../services/task/task.service'
import { Task } from '../../models/task.model'
import { AuthService } from 'src/app/services/auth/auth.service'
import { ListService } from 'src/app/services/list/list.service'
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  /* properties */
  tasks: Task[] = undefined!
  currentListId: string = ''

  /* constructor */
  constructor(
    private taskService: TaskService,
    private listService: ListService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read the params and read tasks of the list
    this.showTasksIfListProvided()
  }

  /* Methods */
  /**
   * @purpose - This method tries to read the list id from the params and show its tasks
   */
  showTasksIfListProvided() {
    this.route.params.subscribe((params: Params) => {
      // Extract the params from the route - The param is defined as 'listId'
      const listId = params['listId']

      // If there are listId provided, so get its tasks
      if (listId) {
        // Set the listId
        this.currentListId = listId

        // Get all the tasks of this list
        this.taskService.getTasks(listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks
        })
      }
    })
  }

  /**
   * @purpose - This method handel user click on task, to toggle it
   * @param task - The task to toggle it
   */
  onTaskClick(task: Task) {
    // Call toggleComplete from the service
    this.taskService.toggleComplete(task).subscribe(() => {
      // Toggle the completed value in the view
      task.completed = !task.completed
    })
  }

  /**
   * @purpose - This method will used to logout the user
   */
  onLogoutBtnClicked() {
    this.authService.logout()
  }

  /**
   * @purpose - This method delete a list
   */
  onDeleteListBtnClicked() {
    this.listService.deleteList(this.currentListId).subscribe(() => {
      console.log('List Deleted ❌')
      this.router.navigate(['/lists'])
    })
  }

  /**
   * @purpose - Delete task
   * @param taskId - The task to be deleted
   */
  onDeleteTaskBtnClicked(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      console.log('Task Deleted ❌')
      // Remove the task from the tasks array
      this.tasks = this.tasks.filter((t) => t._id !== task._id)
    })
  }
}
