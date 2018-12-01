import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, ViewController } from 'ionic-angular';

import { GuestbookopenPage } from '../../pages/guestbookopen/guestbookopen'
import { GuestbookclosedPage } from '../../pages/guestbookclosed/guestbookclosed'
import { SuperTabsController } from 'ionic2-super-tabs'

@Component({
  selector: 'page-tabsguestbook',
  templateUrl: 'tabsguestbook.html',
})
export class TabsguestbookPage {

  @ViewChild(Navbar) navBar:Navbar;

  page1: any = GuestbookopenPage;
  page2: any = GuestbookclosedPage;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public superTabsCtrl: SuperTabsController,
    public navParams: NavParams) {
    this.init()
  }

  ionViewDidLoad() {
    this.superTabsCtrl.enableTabsSwipe(false,'Guest');
    this.navBar.backButtonClick = (e:UIEvent) => {
      this.viewCtrl.dismiss({},"",{
        animate: true,
        animation: 'ios-transition'
      });
    };
  }

  init(){
    console.log('tabs guest book')
  }

}
