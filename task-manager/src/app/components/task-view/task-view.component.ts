import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { TaskService } from '../../services/task.service'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  /* properties */
  tasks: any[] = []

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
        this.taskService.getTasks(listId).subscribe((tasks: any) => {
          this.tasks = tasks
        })
      }
    })
  }
}
