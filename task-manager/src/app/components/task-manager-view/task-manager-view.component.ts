import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-task-manager-view',
  templateUrl: './task-manager-view.html',
  styleUrls: ['./task-manager-view.scss']
})
export class TaskManagerViewComponent implements OnInit {

  // props from list view => to display tasks of this list
  @Input() display_task_of_list_sm:string = "none"
  @Output() display_sm_after_load:EventEmitter<string> = new EventEmitter<string>()

  /* constructor */
  constructor() {}

  // A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    setTimeout(() => {
      this.hideLoader()
      this.showTaskManagerContainer()
    }, 1500)
  }

  showTaskManagerContainer() {
    const taskManagerObj = document.getElementById('task-manager-view')

    if (taskManagerObj) {
      taskManagerObj.style.display = 'block'
    }
  }

  hideLoader() {
    const loaderObj = document.getElementById('loading')
    if (loaderObj) {
      loaderObj.style.display = 'none'
    }
    //return true;
  }


}
