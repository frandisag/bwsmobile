import { Component, ViewChild } from '@angular/core';
import {
  NavController,
  NavParams,
  Navbar,
  ViewController,
  Platform,
  LoadingController,
  ToastController
} from 'ionic-angular';

import { ConnectProvider } from '../../providers/connect/connect';

@Component({
  selector: 'page-motordetail',
  templateUrl: 'motordetail.html',
})
export class MotordetailPage {

  @ViewChild(Navbar) navBar:Navbar;

  public unregisterBackButtonAction: any;
  motor = {
    motor_name: "",
    cabang_id: 0,
    price: 0,
    id: 0,
    motor_id: 0,
  };
  param = {
    "token":"",
    "id": 0,
    "sales_organizational_id": 0
  };
  responseData: any;
  listPictures: any[];
  url = '';
  startDownload = false;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public connect: ConnectProvider,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
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
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    const localdata = JSON.parse(localStorage.getItem('userData'));

    this.param.token = localdata.userData.token;
    this.param.id = localdata.userData.id;
    this.param.sales_organizational_id = localdata.userData.sales_organizational_id

    this.connect.getData(this.param.token, `getMotorDetail?motor_id=${this.motor.motor_id}&cabang_id=${this.motor.cabang_id}`)
      .then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.listPictures = this.responseData.listPictures;
        this.url = `http://sales.bintangmotor.com/storage/${this.responseData.brosur}`;
        loadingPopup.dismiss();
      }else{
        loadingPopup.dismiss();
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      loadingPopup.dismiss();
      this.presentToast("Koneksi Bermasalah");
    })
  }

  downloadbrosur() {
    window.open(this.url, '_system');
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      dismissOnPageChange: true
    });
    toast.present();
  }

}
