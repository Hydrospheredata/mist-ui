import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {

  protected apiUrl: string;

  constructor() {
    this.apiUrl = `ws://${window.location.host}${environment.apiUrl}`;
  }

}
