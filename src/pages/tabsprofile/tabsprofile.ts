import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, ViewController, ToastController, LoadingController, Platform } from 'ionic-angular';

import { ConnectProvider } from '../../providers/connect/connect';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

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

  public unregisterBackButtonAction: any;
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
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public camera: Camera,
    private file: File,
    private filePath: FilePath,
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
    var options = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imagePath) => {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          let newName = this.createFileName();

          this.file.copyFile(correctPath, currentName, cordova.file.externalApplicationStorageDirectory, newName).then(success => {
            this.userProfile.foto_profile = cordova.file.externalApplicationStorageDirectory + newName;

            let loadingPopup = this.loadingCtrl.create({
              content: 'Loading data...'
            });
            loadingPopup.present();
            setTimeout(() => {
              loadingPopup.dismiss();
            }, 5000);
          }, error => {
            this.presentToast('Error while storing file.');
          });

        });
    }, (err) => {
      //this.presentToast('Error while selecting image.');
    });
  }

  createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  save(){
    console.log('save')
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
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
