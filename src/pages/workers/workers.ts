import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { WorkerModel } from '../../models/worker.model';

/**
 * Generated class for the WorkersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workers',
  templateUrl: 'workers.html',
})
export class WorkersPage {

  createNew = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadWorkers();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkersPage');
  }

  workers: WorkerModel[] = [];

  newWorker: WorkerModel = <WorkerModel>{
    wid: null,
    name: null,
    address1: null,
    location: {
      city: null,
      country: null,
      weather: null
    },
    telephoneNo: null,
    role: null,
    email: null
  };

  // CREATE
  addWorker() {
    if (this.newWorker.name != null) {
      this.newWorker.wid = new Date().toTimeString() + this.newWorker.name;
      this.storage.addWorker(this.newWorker).then(item => {
        this.newWorker = <WorkerModel>{};
        this.showToast('Worker added!')
        this.loadWorkers(); // Or add it to the array directly
      });
    }
  }

  CreateNewWorker(){
    this.createNew = true;
  }

  // READ
  loadWorkers() {
    this.storage.getWorkers().then(workers => {
      this.workers = workers;
      this.createNew = false;
    });
  }

  // UPDATE
  updateWorker(worker: WorkerModel) {
    worker = {
      wid: worker.wid,
      name: worker.name,
      address1: worker.address1,
      location: {
        city: worker.location.city,
        country: worker.location.country,
        weather: null
      },
      telephoneNo: worker.telephoneNo,
      role: worker.role,
      email: worker.email
    };

    this.storage.updateWorker(worker).then(item => {
      this.showToast('Worker updated!');
      this.loadWorkers(); // Or update it inside the array directly
    });
  }

  // DELETE
  deleteWorker(worker: WorkerModel) {
    this.storage.deleteWorker(worker.wid).then(item => {
      this.showToast('Worker removed!');
      this.loadWorkers(); // Or splice it from the array directly
    });
  }

  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
