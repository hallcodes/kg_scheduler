import { LocationModel } from "./location.model";

export interface WorkerModel {
    wid: string,
    name: string,
    address1: string,
    location: LocationModel;
    telephoneNo: string,
    role: string,
    email: string
  }