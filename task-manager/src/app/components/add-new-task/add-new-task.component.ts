import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Task } from 'src/app/models/task.model'
import { TaskService } from 'src/app/services/task/task.service'
import { ListService } from 'src/app/services/list/list.service'

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskComponent implements OnInit {
  /* Properties */
  listId: string = ''

  constructor(
    private taskService: TaskService,
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read the list id from the params
    this.route.params.subscribe((params: Params) => {
      // Extract the params from the route - The param is defined as 'listId'
      const listId = params['listId']

      // Redirect the user to the home page if the listId is invalid
      this.redirectUserIfNoList(listId)

      // Set the list id
      this.listId = listId
    })
  }

  /**
   * This method used to handle the user click event on Add new task button
   * @param title : Task title
   */
  createNewTask(title: string) {
    // Create the task
    this.taskService
      .createTask(this.listId, title)
      .subscribe((newTask: Task) => {
        // Navigate the user to the previous page with the same list id
        this.router.navigate(['../'], { relativeTo: this.route })
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
}
