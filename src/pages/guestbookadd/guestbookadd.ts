import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

/**
 * Generated class for the GuestbookaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-guestbookadd',
  templateUrl: 'guestbookadd.html',
})
export class GuestbookaddPage {

  public unregisterBackButtonAction: any;
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  param = {
    "token":""
  };

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public navParams: NavParams) {
    this.init()
  }

  init(){
    this.slideOneForm = this.formBuilder.group({
      Date: new Date().toISOString(),
      namaKonsumen: '',
      namaJalan: ''
    });
    this.slideTwoForm = this.formBuilder.group({
      username: [''],
      privacy: [''],
      bio: ['']
    });
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
