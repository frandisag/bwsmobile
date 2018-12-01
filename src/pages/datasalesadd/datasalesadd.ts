import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-datasalesadd',
  templateUrl: 'datasalesadd.html',
})
export class DatasalesaddPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatasalesaddPage');
  }

}
