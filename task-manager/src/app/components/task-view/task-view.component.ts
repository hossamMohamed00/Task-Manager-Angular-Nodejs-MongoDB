import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { TaskService } from '../../services/task.service'
import { Task } from '../../models/task.model'
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  /* properties */
  tasks: Task[] = []

  /* constructor */
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
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
}
