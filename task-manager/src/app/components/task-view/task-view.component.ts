import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ListService } from '../../services/list.service'
import { TaskService } from '../../services/task.service'
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  /* properties */
  lists: any[] = []
  tasks: any[] = []
  canAddNewList: boolean = true
  // Define maximum number of list as static
  static MAXIMUM_LIST_SIZE_ALLOWED: number = 10
  /* constructor */
  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  /* Methods */
  ngOnInit(): void {
    // Read the params and read tasks of the list
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

    // Get all lists available
    this.listService.getLists().subscribe((lists: any): void => {
      // Set the lists property
      this.lists = lists

      // Check if the user reached the maximum number of lists
      this.checkReachMaximum()
    })
  }

  /* Helper Methods */

  /**
   * @purpose Set canAddNewList to true if the user still can add more lists
   * @param listLength : Lists's count
   */
  private checkReachMaximum() {
    // Get the length of the lists
    const listLength: number = this.lists.length
    if (listLength >= TaskViewComponent.MAXIMUM_LIST_SIZE_ALLOWED) {
      this.canAddNewList = false
    } else {
      this.canAddNewList = true
    }
  }
}
