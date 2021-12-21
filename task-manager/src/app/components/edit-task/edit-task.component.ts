import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ListService } from 'src/app/services/list/list.service'
import { TaskService } from 'src/app/services/task/task.service'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  // The list id of the task
  currentListId: string = ''
  currentTaskId: string = ''

  constructor(
    private taskService: TaskService,
    private listService: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Read the list id from the params
    this.route.params.subscribe((params: Params) => {
      // Extract the params from the route - The param is defined as 'listId' and 'taskId'
      const listId = params['listId']
      const taskId = params['taskId']

      /// Redirect the user to the home page if the listId is invalid
      this.redirectUserIfNoList(listId)
      this.redirectUserIfNoTask(taskId, listId)

      // Set the list id and task id
      this.currentListId = listId
      this.currentTaskId = taskId
    })
  }

  /**
   * @purpose :Redirect the user if the list id is invalid
   * @param listId - the listId to be checked
   */
  redirectUserIfNoList(listId: string) {
    /*
      - Ensure that the given list id is valid
        - Read all the lists ids from the server
        - check if the listId is one of them
        - if not, redirect the user
      */
    this.listService.getListsIds().subscribe((listsIds: any) => {
      if (listsIds.filter((l: any) => l._id === listId).length == 0) {
        this.router.navigateByUrl('/lists')
      }
    })
  }

  /**
   * @purpose :Redirect the user if the task id is invalid in the given list
   * @param taskId - the listId to be checked
   */
  redirectUserIfNoTask(taskId: string, listId: string) {
    /*
      - Ensure that the given list id is valid
        - Read all the lists ids from the server
        - check if the listId is one of them
        - if not, redirect the user
      */
    this.taskService.getTasksIds(listId).subscribe((tasksIds: any) => {
      if (tasksIds.filter((t: any) => t._id === taskId).length == 0) {
        this.router.navigateByUrl('/lists')
      }
    })
  }

  /**
   * @purpose - Handle click event on update list button
   */
  onUpdateBtnClicked(newTitle: string) {
    this.taskService
      .updateTask(this.currentListId, this.currentTaskId, newTitle)
      .subscribe(() => {
        // Navigate the user to the previous page with the same list id
        this.router.navigate(['/lists', this.currentListId])
      })
  }
}
