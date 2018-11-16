import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { IonicSelectableComponent } from 'ionic-selectable';

class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'page-guestbookadd',
  templateUrl: 'guestbookadd.html',
})
export class GuestbookaddPage {

  //ports: Port[];
  port: Port;

  public unregisterBackButtonAction: any;
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  param = {
    "token":""
  };

  ports = [
    { id: 1, name: 'Jawa Barat' },
    { id: 2, name: 'Jawa Timur' },
    { id: 3, name: 'Jawa Tengah' }
  ]

  params = {
    namaProvinsi: []
  }

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
      ports: new FormControl(this.ports),
      Date: new Date().toISOString(),
      namaKonsumen: '',
      namaJalan: '',
      port: new FormControl(this.params.namaProvinsi)
    });
    this.slideTwoForm = this.formBuilder.group({
      username: [''],
      privacy: [''],
      bio: ['']
    });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log(event.value);
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
