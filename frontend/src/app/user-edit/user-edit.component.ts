import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  user:User = {id:1, name:"John", permissions:"admin"};

  ngOnInit(): void {
  }



}

class User {
  id: number | undefined;
  name: string | undefined;
  permissions: string | undefined;
}
