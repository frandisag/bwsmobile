import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
    this.init()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsguestbookPage');
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
