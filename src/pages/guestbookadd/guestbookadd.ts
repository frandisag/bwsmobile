import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
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
  slideThreeForm: FormGroup;

  submitAttempt: boolean = false;
  param = {
    "token":"",
    "page": 1
  };

  responseData: any

  listProvinsi = []
  listKabupaten = []
  listKecamatan = []
  listDesa = []
  listMotor = []
  listSource = []
  listBayar = ['Credit','Cash']

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

  slideChanged() {
    let currentIndex = this.signupSlider.getActiveIndex();
    if(currentIndex == 0){
      this.param.page = 1
    }
    if(currentIndex == 1){
      this.param.page = 2
      let loadingPopup = this.loadingCtrl.create({
        content: 'Loading data...'
      });
      loadingPopup.present();
      this.connect.getData(this.param.token,`getMotor`).then(data=>{
        this.responseData = data
        if(this.responseData){
          this.listMotor = this.responseData;
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
    if(currentIndex == 2){
      this.param.page = 3
      let loadingPopup = this.loadingCtrl.create({
        content: 'Loading data...'
      });
      loadingPopup.present();
      this.connect.getData(this.param.token,`getSource`).then(data=>{
        this.responseData = data
        if(this.responseData){
          this.listSource = this.responseData;
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
      tanggal_datang: new Date().toISOString(),
      nama_konsumen: ['',Validators.required],
      nama_jalan: ['',Validators.required],
      nama_provinsi: ['',Validators.required],
      nama_kabupaten: ['',Validators.required],
      nama_kecamatan: ['',Validators.required],
      nama_desa: ['',Validators.required]
    });
    this.slideTwoForm = this.formBuilder.group({
      email_konsumen: ['',Validators.required],
      tempat_lahir: ['',Validators.required],
      tanggal_lahir: new Date().toISOString(),
      noHp1: ['',Validators.required],
      noHp2: '',
      nama_motor: ['',Validators.required],
      cara_bayar: ['',Validators.required]
    });
    this.slideThreeForm = this.formBuilder.group({
      source_order: ['',Validators.required]
    });
  }

  save(){
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
      this.param.page = 1
      this.signupSlider.slideTo(0);
    }
    else if(!this.slideTwoForm.valid){
      this.param.page = 2
      this.signupSlider.slideTo(1);
    }
    else if(!this.slideThreeForm.valid){
      this.param.page = 2
      this.signupSlider.slideTo(1);
    }
    else {
      const sendData = {
        'tanggal_datang': this.slideOneForm.value.tanggal_datang,
        'nama_desa': this.slideOneForm.value.nama_desa,
        'nama_jalan': this.slideOneForm.value.nama_jalan,
        'nama_kabupaten': this.slideOneForm.value.nama_kabupaten,
        'nama_kecamatan': this.slideOneForm.value.nama_kecamatan,
        'nama_konsumen': this.slideOneForm.value.nama_konsumen,
        'nama_provinsi': this.slideOneForm.value.nama_provinsi,
        'email_konsumen': this.slideTwoForm.value.email_konsumen,
        'nama_motor': this.slideTwoForm.value.nama_motor,
        'noHp1': this.slideTwoForm.value.noHp1,
        'noHp2': this.slideTwoForm.value.noHp2,
        'tanggal_lahir': this.slideTwoForm.value.tanggal_lahir,
        'tempat_lahir': this.slideTwoForm.value.tempat_lahir,
        'cara_bayar': this.slideTwoForm.value.cara_bayar,
        'source_order': this.slideThreeForm.value.source_order,
        'token': this.param.token
      }
      this.connect.postData(sendData,'createGuest').then(data=>{
        this.responseData = data
        if(this.responseData.success){
          this.viewCtrl.dismiss(this.responseData.success);
        }else{
          this.presentToast('Mohon Coba Kembali')
        }
      },(err)=>{
        this.presentToast('Koneksi Bermasalah')
      })
    }
  }

  kecamatanChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    this.connect.getData(this.param.token,`getDesa?district_id=${this.slideOneForm.value.nama_kecamatan.id}`).then(data=>{
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
    this.connect.getData(this.param.token,`getKecamatan?regency_id=${this.slideOneForm.value.nama_kabupaten.id}`).then(data=>{
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
    this.connect.getData(this.param.token,`getKabupaten?province_id=${this.slideOneForm.value.nama_provinsi.id}`).then(data=>{
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
    this.param.page = this.param.page + 1
    this.signupSlider.slideNext();
  }

  prev(){
    this.param.page = this.param.page - 1
    this.signupSlider.slidePrev();
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
