import { ActivatedRoute, Params, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { List } from 'src/app/models/list.model'
import { ListService } from 'src/app/services/list/list.service'

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  // Property to hold the current List Id
  currentListId: string = ''

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read the list id from the params
    this.route.params.subscribe((params: Params) => {
      // Extract the params from the route - The param is defined as 'listId'
      const listId = params['listId']

      /// Redirect the user to the home page if the listId is invalid
      this.redirectUserIfNoList(listId)

      // Set the list id
      this.currentListId = listId
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
    this.listService.getListsId().subscribe((listsIds: any) => {
      if (listsIds.filter((l: any) => l._id === listId).length == 0) {
        this.router.navigateByUrl('/lists')
      }
    })
  }

  /**
   * @purpose - Handle click event on update list button
   */
  onUpdateBtnClicked(newTitle: string) {
    this.listService.updateList(this.currentListId, newTitle).subscribe(() => {
      // Navigate the user to the previous page with the same list id
      this.router.navigate(['/lists'], { relativeTo: this.route })
    })
  }
}
