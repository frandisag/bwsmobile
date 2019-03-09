import { Component, ViewChild } from '@angular/core';
import {
  NavController,
  NavParams,
  Navbar,
  ViewController,
  LoadingController,
  ToastController,
  Platform,
} from 'ionic-angular';

import { ConnectProvider } from '../../providers/connect/connect';
import { MotordetailPage } from '../motordetail/motordetail';

@Component({
  selector: 'page-listmotor',
  templateUrl: 'listmotor.html',
})
export class ListmotorPage {

  @ViewChild(Navbar) navBar:Navbar;

  public unregisterBackButtonAction: any;
  isSearchBarOpened = false;
  leasing = {
    leasing_name: "",
    id: 0
  };

  param = {
    "token":"",
    "id": 0,
    "sales_organizational_id": 0
  };
  responseData: any;
  listDataMotorCabang: any[];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public connect: ConnectProvider,
    public platform: Platform,
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
      position: 'bottom',
      dismissOnPageChange: true
    });
    toast.present();
  }

  doRefresh(refresher){
    this.init();
    refresher.complete();
  }

  init(){
    this.leasing = this.navParams.get('item')

    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    const localdata = JSON.parse(localStorage.getItem('userData'));

    this.param.token = localdata.userData.token;
    this.param.id = localdata.userData.id;
    this.param.sales_organizational_id = localdata.userData.sales_organizational_id

    this.connect.getData(this.param.token, `getMotorPriceList?leasing_id=${this.leasing.id}`)
      .then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.listDataMotorCabang = this.responseData;
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

  onSearch(event) {
    const arrSearch = this.responseData;
    if (event.value !== "") {
      this.listDataMotorCabang = arrSearch.filter((item) => {
        return item.motor_name.toLowerCase().indexOf(event.value.toLowerCase()) > -1;
      });
    } else {
      this.listDataMotorCabang = arrSearch;
    }
  }

  onCancel() {
    this.isSearchBarOpened=false;
    this.listDataMotorCabang = this.responseData;
  }

  opendetail(item) {
    this.isSearchBarOpened=false;
    this.listDataMotorCabang = this.responseData;
    this.navCtrl.push(MotordetailPage,{ item: item },{
      animate: true,
      animation: 'ios-transition'
    });
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
