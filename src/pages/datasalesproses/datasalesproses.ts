import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Navbar, LoadingController, ToastController, App, Events } from 'ionic-angular';

import { DatasaleseditPage } from '../datasalesedit/datasalesedit'
import { GuestfollowupPage } from '../guestfollowup/guestfollowup'
import { SetfilterPage } from '../setfilter/setfilter'

import { ConnectProvider } from '../../providers/connect/connect';

@Component({
  selector: 'page-datasalesproses',
  templateUrl: 'datasalesproses.html',
})
export class DatasalesprosesPage {

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
  listDataSales = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public connect: ConnectProvider,
    public toastController: ToastController,
    public events: Events,
    public app: App,
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

  opendetail(item){
    let profileModal = this.modalCtrl.create(DatasaleseditPage,{
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
            `getListProsesDataSales?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
          .then((data) => {
          this.responseData = data;
          if (this.responseData) {
            for (let i = 0; i < this.responseData.data.length; i++) {
							const dataSales = this.responseData.data[i];
							this.listDataSales.push(dataSales);
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
      'token': this.param.token
    }
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();
    this.connect.postData(update,'changeHasil').then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.connect.getData(this.param.token,
          `getListProsesDataSales?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
        .then(data=>{
          this.responseData = data;
          if(this.responseData){
            this.listDataSales = this.responseData.data;
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
      }else{
        loadingPopup.dismiss();
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      loadingPopup.dismiss();
      this.presentToast("Koneksi Bermasalah");
    })
  }

  nodeal(item){
    const update = {
      'id': item.id,
      'hasil': 'NO DEAL',
      'token': this.param.token
    }
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();
    this.connect.postData(update,'changeHasil').then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.connect.getData(this.param.token,
          `getListProsesDataSales?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
        .then(data=>{
          this.responseData = data;
          if(this.responseData){
            this.listDataSales = this.responseData.data;
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
          `getListProsesDataSales?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
        .then(data=>{
          this.responseData = data;
          if(this.responseData){
            this.listDataSales = this.responseData.data;
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
    const localdata = JSON.parse(localStorage.getItem('userData'));

    this.param.token = localdata.userData.token;
    this.param.startdate = "";
    this.param.enddate = "";
    this.param.nama_konsumen = ""

    this.connect.getData(this.param.token,
      `getListProsesDataSales?page=${this.param.page}&startdate=${this.param.startdate}&enddate=${this.param.enddate}&nama_konsumen=${this.param.nama_konsumen}&hasil=${this.param.hasil}`)
      .then(data=>{
      this.responseData = data;
      this.color="light";
      if(this.responseData){
        this.listDataSales = this.responseData.data;
        this.param.last_page = this.responseData.last_page;
      }else{
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      this.presentToast("Koneksi Bermasalah");
    })
  }

}
