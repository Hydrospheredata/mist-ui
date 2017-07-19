import { Component, OnInit, Inject, InjectionToken, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';

export let injectableLogs = new InjectionToken<object>('injectableLogs');

@Component({
  selector: 'mist-dialog-job-logs',
  templateUrl: './dialog-job-logs.component.html',
  styleUrls: ['./dialog-job-logs.component.scss']
})
export class DialogJobLogsComponent implements OnInit {
  public logs: object;

  constructor(@Inject(injectableLogs) data: object,
              public dialogRef: MdlDialogReference
  ) {
    this.logs = data;
  }

  ngOnInit() {
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

}
