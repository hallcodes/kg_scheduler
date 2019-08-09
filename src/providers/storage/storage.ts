import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { WorkerModel } from "../../models/worker.model";

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const ITEMS_KEY = 'kg-workers';

@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  // CREATE
  addWorker(worker: WorkerModel): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((workers: WorkerModel[]) => {
      if (workers) {
        workers.push(worker);
        return this.storage.set(ITEMS_KEY, workers);
      } else {
        return this.storage.set(ITEMS_KEY, [worker]);
      }
    });
  }

  // READ
  getWorkers(): Promise<WorkerModel[]> {
    return this.storage.get(ITEMS_KEY);
  }

  // UPDATE
  updateWorker(worker: WorkerModel): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((workers: WorkerModel[]) => {
      if (!workers || workers.length === 0) {
        return null;
      }

      let newWorkers: WorkerModel[] = [];

      for (let i of workers) {
        if (i.wid === worker.wid) {
            newWorkers.push(worker);
        } else {
            newWorkers.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newWorkers);
    });
  }

  // DELETE
  deleteWorker(wid: string): Promise<WorkerModel> {
    return this.storage.get(ITEMS_KEY).then((workers: WorkerModel[]) => {
      if (!workers || workers.length === 0) {
        return null;
      }

      let toKeep: WorkerModel[] = [];

      for (let i of workers) {
        if (i.wid !== wid) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }

}
