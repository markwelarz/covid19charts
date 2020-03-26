import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeComparisonComponent } from './time-comparison.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DailyNewInfectionsService } from '../../services/daily-new-infections.service';

describe('TimeComparisonComponent', () => {
  let component: TimeComparisonComponent;
  let fixture: ComponentFixture<TimeComparisonComponent>;
  let mockDailyNewInfectionsService: Partial<DailyNewInfectionsService> = {
    createChartOptions(countries: string[], startWhenCasesAtLeast: number): Highcharts.Options {
      return undefined;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeComparisonComponent
      ],
      imports: [
        HighchartsChartModule
      ],
      providers: [
        {provide: DailyNewInfectionsService, useValue: mockDailyNewInfectionsService}        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockDailyNewInfectionsService = TestBed.get(DailyNewInfectionsService);
    spyOn(mockDailyNewInfectionsService, 'createChartOptions').and.returnValue({
      series: [
      {
        data: [],
        type: 'line'
      }]
    });
    fixture = TestBed.createComponent(TimeComparisonComponent);
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
    expect(mockDailyNewInfectionsService.createChartOptions).toHaveBeenCalledWith(['England', 'Scotland'], 55, 'chart title');
  });
});
