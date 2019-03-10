import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Push } from '@ionic-native/push';
import { IonicSelectableModule } from 'ionic-selectable'
import { File } from '@ionic-native/file'
import { FilePath } from '@ionic-native/file-path'
import { FileTransfer } from '@ionic-native/file-transfer'
import { Camera } from '@ionic-native/camera'
import { SuperTabsModule } from 'ionic2-super-tabs';
import { Vibration } from '@ionic-native/vibration';

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
import { ListmotorPage } from "../pages/listmotor/listmotor";
import { MotordetailPage } from "../pages/motordetail/motordetail";

import { DatasalesopenPage } from '../pages/datasalesopen/datasalesopen'
import { DatasalesprosesPage } from '../pages/datasalesproses/datasalesproses'
import { DatasalesclosedPage } from '../pages/datasalesclosed/datasalesclosed'
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
    DatasaleseditPage,
    ListmotorPage,
    MotordetailPage
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
    DatasaleseditPage,
    ListmotorPage,
    MotordetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FilePath,
    FileTransfer,
    Camera,
    Push,
    Vibration,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectProvider,
  ]
})
export class AppModule {}
