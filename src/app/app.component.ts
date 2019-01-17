import { Component } from '@angular/core';
import { Platform, MenuController, AlertController, ToastController, App, Events, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { ConnectProvider } from '../providers/connect/connect';
import { MenusPage } from '../pages/menus/menus';
import { LoginPage } from '../pages/login/login';

import { TabsdatacustomerPage } from '../pages/tabsdatacustomer/tabsdatacustomer'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  responseData;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public push: Push,
    public events: Events,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public app: App,
    public connect: ConnectProvider,
    public toastCtrl : ToastController,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.initPushNotification();
      if (platform.is('android')) {
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#000000');
      }
      splashScreen.hide();
    });
  }

  initPushNotification(){
    const options: PushOptions = {
      android: {
        sound: 'default',
        vibrate: true
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: true
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) =>{
      if (localStorage.getItem('userData')) {
        switch(notification.additionalData.function) {
          case "createDataSales":
            let confirmAlert = this.alertCtrl.create({
              title: 'Notification',
              message: notification.message,
              buttons: [{
                text: 'Ignore',
                role: 'cancel'
              },{
                text: 'Accept',
                handler: () => {
                  const localdata = JSON.parse(localStorage.getItem('userData'));
                  const update = {
                    'id': notification.additionalData.item.id,
                    'hasil': 'OPEN',
                    'target_fu': new Date().toJSON().slice(0,10),
                    'token': localdata.userData.token,
                    'sales_id': localdata.userData.id
                  }
                  let loadingPopup = this.loadingCtrl.create({
                    content: 'Loading data...'
                  });
                  loadingPopup.present();
                  this.connect.postData(update,'changeDataSales').then(data=>{
                    this.responseData = data;
                    if(this.responseData.success){
                      loadingPopup.dismiss();
                      this.pushToDataSales();
                    }else{
                      loadingPopup.dismiss();
                      this.presentToast(`Already Response by : ${this.responseData.nama_sales}`)
                    }
                  },(err)=>{
                    loadingPopup.dismiss();
                    this.presentToast("Koneksi Bermasalah");
                  })
                }
              }]
            });
            confirmAlert.present();
            break;
          default:
        }
      }
    });

    if (localStorage.getItem('device_token')) {
      if (localStorage.getItem('userData')) {
        this.rootPage = MenusPage ;
      }else{
        this.rootPage = LoginPage ;
      }
    }else{
      pushObject.on('registration').subscribe((registration: any) => {
        localStorage.setItem('device_token', registration.registrationId)
      });

      if (localStorage.getItem('userData')) {
        this.rootPage = MenusPage ;
      }else{
        this.rootPage = LoginPage ;
      }
    }

    pushObject.on('error').subscribe(error => {
      this.presentToast("Device Problem, Please restart Device");
    });
  }

  pushToDataSales(){
    this.app.getRootNav().push(TabsdatacustomerPage,{
      index: 1
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}

