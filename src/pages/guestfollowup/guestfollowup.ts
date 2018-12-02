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
    tanggal_data: '',
    noHp1: '',
    nama_sales: '',
    nama_cabang: '',
    motor_name: ''
  }

  param = {
    "token":"",
    "page": 1,
    "last_page": 0,
    "tamu_id": 0
  };
  phoneNumber = '';
  whatsApp = '';
  public unregisterBackButtonAction: any;
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

  sendwhatsapp(){
    const phoneNumber = this.cust.noHp1.replace(/ /g, '');
    alert(phoneNumber.replace(/_/g, ''));
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

  call(){
  	if (this.phoneNumber != "") {
  		setTimeout(() => {
	      window.open(`tel:${this.phoneNumber}`, '_system');
	    },100);
  	}
  }

  init(){
    this.cust = this.navParams.get('item')
    this.history = this.navParams.get('history')

    const sliceNumber = this.cust.noHp1.replace(/ /g, '');
    this.phoneNumber = sliceNumber.replace(/_/g, '')
    const localPhone = this.phoneNumber.substr(0, 0) + '+62' + this.phoneNumber.substr(0 + 1);
    const pesan = `Hallo Bapak/Ibu ${this.cust.nama_konsumen}, Saya ${this.cust.nama_sales} dari Bintang Motor ${this.cust.nama_cabang} ada yang bisa saya bantu untuk proses pembelian Motor ${this.cust.motor_name} ?`;

    this.whatsApp = `https://api.whatsapp.com/send?phone=${localPhone}&text=${pesan}`;
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

}
