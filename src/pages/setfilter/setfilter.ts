import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ToastController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';

class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'page-setfilter',
  templateUrl: 'setfilter.html',
})
export class SetfilterPage {

  ports: Port[];
  port: Port;

  public unregisterBackButtonAction: any;

  namaProvinsi = []

  listProvinsi = [
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur'
  ]

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public toastController: ToastController,
    public navParams: NavParams) {
      this.ports = [
        { id: 1, name: 'Tokai' },
        { id: 2, name: 'Vladivostok' },
        { id: 3, name: 'Navlakhi' }
      ];
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
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
