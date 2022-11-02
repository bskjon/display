import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IdBehaviourSubject, LiveWatt } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class LiveValueService {

  public meterLiveConsumption: BehaviorSubject<Array<IdBehaviourSubject<LiveWatt>>> = new BehaviorSubject<Array<IdBehaviourSubject<LiveWatt>>>([]);

  constructor() { }
}
