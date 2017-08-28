import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Workers } from '@models/workers';

@Injectable()
export class HttpWorkersService {

  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = '/workers';
  }

  getAll(): Observable<Workers[]> {
    return this.http.get(this.baseUrl)
      .map((res: Response) => {
        return res.json();
      })
  }

}
