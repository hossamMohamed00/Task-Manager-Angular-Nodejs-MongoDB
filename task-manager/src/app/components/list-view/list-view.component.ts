import { List } from './../../models/list.model'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ListService } from '../../services/list.service'

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  /* properties */
  lists: List[] = []
  canAddNewList: boolean = true
  // Define maximum number of list as static
  static MAXIMUM_LIST_SIZE_ALLOWED: number = 10

  //display lists in small media
  @Input() display_list_sm:string = "none"
  @Output() display_list_sm_change:EventEmitter<string> = new EventEmitter<string>()

   //display lists in small media
   @Output() display_task_of_list_sm_change:EventEmitter<string> = new EventEmitter<string>()


  /* Constructor */
  constructor(private listService: ListService) {}

  // A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    // Get all lists available
    this.showAvailableLists()
  }

  /* Helper Methods */

  /**
   * @purpose - This method is used to read all the available lists from the serve
   */
  showAvailableLists() {
    this.listService.getLists().subscribe((lists: List[]): void => {
      // Set the lists property
      this.lists = lists

      // Check if the user reached the maximum number of lists
      this.checkReachMaximum()
    })
  }
  /**
   * @purpose Set canAddNewList to true if the user still can add more lists
   * @param listLength : Lists's count
   */
  private checkReachMaximum() {
    // Get the length of the lists
    const listLength: number = this.lists.length
    if (listLength >= ListViewComponent.MAXIMUM_LIST_SIZE_ALLOWED) {
      this.canAddNewList = false
    } else {
      this.canAddNewList = true
    }
  }

  // hide list in small media
  hideList(){
    this.display_list_sm = "none";
    this.display_list_sm_change.emit("none");
  }

  // View all tasks that associated with list
  ViewTasks(){
    this.display_task_of_list_sm_change.emit("block !important");
  }
}
