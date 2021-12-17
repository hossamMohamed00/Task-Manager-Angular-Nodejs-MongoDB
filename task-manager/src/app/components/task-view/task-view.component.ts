import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  /* constructor */
  constructor(private listService: ListService) {}

  /* Methods */
  ngOnInit(): void {}

  createNewList(title: string = 'Test Title 🤷‍♀️') {
    // Create the list
    this.listService.createList(title).subscribe((response) => {
      console.log(response);
    });
  }
}
