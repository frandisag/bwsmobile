import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-datasalesclosed',
  templateUrl: 'datasalesclosed.html',
})
export class DatasalesclosedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatasalesclosedPage');
  }

}
