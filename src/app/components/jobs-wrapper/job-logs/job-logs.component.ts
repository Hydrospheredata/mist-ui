import {Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input} from '@angular/core';
import {WebSocketLogsService} from '@services/web-socket-logs.service';

@Component({
  selector: 'mist-job-logs',
  templateUrl: './job-logs.component.html',
  styleUrls: ['./job-logs.component.scss'],
  providers: [WebSocketLogsService],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class JobLogsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('jobLogs') elem: ElementRef;
  @Input() jobId: number;
  private parent: Element;
  private isFullScreenEnabled: Boolean;
  logs: Array<object> = [];
  private subscriber: any;
  private webSocketLogsService: WebSocketLogsService;

  constructor(WebSocketLogsService: WebSocketLogsService) {
    this.webSocketLogsService = WebSocketLogsService;
  }

  ngOnInit() {
    if (this.jobId) {
      this.subscriber = this.webSocketLogsService.connect(this.jobId)
        .subscribe((data) => {
          if (data) {
            this.logs.push(data);
          }
        });
    }
  }

  ngAfterViewInit() {
    this.parent = this.elem.nativeElement.parentElement;
  }

  toggleToFullScreen() {
    if (!this.isFullScreenEnabled) {
      this.elem.nativeElement.classList.toggle('job-logs--full-screen');
      document.body.appendChild(this.elem.nativeElement);
      this.isFullScreenEnabled = true;
      location.hash = '';
    } else {
      this.parent.appendChild(this.elem.nativeElement);
      this.elem.nativeElement.classList.toggle('job-logs--full-screen');
      this.isFullScreenEnabled = false;
      location.hash = '#logs';
    }
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.toggleToFullScreen();
    }
  }

  ngOnDestroy(): void {
    this.webSocketLogsService.disconnect();
    if (this.subscriber) {
      this.subscriber.unsubscribe()
    }
  }

}
