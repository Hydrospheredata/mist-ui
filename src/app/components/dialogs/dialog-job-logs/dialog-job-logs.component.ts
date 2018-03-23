import { Component, OnInit, Inject, InjectionToken, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';

export let injectableLogs = new InjectionToken<object>('injectableLogs');

@Component({
  selector: 'mist-dialog-job-logs',
  templateUrl: './dialog-job-logs.component.html',
  styleUrls: ['./dialog-job-logs.component.scss']
})
export class DialogJobLogsComponent implements OnInit {
  public logs: object;
  public isTop = true;
  public isBottom = false;
  @ViewChild('jobLogs') elem: ElementRef;

  constructor(@Inject(injectableLogs) data: object,
    public dialogRef: MdlDialogReference
  ) {
    this.logs = data;
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

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.dialogRef.hide();
  }

}
