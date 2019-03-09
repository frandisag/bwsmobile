import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, ViewController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-motordetail',
  templateUrl: 'motordetail.html',
})
export class MotordetailPage {

  @ViewChild(Navbar) navBar:Navbar;

  public unregisterBackButtonAction: any;
  motor = {
    motor_name: "",
    id: 0
  };

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public navParams: NavParams) {
    this.init();
  }

  ionViewDidLoad() {
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

  init(){
    this.motor = this.navParams.get('item')
  }

}
