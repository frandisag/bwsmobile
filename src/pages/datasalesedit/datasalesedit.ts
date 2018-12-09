import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IonicSelectableComponent } from 'ionic-selectable';
import { ConnectProvider } from '../../providers/connect/connect';

class NamaProvinsi {
  public id: number;
  public nama: string;
}

@Component({
  selector: 'page-datasalesedit',
  templateUrl: 'datasalesedit.html',
})
export class DatasaleseditPage {

  namaProvinsi: NamaProvinsi;

  public unregisterBackButtonAction: any;
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;

  submitAttempt: boolean = false;
  param = {
    "token":"",
    "page": 1,
    "id": 0,
    "sales_organizational_id":0
  };

  guestData: any
  responseData: any

  listProvinsi = []
  listKabupaten = []
  listKecamatan = []
  listDesa = []
  listMotor = []
  listSource = []
  listBayar = ['Credit','Cash']
  history: boolean = false;

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
    }
    if(currentIndex == 2){
      this.param.page = 3
    }
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 10000,
      position: 'bottom',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  init(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    const localdata = JSON.parse(localStorage.getItem('userData'));
    const guest = this.navParams.get('item')
    this.history = this.navParams.get('history')

    loadingPopup.present();

    this.param.token = localdata.userData.token;
    this.param.sales_organizational_id = localdata.userData.sales_organizational_id
    this.param.id = guest.id;

    this.slideOneForm = this.formBuilder.group({
      tanggal_datang_show: [{value: new Date().toISOString(),disabled: true}],
      target_fu: [{value: new Date().toISOString(),disabled: false}],
      nama_konsumen_show: [{value: '', disabled: true},Validators.required],
      noHp1_show: [{value: '', disabled: true},Validators.required],
      cara_bayar_show: [{value: '', disabled: true},Validators.required],
      nama_motor_show: [{value: '', disabled: true},Validators.required],
      source_order_show: [{value: '', disabled: true},Validators.required],
      tanggal_datang: new Date().toISOString(),
      nama_konsumen: ['',Validators.required],
      noHp1: ['',Validators.required],
      cara_bayar: ['',Validators.required],
      nama_motor: ['',Validators.required],
      source_order: ['',Validators.required]
    });
    this.slideTwoForm = this.formBuilder.group({
      email_konsumen: [''],
      tempat_lahir: [''],
      tanggal_lahir: new Date().toISOString(),
      noHp2: ['']
    });
    this.slideThreeForm = this.formBuilder.group({
      nama_provinsi: [''],
      nama_kabupaten: [''],
      nama_kecamatan: [''],
      nama_desa: [''],
      nama_jalan: ['']
    });

    this.connect.getData(this.param.token,`getDetailDataSales?id=${guest.id}`).then(data=>{
      this.responseData = data;
      if(this.responseData){
        this.guestData = this.responseData.detail_tamu;
        this.listProvinsi = this.responseData.listProvinces;
        this.listKabupaten = this.responseData.listKabupaten;
        this.listKecamatan = this.responseData.listKecamatan;
        this.listDesa = this.responseData.listDesa;
        this.listMotor = this.responseData.listMotor;
        this.listSource = this.responseData.listSource;
        this.slideOneForm.patchValue({
          tanggal_datang_show: this.guestData.tanggal_datang,
          nama_konsumen_show: this.guestData.nama_konsumen,
          noHp1_show: this.guestData.noHp1,
          cara_bayar_show: this.guestData.cara_bayar,
          nama_motor_show: {
            id: this.guestData.motor.id,
            motor_name: this.guestData.motor.motor_name
          },
          source_order_show: {
            id: this.guestData.source.id,
            source_name: this.guestData.source.source_name,
          },
          tanggal_datang: this.guestData.tanggal_datang,
          target_fu: this.guestData.target_fu,
          nama_konsumen: this.guestData.nama_konsumen,
          noHp1: this.guestData.noHp1,
          cara_bayar: this.guestData.cara_bayar,
          nama_motor: {
            id: this.guestData.motor.id,
            motor_name: this.guestData.motor.motor_name
          },
          source_order: {
            id: this.guestData.source.id,
            source_name: this.guestData.source.source_name,
          }
        })
        this.slideTwoForm.patchValue({
          email_konsumen: this.guestData.email_konsumen,
          tempat_lahir: this.guestData.tempat_lahir,
          tanggal_lahir: this.guestData.tanggal_lahir,
          noHp2: this.guestData.noHp2
        })
        this.slideThreeForm.patchValue({
          nama_provinsi: {
            id: this.guestData.province.id,
            name: this.guestData.province.name
          },
          nama_kabupaten: {
            id: this.guestData.regency.id,
            name: this.guestData.regency.name
          },
          nama_kecamatan: {
            id: this.guestData.district.id,
            name: this.guestData.district.name
          },
          nama_desa: {
            id: this.guestData.village.id,
            name: this.guestData.village.name
          },
          nama_jalan: this.guestData.nama_jalan
        })
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

  kecamatanChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    this.connect.getData(this.param.token,`getDesa?district_id=${this.slideThreeForm.value.nama_kecamatan.id}`).then(data=>{
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
    this.connect.getData(this.param.token,`getKecamatan?regency_id=${this.slideThreeForm.value.nama_kabupaten.id}`).then(data=>{
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

  edit(){
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
      this.param.page = 3
      this.signupSlider.slideTo(2);
    }
    else {
      const sendData = {
        'tanggal_datang': this.slideOneForm.value.tanggal_datang,
        'target_fu': this.slideOneForm.value.target_fu,
        'nama_konsumen': this.slideOneForm.value.nama_konsumen,
        'noHp1': this.slideOneForm.value.noHp1,
        'cara_bayar': this.slideOneForm.value.cara_bayar,
        'nama_motor': this.slideOneForm.value.nama_motor,
        'source_order': this.slideOneForm.value.source_order,

        'email_konsumen': this.slideTwoForm.value.email_konsumen,
        'tempat_lahir': this.slideTwoForm.value.tempat_lahir,
        'tanggal_lahir': this.slideTwoForm.value.tanggal_lahir,
        'noHp2': this.slideTwoForm.value.noHp2,

        'nama_desa': this.slideThreeForm.value.nama_desa,
        'nama_jalan': this.slideThreeForm.value.nama_jalan,
        'nama_kabupaten': this.slideThreeForm.value.nama_kabupaten,
        'nama_kecamatan': this.slideThreeForm.value.nama_kecamatan,
        'nama_provinsi': this.slideThreeForm.value.nama_provinsi,

        'id': this.param.id,
        'token': this.param.token,
        'sales_organizational_id': this.param.sales_organizational_id
      }
      this.connect.postData(sendData,'editDataSales').then(data=>{
        this.responseData = data
        if(this.responseData.success){
          this.viewCtrl.dismiss(this.responseData.success);
        }else{
          this.presentToast(`Already Response by : ${this.responseData.nama_sales}`)
        }
      },(err)=>{
        this.presentToast('Koneksi Bermasalah')
      })
    }
  }

  provinsiChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();
    this.connect.getData(this.param.token,`getKabupaten?province_id=${this.slideThreeForm.value.nama_provinsi.id}`).then(data=>{
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
