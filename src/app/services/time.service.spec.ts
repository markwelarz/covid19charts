import { TestBed } from '@angular/core/testing';

import { TimeService } from './time.service';
import { Covid19dataService } from './covid19data.service';
import { MockCountryData } from '../test/mock.country.data';

describe('TimeService', () => {

  let mockCovid19dataService: Partial<Covid19dataService> = {
    get covidData() {
      return MockCountryData.mockCountryData();
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule(
    {
      providers: [
        {provide : Covid19dataService, useValue: mockCovid19dataService}
      ]
    })
  });

  it('should be created', () => {
    const service: TimeService = TestBed.get(TimeService);
    expect(service).toBeTruthy();
  });

  it('indexOfStartDate', () => {
    const service: TimeService = TestBed.get(TimeService);
    expect(service.indexOfStartDate(['countrya', 'countryb'], 10)).toEqual(1);
  });

  it('indexOfStartDate minimum-cases when a country does not have that number', () => {
    const service: TimeService = TestBed.get(TimeService);
    expect(service.indexOfStartDate(['countrya', 'countryb'], 45)).toEqual(7);
  });

  it('formattedDateInRange', () => {
    const service: TimeService = TestBed.get(TimeService);
    expect(service.formattedDateInRange(4)).toEqual(['5 Mar','6 Mar','7 Mar', '8 Mar']);
  });
});
