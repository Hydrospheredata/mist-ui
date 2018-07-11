import { Component, OnInit, Inject, InjectionToken, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { HttpLogsService } from '@app/modules/core/services/_index';
import { Job } from '@shared/models';

export let injectableLogs = new InjectionToken<string[]>('injectableLogs');

@Component({
  selector: 'mist-dialog-job-logs',
  templateUrl: './dialog-job-logs.component.html',
  styleUrls: ['./dialog-job-logs.component.scss']
})
export class DialogJobLogsComponent implements OnInit {
  public logs: string[];
  public job: Job;
  public isTop = true;
  public isBottom = false;
  @ViewChild('jobLogs') elem: ElementRef;

  constructor(
    @Inject(injectableLogs) data: any,
    public dialogRef: MdlDialogReference,
    private httpLogsService: HttpLogsService
  ) {
    this.logs = data.logs;
    this.job = data.job;
  }

  ngOnInit() {
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

  /**
     * downloadLogs
     */
  public downloadLogs() {
    this.httpLogsService.downloadLogs(this.job.jobId);
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.dialogRef.hide();
  }

}
