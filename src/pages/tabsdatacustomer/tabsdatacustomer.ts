import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-tabsdatacustomer',
  templateUrl: 'tabsdatacustomer.html',
})
export class TabsdatacustomerPage {

  @ViewChild(Navbar) navBar:Navbar;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
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

  init(){
    console.log('tab data customer')
  }

}
