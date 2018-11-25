import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, ViewController, Navbar, LoadingController, ToastController } from 'ionic-angular';

import { GuestbookaddPage } from '../guestbookadd/guestbookadd'
import { GuestbookeditPage } from '../guestbookedit/guestbookedit'
import { GuestfollowupPage } from '../guestfollowup/guestfollowup'
import { SetfilterPage } from '../setfilter/setfilter'

import { ConnectProvider } from '../../providers/connect/connect';

@Component({
  selector: 'page-tabsguestbook',
  templateUrl: 'tabsguestbook.html',
})
export class TabsguestbookPage {

  @ViewChild(Navbar) navBar:Navbar;

  public unregisterBackButtonAction: any;

  param = {
    "startdate": "",
    "enddate": "",
    "token":"",
    "page": 1,
    "last_page": 0
  };

  color;
  responseData: any;
  listGuest = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public platform:Platform,
    public loadingCtrl: LoadingController,
    public connect: ConnectProvider,
    public toastController: ToastController,
    public navParams: NavParams) {
    this.init()
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
    // Unregister the custom back button action for this page
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

  opendetail(item){
    let profileModal = this.modalCtrl.create(GuestbookeditPage,{
      item: item
    });
    profileModal.onDidDismiss(data => {
      if (data) {
      	this.init();
      }
    });
    profileModal.present();
  }

  openproses(item){
    this.navCtrl.push(GuestfollowupPage,{
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
        this.connect.getData(this.param.token,`getListGuest?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}`).then((data) => {
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

  filter(){
    let profileModal = this.modalCtrl.create(SetfilterPage,{
      startdate: this.param.startdate,
      enddate: this.param.enddate
    });
    profileModal.onDidDismiss(data => {
      if (data) {
        let loadingPopup = this.loadingCtrl.create({
          content: 'Loading data...'
        });
        if (data.startdate != "" && data.enddate != ""){
          this.color="primary";
        }else{
          this.color="light";
        }
        this.param.startdate = data.startdate
        this.param.enddate = data.enddate
        loadingPopup.present();
      	this.connect.getData(this.param.token,`getListGuest?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}`).then(data=>{
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

    this.connect.getData(this.param.token,`getListGuest?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}`).then(data=>{
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
      	this.init();
      }
    });
    profileModal.present();
  }

}
