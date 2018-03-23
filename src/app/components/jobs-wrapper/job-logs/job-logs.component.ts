import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { injectableLogs, DialogJobLogsComponent } from '@components/dialogs/dialog-job-logs/dialog-job-logs.component';
import { HttpLogsService, WebSocketLogsService } from '@services/_index';



@Component({
    selector: 'mist-job-logs',
    templateUrl: './job-logs.component.html',
    styleUrls: ['./job-logs.component.scss'],
    providers: [WebSocketLogsService, HttpLogsService],
})
export class JobLogsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('jobLogs') elem: ElementRef;
    @Input() jobId: string;
    public isTop = true;
    public isBottom = false;
    private parent: Element;
    private webSocketLogsServiceSub: any;
    public errorMessage: string;
    public logs: string[];
    private httpLogsServiceSub;
    private logTypes: string[] = ['Debug', 'Info', 'Warn', 'Error'];

    constructor(
        private webSocketLogsService: WebSocketLogsService,
        private httpLogsService: HttpLogsService,
        public dialog: MdlDialogService
    ) {
        this.logs = [];
    }

    ngOnInit() {
        if (this.jobId) {
            this.httpLogsServiceSub = this.httpLogsService.get(this.jobId)
                .subscribe(
                    (logs) => { console.log(logs); this.logs = logs.concat(this.logs); },
                    (error) => { this.errorHandler(error) }
                );
            this.webSocketLogsServiceSub = this.webSocketLogsService
                .connect(this.jobId)
                .subscribe(
                    (data) => { this.pushLogs(data.events); },
                    (error) => { this.errorHandler(error) }
                );
        }
    }

    ngAfterViewInit() {
        this.parent = this.elem.nativeElement.parentElement;
        console.log(this.parent);
    }

    public scrollTo(direction: string) {
        const container = this.elem.nativeElement.querySelector('.job-logs--container');
        const height = container.scrollHeight;
        if (direction === 'top') {
            container.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } else {
            container.scrollTo({ left: 0, top: height, behavior: 'smooth' });
        }
    }

    public onScroll(event) {
        if (event.target.scrollTop > 0) {
            this.isTop = false;
        } else {
            this.isTop = true;
        }
        if (event.target.scrollTop < event.target.scrollHeight - event.target.offsetHeight) {
            this.isBottom = false;
        } else {
            this.isBottom = true;
        }
    }

    showDialogJobLogs() {
        this.dialog.showCustomDialog({
            component: DialogJobLogsComponent,
            styles: { 'width': '100%', 'height': '100%' },
            classes: 'job-logs--dialog',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableLogs, useValue: this.logs }],
        });
    }

    ngOnDestroy() {
        this.webSocketLogsService.disconnect();
        if (this.webSocketLogsServiceSub) {
            this.webSocketLogsServiceSub.unsubscribe()
        }
        this.httpLogsServiceSub.unsubscribe();
    }

    private pushLogs(events) {
        if (events) {
            events.forEach(event => {
                let date = new Date(event.timeStamp);
                let log = `${this.setLogType(Number(event.level))} ${date.toJSON()} [${event.from}] ${event.message}`;
                this.logs.push(log);
            })
        }
    }

    private setLogType(logType: number) {
        return this.logTypes[`${logType - 1}`].toUpperCase();
    }

    private errorHandler(error) {
        this.errorMessage = `Logs for ${this.jobId}: ` + error
    }

}
