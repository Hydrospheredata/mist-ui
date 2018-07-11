import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { WorkersStore } from '@app/modules/core/stores/workers.store';

@Component({
  selector: 'mist-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  private activatedRouteSub: any;
  public worker;
  public codeMirrorOptions: object;
  public pageId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    // private workersStore: WorkersStore
  ) { }

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.params
      .subscribe((params) => {
        this.loadInitialData(params['workerId']);
        this.pageId = params['workerId'];
      });

    this.codeMirrorOptions = {
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true,
      readOnly: true,
      scrollbarStyle: 'null',
      smartIndent: true
    }
  }

  loadInitialData(workerId: string) {
    if (workerId !== 'overview') {
      // this.workersStore.get(workerId)
      //   .subscribe((worker) => {
      //     console.log(worker);
      //     this.worker = worker;
      //   });
    }
  }
}
