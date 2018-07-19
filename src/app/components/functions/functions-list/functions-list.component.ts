import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobStore, FunctionStore } from '@app/modules/core/stores/_index';
import { Job, Function } from '@app/modules/shared/models';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogFunctionFormComponent, injectableFunction } from '@app/components/dialogs/_index';

@Component({
  selector: 'mist-functions-list',
  templateUrl: './functions-list.component.html',
  styleUrls: ['./functions-list.component.scss']
})
export class FunctionsListComponent implements OnInit, OnDestroy {
  functions: Function[];
  runningJobs: Job[];
  searchQ: string;
  private functionStoreSub;
  private jobStoreSub;
  public activeFunction: string;
  public functionSubscriber;


  constructor(
    private functionStore: FunctionStore,
    private jobStore: JobStore,
    private router: Router,
    public dialog: MdlDialogService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loadInitialData();
    this.router.events.subscribe((params) => {
      if (params && params['url']) {
        this.activeFunction = params['url'].split(/\//);
        this.activeFunction = this.activeFunction[this.activeFunction.length - 1];
      }
    });

  }

  ngOnDestroy() {
    if (this.functionStoreSub) {
      this.functionStoreSub.unsubscribe();
    }
    if (this.jobStoreSub) {
      this.jobStoreSub.unsubscribe();
    }
    if (this.functionSubscriber) {
      this.functionSubscriber.unsubscribe();
    }
  }

  openDialogFunctionForm(functionInfo = null) {
    this.dialog.showCustomDialog({
      component: DialogFunctionFormComponent,
      isModal: true,
      styles: { 'width': '850px', 'max-height': '100%' },
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{ provide: injectableFunction, useValue: functionInfo }]
    });
  }

  loadInitialData() {
    this.functionStore.getAll();
    this.functionSubscriber = this.functionStore.functions
      .subscribe(data => {
        if (data.length) {
          this.router.navigate([`/functions/${data[0].name}`]);
        } else {
          this.router.navigate(['/functions']);
        }
        this.functions = data;
      });
    this.jobStore.getAllRunning();
    this.jobStore.runningJobs.subscribe((jobs) => {
      this.runningJobs = jobs;
    })
  }

}
