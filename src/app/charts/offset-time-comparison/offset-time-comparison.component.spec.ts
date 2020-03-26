import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsetTimeComparison } from './offset-time-comparison.component';
import { DailyNewInfectionsAdjustedTimeService } from '../../services/daily-new-infections-adjusted-time.service';
import { HighchartsChartModule } from 'highcharts-angular';

describe('OffsetTimeComparison', () => {
  let component: OffsetTimeComparison;
  let fixture: ComponentFixture<OffsetTimeComparison>;
  let mockDailyNewInfectionsAdjustedTimeService: Partial<DailyNewInfectionsAdjustedTimeService> = {
    createChartOptions(countries: string[], startWhenCasesAtLeast: number): Highcharts.Options {
      return undefined;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OffsetTimeComparison
      ],
      imports: [
        HighchartsChartModule
      ],
      providers: [
        {provide: DailyNewInfectionsAdjustedTimeService, useValue: mockDailyNewInfectionsAdjustedTimeService}        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockDailyNewInfectionsAdjustedTimeService = TestBed.get(DailyNewInfectionsAdjustedTimeService);
    spyOn(mockDailyNewInfectionsAdjustedTimeService, 'createChartOptions').and.returnValue({
      series: [
      {
        data: [],
        type: 'line'
      }]
    });
    fixture = TestBed.createComponent(OffsetTimeComparison);
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
    expect(mockDailyNewInfectionsAdjustedTimeService.createChartOptions).toHaveBeenCalledWith(['England', 'Scotland'], 55, 'chart title');
  });
});
