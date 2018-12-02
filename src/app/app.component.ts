import { Component } from '@angular/core';
import { Platform, MenuController, AlertController, ToastController, App, Events, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { ConnectProvider } from '../providers/connect/connect';
import { MenusPage } from '../pages/menus/menus';
import { LoginPage } from '../pages/login/login';

import { DatasaleseditPage } from '../pages/datasalesedit/datasalesedit'
import { TabsdatacustomerPage } from '../pages/tabsdatacustomer/tabsdatacustomer'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public push: Push,
    public events: Events,
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
                text: 'View',
                handler: () => {
                  let profileModal = this.modalCtrl.create(DatasaleseditPage,{
                    item: notification.additionalData.item,
                    history: false
                  });
                  profileModal.onDidDismiss(data => {
                    if (data) {
                      this.pushToDataSales()
                    }
                  });
                  profileModal.present();
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

