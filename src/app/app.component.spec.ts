import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { Component, Input } from '@angular/core';

@Component({selector: 'offset-time-comparison', template: ''})
class OffsetTimeComparisonStubComponent {
  @Input()
  public startWhenCasesAtLeast : number;
  @Input()
  public countries: string[]
  @Input()
  public title: string;
}
@Component({selector: 'rate-of-change-comparison', template: ''})
class RateOfChangeComparisonStubComponent {
  @Input()
  public startWhenCasesAtLeast : number;
  @Input()
  public countries: string[]
  @Input()
  public title: string;
}
@Component({selector: 'time-comparison', template: ''})
class TimeComparisonStubComponent {
  @Input()
  public startWhenCasesAtLeast : number;
  @Input()
  public countries: string[]
  @Input()
  public title: string;
}
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        OffsetTimeComparisonStubComponent,
        RateOfChangeComparisonStubComponent,
        TimeComparisonStubComponent
      ],
      imports: [
        HighchartsChartModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
