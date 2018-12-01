import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, Platform } from 'ionic-angular';

import { ConnectProvider } from '../../providers/connect/connect';

@Component({
  selector: 'page-guestfollowupadd',
  templateUrl: 'guestfollowupadd.html',
})
export class GuestfollowupaddPage {

  responseData: any;
  history: boolean = false;
  param = {
    "id": 0,
    "token":"",
    "tamu_id": "",
    "tanggal_follow_up": new Date().toISOString(),
    "note": "",
    "sales_organizational_id": 0
  };

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
  	public toastController: ToastController,
    public connect: ConnectProvider,
    public platform:Platform,
    public navParams: NavParams) {
    this.init()
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(){
    if(this.param.note != ''){
      const localdata = JSON.parse(localStorage.getItem('userData'));
      const tamuData = this.navParams.get('item');
      this.param.token = localdata.userData.token;
      this.param.sales_organizational_id = localdata.userData.sales_organizational_id;
      this.param.tamu_id = tamuData.id

      if(this.param.id != 0){
        this.connect.postData(this.param,'editFollowUp').then(data=>{
          this.responseData = data
          if(this.responseData.success){
            this.viewCtrl.dismiss(this.responseData.success);
          }else{
            this.presentToast('Mohon Coba Kembali')
          }
        },(err)=>{
          this.presentToast('Koneksi Bermasalah')
        })
      }else{
        this.connect.postData(this.param,'createFollowUp').then(data=>{
          this.responseData = data
          if(this.responseData.success){
            this.viewCtrl.dismiss(this.responseData.success);
          }else{
            this.presentToast('Mohon Coba Kembali')
          }
        },(err)=>{
          this.presentToast('Koneksi Bermasalah')
        })
      }
    }else{
      this.presentToast('Isi Note')
    }
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

  init(){
    const detail = this.navParams.get('detail')
    this.history = this.navParams.get('history')
    if(detail){
      this.param.id = detail.id
      this.param.note = detail.note
      this.param.tanggal_follow_up = detail.tanggal_follow_up
    }
  }

}
