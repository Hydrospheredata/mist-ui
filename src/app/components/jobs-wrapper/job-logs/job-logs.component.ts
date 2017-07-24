import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { WebSocketLogsService } from '@services/web-socket-logs.service';
import { MdlDialogService } from '@angular-mdl/core';
import { injectableLogs, DialogJobLogsComponent } from '@components/dialogs/dialog-job-logs/dialog-job-logs.component';
import { HttpLogsService } from '@services/http-logs.service';

@Component({
  selector: 'mist-job-logs',
  templateUrl: './job-logs.component.html',
  styleUrls: ['./job-logs.component.scss'],
  providers: [WebSocketLogsService, HttpLogsService],
})
export class JobLogsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('jobLogs') elem: ElementRef;
  @Input() jobId: string;
  private parent: Element;
  private subscriber: any;
  public errorMessage: string;
  public logs: string[];

  constructor(
    private webSocketLogsService: WebSocketLogsService,
    private httpLogsService: HttpLogsService,
    public dialog: MdlDialogService
  ) {
    this.logs = [];
  }

  ngOnInit() {
    if (this.jobId) {
      this.httpLogsService.get(this.jobId).subscribe(
        (logs) => { this.logs = logs.concat(this.logs); },
        (error) => { this.errorHandler(error) }
      );
      this.subscriber = this.webSocketLogsService.connect(this.jobId)
        .subscribe(
          (data) => { this.pushLogs(data); },
          (error) => { this.errorHandler(error) }
        );
    }
  }

  ngAfterViewInit() {
    this.parent = this.elem.nativeElement.parentElement;
  }

  showDialogJobLogs() {
    this.dialog.showCustomDialog({
      component: DialogJobLogsComponent,
      styles: {'width': '100%', 'height': '100%'},
      classes: 'job-logs--dialog',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableLogs, useValue: this.logs}],
    });
  }

  ngOnDestroy(): void {
    this.webSocketLogsService.disconnect();
    if (this.subscriber) {
      this.subscriber.unsubscribe()
    }
  }

  private pushLogs(data) {
    if (data) {
      let date = new Date(data.timeStamp);
      let log = `${date.toJSON()} [${data.from}] ${data.message}`;
      this.logs.push(log);
    }
  }

  private errorHandler(error) {
    this.errorMessage = `Logs for ${this.jobId}: ` + error
  }

}
