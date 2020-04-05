import { TestBed } from '@angular/core/testing';
import { DailyNewInfectionsService } from './daily-new-infections.service';
import { Covid19dataService } from './covid19data.service';
import { MockCountryData } from '../test/mock.country.data';
import { TimeService } from './time.service';

describe('DailyNewInfectionsService', () => {
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
    const service: DailyNewInfectionsService = TestBed.get(DailyNewInfectionsService);
    expect(service).toBeTruthy();
  });

  it('all countries, all dates', () => {
    const service: DailyNewInfectionsService = TestBed.get(DailyNewInfectionsService);
    let chartOptions: Highcharts.Options = service.createChartOptions(["countrya", "countryb"], 0, "title1");
    expect(chartOptions).toEqual({
        title: {
          text: 'title1'
        },
        series: [{
          data: [4,5,6,7,10,11,12,50],
          type: 'line',
          name: 'countrya'
        },
        {
          data: [4,10,6,7,10,11,12,13],
          type: 'line',
          name: 'countryb'
        }],
        xAxis: {
          categories: ['1 Mar', '2 Mar','3 Mar','4 Mar','5 Mar','6 Mar', '7 Mar', '8 Mar']
        }
      }
    );
  });

  it('filtered countries, filtered dates', () => {
    const service: DailyNewInfectionsService = TestBed.get(DailyNewInfectionsService);
    let chartOptions: Highcharts.Options = service.createChartOptions(["countryb"], 11, "title2");
    expect(chartOptions).toEqual({
      title: {
        text: 'title2'
      },
      series: [
        {
          data: [11,12,13],
          type: 'line',
          name: 'countryb'
        }],
        xAxis: {
          categories: ['6 Mar', '7 Mar', '8 Mar']
        }
      }
    );
  });

});
