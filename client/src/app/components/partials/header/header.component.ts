import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  cartQuantity = 0;
  user!: any;
  username = 'shehan'
  constructor() {

  }

  ngOnInit(): void {
    //
    console.log('Header OnInit')
  }


  logout() {
    //
    console.log('logout clicked')
  }

  get isAuth() {
    return true
  }
}
