import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';

@Injectable()
export class WebsocketService {

  protected apiUrl: string;

  constructor(location:Location) {
    let url="ws";
    if(window.location.protocol.indexOf("s")>=0){
      url+="s";
    }
    const path = location.prepareExternalUrl(environment.apiUrl).replace("/ui" + environment.apiUrl, environment.apiUrl);
    this.apiUrl = `${url}://${window.location.host}${path}`;
  }

}
