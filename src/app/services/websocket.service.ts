import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {

  protected apiUrl: string;
  protected port: string;

  constructor() {
    this.port = environment.production ? window.location.port : environment.port;
    this.apiUrl = `ws://${window.location.hostname}:${this.port}${environment.apiUrl}`;
  }

}
