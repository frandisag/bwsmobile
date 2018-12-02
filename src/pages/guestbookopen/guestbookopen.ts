import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Navbar, LoadingController, ToastController, App, Events, AlertController } from 'ionic-angular';

import { GuestbookaddPage } from '../guestbookadd/guestbookadd'
import { GuestbookeditPage } from '../guestbookedit/guestbookedit'
import { GuestfollowupPage } from '../guestfollowup/guestfollowup'
import { SetfilterPage } from '../setfilter/setfilter'

import { ConnectProvider } from '../../providers/connect/connect';

@Component({
  selector: 'page-guestbookopen',
  templateUrl: 'guestbookopen.html',
})
export class GuestbookopenPage {

  @ViewChild(Navbar) navBar:Navbar;

  param = {
    "nama_konsumen": "",
    "startdate": "",
    "enddate": "",
    "token":"",
    "page": 1,
    "last_page": 0,
    "hasil": "OPEN"
  };

  color;
  responseData: any;
  listGuest = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public connect: ConnectProvider,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public events: Events,
    public app: App,
    public navParams: NavParams) {
    this.init()
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'middle',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  opendetail(item){
    let profileModal = this.modalCtrl.create(GuestbookeditPage,{
      item: item,
      history: false
    });
    profileModal.onDidDismiss(data => {
      if (data) {
      	this.init();
      }
    });
    profileModal.present();
  }

  openproses(item){
    this.app.getRootNav().push(GuestfollowupPage,{
      item: item
    },{
      animate: true,
      animation: 'ios-transition'
    });
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
        this.connect.getData(this.param.token,
            `getListGuest?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
          .then((data) => {
          this.responseData = data;
          if (this.responseData) {
            for (let i = 0; i < this.responseData.data.length; i++) {
							const guest = this.responseData.data[i];
							this.listGuest.push(guest);
            }
          }else{
            this.presentToast(this.responseData.error.text);
          }
        },(err)=>{
          this.presentToast("Connection Problem");
        })
        resolve();
      }, 500);
    })
  }

  deal(item){
    const update = {
      'id': item.id,
      'hasil': 'DEAL',
      'token': this.param.token,
      'reason_no_deal': ''
    }
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();
    this.connect.postData(update,'changeHasil').then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.connect.getData(this.param.token,
          `getListGuest?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
        .then(data=>{
          this.responseData = data;
          if(this.responseData){
            this.listGuest = this.responseData.data;
            this.param.last_page = this.responseData.last_page;
            this.events.publish('refreshInit', 1);
            this.events.publish('removeGuestOpen', 1);
            loadingPopup.dismiss();
          }else{
            loadingPopup.dismiss();
            this.presentToast('Data Tidak Ditemukan')
          }
        },(err)=>{
          loadingPopup.dismiss();
          this.presentToast("Koneksi Bermasalah");
        })
      }else{
        loadingPopup.dismiss();
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      loadingPopup.dismiss();
      this.presentToast("Koneksi Bermasalah");
    })
  }

  setReason(item){
    let alert = this.alertCtrl.create({
      title: 'Note',
      inputs: [{ name: 'reason_no_deal', placeholder: 'Note' }],
      buttons: [
        { text: 'Cancel', role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if(data.reason_no_deal != ''){
              this.nodeal(item, data.reason_no_deal);
            }else{
              this.presentToast('Please Fill No Deal Note');
            }
          }
        }
      ]
    });
    alert.present();
  }

  nodeal(item,reason_no_deal){
    const update = {
      'id': item.id,
      'hasil': 'NO DEAL',
      'token': this.param.token,
      'reason_no_deal': reason_no_deal
    }
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();
    this.connect.postData(update,'changeHasil').then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.connect.getData(this.param.token,
          `getListGuest?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
        .then(data=>{
          this.responseData = data;
          if(this.responseData){
            this.listGuest = this.responseData.data;
            this.param.last_page = this.responseData.last_page;
            this.events.publish('refreshInit', 1);
            this.events.publish('removeGuestOpen', 1);
            loadingPopup.dismiss();
          }else{
            loadingPopup.dismiss();
            this.presentToast('Data Tidak Ditemukan')
          }
        },(err)=>{
          loadingPopup.dismiss();
          this.presentToast("Koneksi Bermasalah");
        })
      }else{
        loadingPopup.dismiss();
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      loadingPopup.dismiss();
      this.presentToast("Koneksi Bermasalah");
    })
  }

  filter(){
    let profileModal = this.modalCtrl.create(SetfilterPage,{
      nama_konsumen: this.param.nama_konsumen,
      startdate: this.param.startdate,
      enddate: this.param.enddate
    });
    profileModal.onDidDismiss(data => {
      if (data) {
        let loadingPopup = this.loadingCtrl.create({
          content: 'Loading data...'
        });
        if (data.startdate != "" || data.enddate != "" || data.nama_konsumen != ""){
          this.color="primary";
        }else{
          this.color="light";
        }
        this.param.startdate = data.startdate
        this.param.enddate = data.enddate
        this.param.nama_konsumen = data.nama_konsumen
        loadingPopup.present();
        this.connect.getData(this.param.token,
          `getListGuest?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
        .then(data=>{
          this.responseData = data;
          if(this.responseData){
            this.listGuest = this.responseData.data;
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
    });
    profileModal.present();
  }

  init(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    const localdata = JSON.parse(localStorage.getItem('userData'));

    this.param.token = localdata.userData.token;
    this.param.startdate = "";
    this.param.enddate = "";
    this.param.nama_konsumen = ""

    this.connect.getData(this.param.token,
      `getListGuest?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
      .then(data=>{
      this.responseData = data;
      this.color="light";
      if(this.responseData){
        this.listGuest = this.responseData.data;
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

  add(){
    let profileModal = this.modalCtrl.create(GuestbookaddPage);
    profileModal.onDidDismiss(data => {
      if (data) {
        this.events.publish('addGuestOpen', 1);
      	this.init();
      }
    });
    profileModal.present();
  }

}
