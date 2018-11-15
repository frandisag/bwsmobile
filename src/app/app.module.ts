import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MenusPage } from '../pages/menus/menus';
import { ConnectProvider } from '../providers/connect/connect';
import { UbahsandiPage } from '../pages/ubahsandi/ubahsandi'
import { TabsdatacustomerPage } from '../pages/tabsdatacustomer/tabsdatacustomer'
import { TabsguestbookPage } from '../pages/tabsguestbook/tabsguestbook'
import { TabspricelistPage } from '../pages/tabspricelist/tabspricelist'
import { TabsprofilePage } from '../pages/tabsprofile/tabsprofile'
import { GuestbookaddPage } from '../pages/guestbookadd/guestbookadd'
import { SetfilterPage } from '../pages/setfilter/setfilter'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenusPage,
    UbahsandiPage,
    TabsdatacustomerPage,
    TabsguestbookPage,
    TabspricelistPage,
    TabsprofilePage,
    GuestbookaddPage,
    SetfilterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenusPage,
    UbahsandiPage,
    TabsdatacustomerPage,
    TabsguestbookPage,
    TabspricelistPage,
    TabsprofilePage,
    GuestbookaddPage,
    SetfilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectProvider
  ]
})
export class AppModule {}
