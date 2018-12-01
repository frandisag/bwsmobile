import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Push } from '@ionic-native/push';
import { IonicSelectableModule } from 'ionic-selectable'
import { SuperTabsModule } from 'ionic2-super-tabs';

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
import { GuestbookeditPage } from '../pages/guestbookedit/guestbookedit'
import { GuestfollowupPage } from '../pages/guestfollowup/guestfollowup'
import { GuestfollowupaddPage } from "../pages/guestfollowupadd/guestfollowupadd";
import { GuestbookopenPage } from '../pages/guestbookopen/guestbookopen'
import { GuestbookclosedPage } from '../pages/guestbookclosed/guestbookclosed'

import { DatasalesopenPage } from '../pages/datasalesopen/datasalesopen'
import { DatasalesprosesPage } from '../pages/datasalesproses/datasalesproses'
import { DatasalesclosedPage } from '../pages/datasalesclosed/datasalesclosed'
import { DatasalesaddPage } from '../pages/datasalesadd/datasalesadd'
import { DatasaleseditPage } from '../pages/datasalesedit/datasalesedit'
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
    GuestbookeditPage,
    SetfilterPage,
    GuestfollowupPage,
    GuestfollowupaddPage,
    GuestbookopenPage,
    GuestbookclosedPage,
    DatasalesopenPage,
    DatasalesprosesPage,
    DatasalesclosedPage,
    DatasalesaddPage,
    DatasaleseditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist: false
    }),
    IonicSelectableModule,
    SuperTabsModule.forRoot()
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
    GuestbookeditPage,
    SetfilterPage,
    GuestfollowupPage,
    GuestfollowupaddPage,
    GuestbookopenPage,
    GuestbookclosedPage,
    DatasalesopenPage,
    DatasalesprosesPage,
    DatasalesclosedPage,
    DatasalesaddPage,
    DatasaleseditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectProvider
  ]
})
export class AppModule {}
