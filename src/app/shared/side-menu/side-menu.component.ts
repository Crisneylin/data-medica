import { Component, OnInit } from '@angular/core';
import { MenuTabs } from 'src/app/models/menu-tabs';
import * as util from 'src/app/components/util';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  year: number;
  sideMenu: MenuTabs[] = util.sideMenu;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
  }

  toggleSideMenu(){}

}
