import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-task-manager-view',
  templateUrl: './task-manager-view.html',
  styleUrls: ['./task-manager-view.scss']
})
export class TaskManagerViewComponent implements OnInit {
  /* constructor */
  constructor() {}

  // A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    setTimeout(() => {
      this.hideLoader()
      this.showTaskManagerContainer()
    }, 2000)
  }

  showTaskManagerContainer() {
    const taskManagerObj = document.getElementById('task-manager-view')
    if (taskManagerObj) {
      taskManagerObj.style.display = 'flex'
    }
  }

  hideLoader() {
    const loaderObj = document.getElementById('loading')
    if (loaderObj) {
      loaderObj.style.display = 'none'
    }
  }
}
