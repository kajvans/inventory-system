import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor() { }

  users:User[] = [
    {id:1, name:"John", permissions:"admin"},
    {id:2, name:"Jane", permissions:"view"},
    {id:3, name:"Bob", permissions:"view"},
    {id:4, name:"Alice", permissions:"edit"},
    {id:5, name:"Tom", permissions:"view"},
  ]

  ngOnInit(): void {
  }

}

class User {
  id: number | undefined;
  name: string | undefined;
  permissions: string | undefined;
}
