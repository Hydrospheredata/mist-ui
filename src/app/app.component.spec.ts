import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { AppComponent } from '@app/app.component';
import { NavbarComponent } from '@core/components';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'WebMist!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('WebMist!');
  }));
});
