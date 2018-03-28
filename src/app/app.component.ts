import { Component, ViewContainerRef } from '@angular/core';
import { MdlDialogOutletService } from '@angular-mdl/core';



@Component({
  selector: 'mist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'WebMist!';

  constructor(
    private dilalogOuletService: MdlDialogOutletService,
    private viewConatinerRef: ViewContainerRef,
  ) {
    this.dilalogOuletService.setDefaultViewContainerRef(this.viewConatinerRef);
  }

}


