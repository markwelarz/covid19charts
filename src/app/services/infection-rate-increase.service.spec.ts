import { TestBed } from '@angular/core/testing';

import { InfectionRateIncreaseService } from './infection-rate-increase.service';
import { Covid19dataService } from './covid19data.service';
import { MockCountryData } from '../test/mock.country.data';
import { TimeService } from './time.service';
import { nestedFloatingPointCustomEqualityTester } from '../test/nested-floating-point-custom-equality-tester';

describe('InfectionRateIncreaseService', () => {
  let mockCovid19dataService: Partial<Covid19dataService> = {
    get covidData() {
      return MockCountryData.mockCountryData2();
    }
  };

  beforeEach(() => {
    jasmine.addCustomEqualityTester(nestedFloatingPointCustomEqualityTester);

    TestBed.configureTestingModule(
    {
      providers: [
        {provide : Covid19dataService, useValue: mockCovid19dataService},
        {provide : TimeService, useClass: TimeService}
      ]
    })
  });

  it('should be created', () => {
    const service: InfectionRateIncreaseService = TestBed.get(InfectionRateIncreaseService);
    expect(service).toBeTruthy();
  });

  it('all dates', () => {
    const service: InfectionRateIncreaseService = TestBed.get(InfectionRateIncreaseService);
    let chartOptions: Highcharts.Options = service.createChartOptions(["countrya"], 0, "title1", 5);
    expect(chartOptions).toEqual({
        title: {
          text: 'title1'
        },
        series: [{
          data: [
            100*(1/5+1/4+1/3+1/2+1)/5,
            100*(1/6+1/5+1/4+1/3+1/2)/5,
            100*(1/7+1/6+1/5+1/4+1/3)/5,
            100*(1/8+1/7+1/6+1/5+1/4)/5,
            100*(1/9+1/8+1/7+1/6+1/5)/5,
            100*(1/10+1/9+1/8+1/7+1/6)/5,
            100*(1/11+1/10+1/9+1/8+1/7)/5,
            100*(1/12+1/11+1/10+1/9+1/8)/5,
            100*(1/13+1/12+1/11+1/10+1/9)/5,
            100*(1/14+1/13+1/12+1/11+1/10)/5,
            100*(1/15+1/14+1/13+1/12+1/11)/5,
            100*(1/16+1/15+1/14+1/13+1/12)/5
          ],
          type: 'line',
          name: 'countrya'
        }],
        xAxis: {
          categories: ['6 Mar', '7 Mar','8 Mar', '9 Mar','10 Mar', '11 Mar','12 Mar', '13 Mar','14 Mar', '15 Mar','16 Mar', '17 Mar', '18 Mar']
        },
        yAxis: {
          max: 50,
          title: {
            text: 'Percentage increase, 5-day moving average'
          }
        }
      }
    );
  });

  it('filtered dates', () => {
    const service: InfectionRateIncreaseService = TestBed.get(InfectionRateIncreaseService);
    let chartOptions: Highcharts.Options = service.createChartOptions(["countrya"], 12, "title1", 5);
    expect(chartOptions).toEqual({
        title: {
          text: 'title1'
        },
        series: [{
          data: [
            100*(1/10+1/9+1/8+1/7+1/6)/5,
            100*(1/11+1/10+1/9+1/8+1/7)/5,
            100*(1/12+1/11+1/10+1/9+1/8)/5,
            100*(1/13+1/12+1/11+1/10+1/9)/5,
            100*(1/14+1/13+1/12+1/11+1/10)/5,
            100*(1/15+1/14+1/13+1/12+1/11)/5,
            100*(1/16+1/15+1/14+1/13+1/12)/5
          ],
          type: 'line',
          name: 'countrya'
        }],
        xAxis: {
          categories: ['11 Mar','12 Mar', '13 Mar','14 Mar', '15 Mar','16 Mar', '17 Mar', '18 Mar']
        },
        yAxis: {
          max: 50,
          title: {
            text: 'Percentage increase, 5-day moving average'
          }
        }
      }
    );
  });
});
