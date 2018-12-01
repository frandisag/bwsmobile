import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, ViewController, ModalController, Platform, LoadingController, ToastController } from 'ionic-angular';

import { GuestfollowupaddPage } from '../guestfollowupadd/guestfollowupadd'

import { ConnectProvider } from '../../providers/connect/connect';


@Component({
  selector: 'page-guestfollowup',
  templateUrl: 'guestfollowup.html',
})
export class GuestfollowupPage {

  @ViewChild(Navbar) navBar:Navbar;

  cust = {
    id: '',
    email_konsumen: '',
    nama_konsumen: '',
    tanggal_data: ''
  }

  param = {
    "token":"",
    "page": 1,
    "last_page": 0,
    "tamu_id": 0
  };

  history: boolean = false;
  responseData: any;
  listFollowUp = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public platform:Platform,
    public loadingCtrl: LoadingController,
    public connect: ConnectProvider,
    public toastController: ToastController,
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

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      dismissOnPageChange: true
    });
    toast.present();
  }

  openfollowup(){
    let profileModal = this.modalCtrl.create(GuestfollowupaddPage,{item: this.cust});
    profileModal.onDidDismiss(data => {
      if (data) {
      	this.init();
      }
    });
    profileModal.present();
  }

  opendetail(item){
    let profileModal = this.modalCtrl.create(GuestfollowupaddPage,{
      item: this.cust,
      detail: item,
      history: this.navParams.get('history')}
    );
    profileModal.onDidDismiss(data => {
      if (data) {
      	this.init();
      }
    });
    profileModal.present();
  }

  init(){
    this.cust = this.navParams.get('item')
    this.history = this.navParams.get('history')
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    const localdata = JSON.parse(localStorage.getItem('userData'));
    this.param.token = localdata.userData.token;

    this.connect.getData(this.param.token,`getListFollowUp?tamu_id=${this.cust.id}&page=${this.param.page}`).then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.listFollowUp = this.responseData.data;
        this.param.last_page = this.responseData.last_page;
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

  doRefresh(refresher){
    this.param.page = 1;
    this.init();
    refresher.complete();
  }

  doInfinite(): Promise<any> {
    this.param.page = this.param.page + 1 ;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connect.getData(this.param.token,`getListFollowUp?tamu_id=${this.cust.id}&page=${this.param.page}`).then((data) => {
          this.responseData = data;
          if (this.responseData) {
            for (let i = 0; i < this.responseData.data.length; i++) {
							const guest = this.responseData.data[i];
							this.listFollowUp.push(guest);
            }
          }else{
            this.presentToast('Data Tidak Ditemukan');
          }
        },(err)=>{
          this.presentToast("Connection Problem");
        })
        resolve();
      }, 500);
    })
  }

}
