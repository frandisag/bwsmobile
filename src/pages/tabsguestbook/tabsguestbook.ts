import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, ViewController, Platform } from 'ionic-angular';

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

  public unregisterBackButtonAction: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public superTabsCtrl: SuperTabsController,
    public navParams: NavParams) {
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

  ionViewDidEnter() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  public initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
        this.customHandleBackButton();
    }, 10);
  }

  private customHandleBackButton(): void {
    this.viewCtrl.dismiss({},"",{
    	animate: true,
    	animation: 'ios-transition'
    });
  }

}
