import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, ViewController, Platform } from 'ionic-angular';

import { DatasalesopenPage } from '../../pages/datasalesopen/datasalesopen';
import { DatasalesprosesPage } from '../../pages/datasalesproses/datasalesproses';
import { DatasalesclosedPage } from '../../pages/datasalesclosed/datasalesclosed';

import { SuperTabsController } from 'ionic2-super-tabs'

@Component({
  selector: 'page-tabsdatacustomer',
  templateUrl: 'tabsdatacustomer.html',
})
export class TabsdatacustomerPage {

  @ViewChild(Navbar) navBar:Navbar;

  index = this.navParams.get('index') ? this.navParams.get('index') : 0;
  page1: any = DatasalesopenPage;
  page2: any = DatasalesprosesPage;
  page3: any = DatasalesclosedPage;

  public unregisterBackButtonAction: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public superTabsCtrl: SuperTabsController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.superTabsCtrl.enableTabsSwipe(false,'DataSales');
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
