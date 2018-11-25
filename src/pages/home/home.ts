import { Component } from '@angular/core';
import { NavController, ToastController, Events, LoadingController} from 'ionic-angular';

import { TabsdatacustomerPage } from '../tabsdatacustomer/tabsdatacustomer'
import { TabsguestbookPage } from '../tabsguestbook/tabsguestbook'
import { TabspricelistPage } from '../tabspricelist/tabspricelist'
import { TabsprofilePage } from '../tabsprofile/tabsprofile'

import { ConnectProvider } from '../../providers/connect/connect';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = {
    "foto_profile" : ""
  }
  responseData;
  param = {
    "token":""
  }

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public events: Events,
    public loadingCtrl: LoadingController,
    public connect: ConnectProvider) {
  	this.inIt();
  }

  doRefresh(refresher){
    this.inIt();
    refresher.complete();
  }

  inIt(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();

    const localdata = JSON.parse(localStorage.getItem('userData'));
    this.param.token = localdata.userData.token;

    this.connect.postData(this.param, "getDetailsHome").then((result) =>{
      this.responseData = result;

      if(this.responseData.userData){
        this.userData = this.responseData.userData
        if(this.userData.foto_profile != ''){
          this.userData.foto_profile = `http://bws.com/storage/${this.userData.foto_profile}`
        }
      }
      loadingPopup.dismiss();
    }, (err) => {
      loadingPopup.dismiss();
      this.presentToast("Koneksi Bermasalah");
    });
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

  openDataCustomer(){
    this.navCtrl.push(TabsdatacustomerPage,{},{
      animate: true,
      animation: 'ios-transition'
    });
  }

  openPriceList(){
    this.navCtrl.push(TabspricelistPage,{},{
      animate: true,
      animation: 'ios-transition'
    });
  }

  openGuestBook(){
    this.navCtrl.push(TabsguestbookPage,{},{
      animate: true,
      animation: 'ios-transition'
    });
  }

  openProfile(){
    this.navCtrl.push(TabsprofilePage,{},{
      animate: true,
      animation: 'ios-transition'
    });
  }

}
