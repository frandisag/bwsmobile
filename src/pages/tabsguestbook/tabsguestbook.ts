import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, ViewController, Navbar } from 'ionic-angular';

import { GuestbookaddPage } from '../guestbookadd/guestbookadd'
import { SetfilterPage } from '../setfilter/setfilter'

/**
 * Generated class for the TabsguestbookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabsguestbook',
  templateUrl: 'tabsguestbook.html',
})
export class TabsguestbookPage {

  @ViewChild(Navbar) navBar:Navbar;

  public unregisterBackButtonAction: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public platform:Platform,
    public navParams: NavParams) {
    this.init()
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent) => {
      this.viewCtrl.dismiss({},"",{
        animate: true,
        animation: 'ios-transition'
      });
    };
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

  filter(){
    let profileModal = this.modalCtrl.create(SetfilterPage);
    profileModal.onDidDismiss(data => {
      if (data) {
      	this.init();
      }
    });
    profileModal.present();
  }

  init(){
    console.log('init')
  }

  add(){
    let profileModal = this.modalCtrl.create(GuestbookaddPage);
    profileModal.onDidDismiss(data => {
      if (data) {
      	this.init();
      }
    });
    profileModal.present();
  }

}
