import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener} from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'mist-jobs-logs',
  templateUrl: './jobs-logs.component.html',
  styleUrls: ['./jobs-logs.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class JobsLogsComponent implements OnInit, AfterViewInit {
  @ViewChild('jobsLogs') elem: ElementRef;
  parent: Element;
  isFullScreenEnabled: Boolean;
  baseUrl: string;
  constructor() {
    this.baseUrl = `${environment.ws}:${environment.port}/v2/api/ws`;
  }

  ngOnInit() {
    let socket = new WebSocket(this.baseUrl);

  }

  ngAfterViewInit() {
    this.parent = this.elem.nativeElement.parentElement;
    console.log( 'elem' , this.elem);
    console.log( 'elem' , this.parent);
  }

  toggleToFullScreen() {
    if (!this.isFullScreenEnabled) {
      this.elem.nativeElement.classList.toggle('jobs-logs--full-screen');
      document.body.appendChild(this.elem.nativeElement);
      this.isFullScreenEnabled = true;
    } else {
      this.parent.appendChild(this.elem.nativeElement);
      this.elem.nativeElement.classList.toggle('jobs-logs--full-screen');
      this.isFullScreenEnabled = false;
    }
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.toggleToFullScreen();
    }
  }

}
