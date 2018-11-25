import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, ViewController, ToastController, LoadingController } from 'ionic-angular';

import { ConnectProvider } from '../../providers/connect/connect';

@Component({
  selector: 'page-tabsprofile',
  templateUrl: 'tabsprofile.html',
})
export class TabsprofilePage {

  @ViewChild(Navbar) navBar:Navbar;

  param = {
    "token":"",
    "id": 0
  }

  responseData: any;
  userProfile = {
    'email':'',
    'nama_sales':'',
    'no_telepon':'',
    'foto_profile': ''
  };

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public connect: ConnectProvider,
    public loadingCtrl: LoadingController,
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
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();
  	const localdata = JSON.parse(localStorage.getItem('userData'));

    this.param.token = localdata.userData.token;
    this.param.id = localdata.userData.id;
    this.connect.getData(this.param.token, `getProfile?sales_id=${this.param.id}`).then((result) =>{
      this.responseData = result;

      if(this.responseData.userData){
        this.userProfile = this.responseData.userData
        if(this.userProfile.foto_profile != ''){
          this.userProfile.foto_profile = `http://bws.com/storage/${this.userProfile.foto_profile}`
        }
      }
      loadingPopup.dismiss();
    }, (err) => {
      loadingPopup.dismiss();
      this.presentToast("Koneksi Bermasalah");
    });
  }

  editimage(){
    console.log('change image')
  }

  save(){
    console.log('save')
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
