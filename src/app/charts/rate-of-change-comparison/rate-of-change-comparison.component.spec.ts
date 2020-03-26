import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNewInfectionsAdjustedTimeService } from '../../services/daily-new-infections-adjusted-time.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { RateOfChangeComparisonComponent } from './rate-of-change-comparison.component';
import { InfectionRateIncreaseService } from 'src/app/services/infection-rate-increase.service';

describe('RateOfChangeComparisonComponent', () => {
  let component: RateOfChangeComparisonComponent;
  let fixture: ComponentFixture<RateOfChangeComparisonComponent>;
  let mockInfectionRateIncreaseService: Partial<InfectionRateIncreaseService> = {
    createChartOptions(countries: string[], startWhenCasesAtLeast: number, title: string, averageOver: number): Highcharts.Options {
      return undefined;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RateOfChangeComparisonComponent
      ],
      imports: [
        HighchartsChartModule
      ],
      providers: [
        {provide: InfectionRateIncreaseService, useValue: mockInfectionRateIncreaseService}        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockInfectionRateIncreaseService = TestBed.get(InfectionRateIncreaseService);
    spyOn(mockInfectionRateIncreaseService, 'createChartOptions').and.returnValue({
      series: [
      {
        data: [],
        type: 'line'
      }]
    });
    fixture = TestBed.createComponent(RateOfChangeComparisonComponent);
    component = fixture.componentInstance;
    component.countries = ['England', 'Scotland'];
    component.title = 'chart title';
    component.startWhenCasesAtLeast = 55;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve chart options from service', () => {
    expect(mockInfectionRateIncreaseService.createChartOptions).toHaveBeenCalledWith(['England', 'Scotland'], 55, 'chart title', 5);
  });
});
