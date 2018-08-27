import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import {
    // injectableLogs,
    DialogJobLogsComponent
} from '@app/components/dialogs/dialog-job-logs/dialog-job-logs.component';
// import { HttpLogsService, WebSocketLogsService } from '@app/modules/core/services/_index';
import { Job } from '@app/modules/shared/models';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromRoot from '@app/modules/core/actions';
import * as fromJobLogsActions from '@app/modules/jobs/actions'
import * as fromJobLogs from '@app/modules/jobs/reducers';
import { Observable } from 'rxjs';



@Component({
    selector: 'mist-job-logs',
    templateUrl: './job-logs.component.html',
    styleUrls: ['./job-logs.component.scss'],
    providers: [],
})
export class JobLogsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('jobLogs') elem: ElementRef;
    @Input() job: Job;
    public isTop = true;
    public isBottom = false;
    private parent: Element;
    private webSocketLogsServiceSub: any;
    public errorMessage: string;
    public logs: any[];

    public logs$: Observable<string[]>;
    private httpLogsServiceSub;
    private logTypes: string[] = ['Debug', 'Info', 'Warn', 'Error'];

    constructor(
        // private webSocketLogsService: WebSocketLogsService,
        // private httpLogsService: HttpLogsService,
        public dialog: MdlDialogService,
        private store: Store<MistState>
    ) {
        this.logs = [];
        this.store.dispatch(new fromJobLogsActions.GetLogs);
        // this.store.dispatch(new fromRoot.WsLogsConnect);
        this.logs$ = this.store.select(fromJobLogs.getJobLogs);
    }

    ngOnInit() {
        // console.log(this.job);
        // const regexp = /([a-zA-Z0-9_\-.,!?:…[\]]+)/g;
        // if (this.job) {
        //     this.httpLogsServiceSub = this.httpLogsService.get(this.job.jobId)
        //         .subscribe(
        //             (logs) => {
        //                 logs.pop();
        //                 logs.forEach((log) => {
        //                     let charIndex = log.indexOf(']');
        //                     let logObject = {};
        //                     if (charIndex !== -1) {
        //                         let message = log.slice(charIndex + 2);
        //                         let logsArray = log.match(regexp);
        //                         logObject = {
        //                             type: logsArray[0],
        //                             date: logsArray[1],
        //                             jobId: logsArray[2],
        //                             message: message
        //                         }
        //                     } else {
        //                         logObject = {
        //                             message: log
        //                         }
        //                     }
        //                     this.logs.push(logObject);
        //                 });
        //             },
        //             (error) => { this.errorHandler(error) }
        //         );
        //     this.webSocketLogsServiceSub = this.webSocketLogsService
        //         .connect(this.job.jobId)
        //         .subscribe(
        //             (data) => { this.pushLogs(data.events); },
        //             (error) => { this.errorHandler(error) }
        //         );
        // }
    }

    ngAfterViewInit() {
        this.parent = this.elem.nativeElement.parentElement;
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

    public showDialogJobLogs() {
        this.dialog.showCustomDialog({
            component: DialogJobLogsComponent,
            styles: { 'width': '100%', 'height': '100%' },
            classes: 'job-logs--dialog',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            // providers: [{ provide: injectableLogs, useValue: { job: this.job, logs: this.logs } }],
        });
    }

    public downloadLogs() {
        // this.httpLogsService.downloadLogs(this.job.jobId);
    }

    ngOnDestroy() {
        this.store.dispatch(new fromRoot.WsLogsDisconnect);

        // this.webSocketLogsService.disconnect();
        // if (this.webSocketLogsServiceSub) {
        //     this.webSocketLogsServiceSub.unsubscribe()
        // }
        // this.httpLogsServiceSub.unsubscribe();
    }

    private pushLogs(events) {
        if (events) {
            events.forEach(event => {
                let date = new Date(event.timeStamp);
                let log = {
                    type: this.setLogType(Number(event.level)),
                    date: date.toJSON(),
                    jobId: event.from,
                    message: event.message
                }
                this.logs.push(log);
            })
        }
    }

    private setLogType(logType: number) {
        return this.logTypes[`${logType - 1}`].toUpperCase();
    }

    private errorHandler(error) {
        this.errorMessage = `Logs for ${this.job.jobId}: ` + error
    }

}
