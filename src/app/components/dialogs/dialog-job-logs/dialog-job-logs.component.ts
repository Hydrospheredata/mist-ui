import { Component, OnInit, Inject, InjectionToken, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import * as FileSaver from 'file-saver';
import { Job } from '@app/models/job';

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
    public dialogRef: MdlDialogReference
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
    console.log(this.job);
    const blob = new Blob([this.logs.join('\n')], { type: 'application/text' });
    const fileName = `${this.job.jobId}.log`;
    FileSaver.saveAs(blob, fileName);
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.dialogRef.hide();
  }

}
