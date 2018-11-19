import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { IonicSelectableComponent } from 'ionic-selectable';

import { ConnectProvider } from '../../providers/connect/connect';

class NamaProvinsi {
  public id: number;
  public nama: string;
}

@Component({
  selector: 'page-guestbookadd',
  templateUrl: 'guestbookadd.html',
})
export class GuestbookaddPage {

  namaProvinsi: NamaProvinsi;

  public unregisterBackButtonAction: any;
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;
  param = {
    "token":""
  };

  responseData: any

  listProvinsi = []
  listKabupaten = []
  listKecamatan = []
  listDesa = []

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public formBuilder: FormBuilder,
    public connect: ConnectProvider,
    public loadingCtrl: LoadingController,
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

  init(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    const localdata = JSON.parse(localStorage.getItem('userData'));
    this.param.token = localdata.userData.token;

    this.connect.getData(this.param.token,'getPropinsi').then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.listProvinsi = this.responseData;
        loadingPopup.dismiss();
      }else{
        loadingPopup.dismiss();
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      loadingPopup.dismiss();
      this.presentToast("Koneksi Bermasalah");
    })

    this.slideOneForm = this.formBuilder.group({
      listProvinsi: new FormControl(this.listProvinsi),
      listKabupaten: new FormControl(this.listKabupaten),
      listKecamatan: new FormControl(this.listKecamatan),
      listDesa: new FormControl(this.listDesa),
      Date: new Date().toISOString(),
      namaKonsumen: '',
      namaJalan: '',
      namaProvinsi: '',
      namaKabupaten: '',
      namaKecamatan: '',
      namaDesa: ''
    });
    this.slideTwoForm = this.formBuilder.group({
      username: [''],
      privacy: [''],
      bio: ['']
    });
  }

  kecamatanChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    this.connect.getData(this.param.token,`getDesa?district_id=${this.slideOneForm.value.namaKecamatan.id}`).then(data=>{
      this.responseData = data
      if(this.responseData){
        this.listDesa = this.responseData;
        loadingPopup.dismiss();
      }else{
        loadingPopup.dismiss();
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      loadingPopup.dismiss();
      this.presentToast('Koneksi Bermasalah')
    })
  }

  kabupatenChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    this.connect.getData(this.param.token,`getKecamatan?regency_id=${this.slideOneForm.value.namaKabupaten.id}`).then(data=>{
      this.responseData = data
      if(this.responseData){
        this.listKecamatan = this.responseData;
        loadingPopup.dismiss();
      }else{
        loadingPopup.dismiss();
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      loadingPopup.dismiss();
      this.presentToast('Koneksi Bermasalah')
    })
  }

  provinsiChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    this.connect.getData(this.param.token,`getKabupaten?province_id=${this.slideOneForm.value.namaProvinsi.id}`).then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.listKabupaten = this.responseData;
        loadingPopup.dismiss();
      }else{
        loadingPopup.dismiss();
        this.presentToast('Data Tidak Ditemukan')
      }
    },(err)=>{
      loadingPopup.dismiss();
      this.presentToast('Koneksi Bermasalah')
    })
  }

  next(){
    this.signupSlider.slideNext();
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
    this.viewCtrl.dismiss();
  }

}
