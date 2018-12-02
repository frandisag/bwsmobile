import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController, App} from 'ionic-angular';

import { ConnectProvider } from '../../providers/connect/connect';
import { MenusPage } from '../menus/menus';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  param = {
    "email":"",
    "password":"",
    "device_token":""
  }
  responseData;
  log : boolean = false;

  constructor(
  	public navCtrl: NavController,
  	public menu: MenuController,
    public app: App,
    public toastController: ToastController,
    public connect: ConnectProvider,
  	public navParams: NavParams) {

  	if (!localStorage.getItem('uid')) {
  	  this.menu.enable(false);
  	}
  }

  login(){
    if (this.param.email != '' && this.param.password != '') {
      this.param.device_token = localStorage.getItem('device_token');
      this.log = true;
      this.connect.postData(this.param, "login").then((result) =>{
        this.responseData = result;

        if(this.responseData.userData){
          localStorage.setItem('userData', JSON.stringify(this.responseData))
          this.app.getActiveNav().setRoot(MenusPage);
          this.log = false;
        }else{
          this.presentToast("Salah Email atau Password");
          this.log = false;
        }
      }, (err) => {
        this.presentToast("Salah Email atau Password");
        this.log = false;
      });
    }else{
      this.presentToast("Isi data yang kosong...");
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

}
