import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-task-manager-view',
  templateUrl: './task-manager-view.html',
  styleUrls: ['./task-manager-view.scss']
})
export class TaskManagerViewComponent implements OnInit {

  display_lists:string = "none"
  // display_tasks:string = "none"
  /* constructor */
  constructor() {}

  // props from list view => to display tasks of this list
  @Input() display_task_of_list_sm:string = "none"


  // A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {}

  // functions uesd to add list in small media
  view_List_Sm(){
    this.display_lists="block !important"
  }

}
