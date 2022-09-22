import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private IP_ADDRESS: string = "UNKNOWN"

  constructor() { }

  public get IPAddress() : string {
    return this.IP_ADDRESS
  }
  
}
