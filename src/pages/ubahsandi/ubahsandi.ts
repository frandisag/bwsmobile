import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';

import { ConnectProvider } from '../../providers/connect/connect';

/**
 * Generated class for the UbahsandiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ubahsandi',
  templateUrl: 'ubahsandi.html',
})
export class UbahsandiPage {

	param = {
		"sandilama":"",
		"sandibaru1":"",
		"sandibaru2":"",
		"token":"",
		"id":""

	}

	responseData: any;
	userDetails:any;

  constructor(
  	public navCtrl: NavController,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
  	public connect: ConnectProvider,
  	public navParams: NavParams) {
  }

  simpan(){
  	if (this.param.sandilama != "" && this.param.sandibaru1 != "" && this.param.sandibaru2 != "") {
  		if (this.param.sandibaru1 == this.param.sandibaru2) {
  			const data =  JSON.parse(localStorage.getItem('userData'));
      	this.userDetails = data.userData;

      	this.param.id = this.userDetails.id;
      	this.param.token = this.userDetails.token;
        let loadingPopup = this.loadingCtrl.create({
          content: 'Loading data...'
        });
        loadingPopup.present();
	  		this.connect.postData(this.param, "changePassword").then((result) =>{
	        this.responseData = result;
	        if(!this.responseData.success){
            loadingPopup.dismiss();
	          this.presentToast("Kata Sandi Lama Salah");
	        }else{
            loadingPopup.dismiss();
	        	this.presentToast("Sukses Update");
	        }
	      }, (err) => {
          loadingPopup.dismiss();
	        this.presentToast("Koneksi Bermasalah");
	      });
	  	}else{
	  		this.presentToast("Kata Sandi Baru Tidak Sama !");
	  	}
  	}else{
  		this.presentToast("Isi data yang kosong...");
  	}
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
