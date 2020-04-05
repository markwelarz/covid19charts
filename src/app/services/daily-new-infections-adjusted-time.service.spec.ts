import { TestBed } from '@angular/core/testing';

import { DailyNewInfectionsAdjustedTimeService } from './daily-new-infections-adjusted-time.service';
import { Covid19dataService } from './covid19data.service';
import { MockCountryData } from '../test/mock.country.data';
import { TimeService } from './time.service';

describe('DailyNewInfectionsAdjustedTimeService', () => {
  let mockCovid19dataService: Partial<Covid19dataService> = {
    get covidData() {
      return MockCountryData.mockCountryData();
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule(
    {
      providers: [
        {provide : Covid19dataService, useValue: mockCovid19dataService},
        {provide : TimeService, useClass: TimeService}
      ]
    })
  });

  it('should be created', () => {
    const service: DailyNewInfectionsAdjustedTimeService = TestBed.get(DailyNewInfectionsAdjustedTimeService);
    expect(service).toBeTruthy();
  });

  it('all countries, all dates', () => {
    const service: DailyNewInfectionsAdjustedTimeService = TestBed.get(DailyNewInfectionsAdjustedTimeService);
    let chartOptions: Highcharts.Options = service.createChartOptions(["countrya", "countryb"], 10, "title1");
    expect(chartOptions).toEqual({
        title: {
          text: 'title1'
        },
        series: [{
          data: [10,11,12,50],
          type: 'line',
          name: 'countrya'
        },
        {
          data: [10,6,7,10,11,12,13],
          type: 'line',
          name: 'countryb'
        }],
        xAxis: {
          title: {
            text: 'Days since 10 infections'
          },
          categories: ["0","1","2","3","4","5","6"]
        }
      }
    );
  });
});
