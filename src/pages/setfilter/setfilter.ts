import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-setfilter',
  templateUrl: 'setfilter.html',
})
export class SetfilterPage {

  public unregisterBackButtonAction: any;

  param = {
    "nama_konsumen": this.navParams.get('nama_konsumen'),
    "startdate": this.navParams.get('startdate'),
    "enddate": this.navParams.get('enddate')
  }

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public toastController: ToastController,
    public navParams: NavParams) {

  }

  filter(){
    if (this.param.startdate > this.param.enddate) {
      this.presentToast("Tanggal awal melebihi tanggal akhir");
    }else{
      this.viewCtrl.dismiss(this.param);
    }
  }

  clearstart() {
    this.param.startdate = null;
  }

  clearend() {
    this.param.enddate = null;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      dismissOnPageChange: true
    });
    toast.present();
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
    this.viewCtrl.dismiss();
  }

}
