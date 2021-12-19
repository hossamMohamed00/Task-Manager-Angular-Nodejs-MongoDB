import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ListService } from '../../services/list.service'
import { List } from '../../models/list.model'
@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.scss']
})
export class AddNewListComponent implements OnInit {
  constructor(private listService: ListService, private router: Router) {}

  // A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {}

  createNewList(title: string = 'Title 🤷‍♀️'): void {
    // Create the list
    this.listService.createList(title).subscribe((list: List) => {
      const uri = `/lists/${list._id}`

      // Redirect the user with the new list id
      this.router.navigateByUrl(uri)
    })
  }
}
