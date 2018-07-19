import { Component, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '@app/modules/core/services/loader.service/loader.service';
import { LoaderState } from '@app/modules/shared/models';



@Component({
  selector: 'mist-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewChecked, OnDestroy {

  public show: boolean;

  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        // workaround to fix Error: ExpressionChangedAfterItHasBeenCheckedError
        // todo find better solution
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cd.detach();
  }
}
