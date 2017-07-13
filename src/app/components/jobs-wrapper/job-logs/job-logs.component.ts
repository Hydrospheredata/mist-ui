import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { WebSocketLogsService } from '@services/web-socket-logs.service';
import { HttpLogsService } from '@services/http-logs.service';

@Component({
  selector: 'mist-job-logs',
  templateUrl: './job-logs.component.html',
  styleUrls: ['./job-logs.component.scss'],
  providers: [WebSocketLogsService, HttpLogsService],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class JobLogsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('jobLogs') elem: ElementRef;
  @Input() jobId: string;
  private parent: Element;
  private isFullScreenEnabled: Boolean;
  private subscriber: any;

  public logs: string[];

  constructor(
    private webSocketLogsService: WebSocketLogsService,
    private httpLogsService: HttpLogsService
  ) {
    this.logs = [];
  }

  ngOnInit() {
    if (this.jobId) {
      this.httpLogsService.get(this.jobId).subscribe((logs) => {
        this.logs = logs.concat(this.logs)
      })
      this.subscriber = this.webSocketLogsService.connect(this.jobId)
        .subscribe((data) => {
          if (data) {
            let date = new Date(data.timeStamp)
            let log = `${date.toJSON()} [${data.from}] ${data.message}`
            this.logs.push(log);
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
