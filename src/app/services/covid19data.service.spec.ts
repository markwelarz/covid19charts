import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { Covid19dataService, COVID19_DATA_URL } from './covid19data.service';
import { Country } from '../model/country';
import { InfectionCount } from '../model/infection-count';

describe('Covid19dataService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports : [
      HttpClientTestingModule
    ],
    providers : [
      {provide : COVID19_DATA_URL , useValue : 'testdata.csv'}
    ]
  }));

  it('should be created', () => {
    const service: Covid19dataService = TestBed.get(Covid19dataService);
    expect(service).toBeTruthy();
  });

  it('load with 2 date fields', (done : DoneFn) => {
    const service: Covid19dataService = TestBed.get(Covid19dataService);
    httpTestingController = TestBed.get(HttpTestingController);
    service.load();

    const req=httpTestingController.expectOne('testdata.csv');
    expect(req.request.method).toEqual('GET');
    getData('testdata_2fields.csv').then(dataString => {
      req.flush(dataString);

      expect(service.covidData).toEqual([
          new Country('Mars', 
          [new InfectionCount(new Date(2020,1-1,22), 4), new InfectionCount(new Date(2020,1-1,23), 6)],
          [new InfectionCount(new Date(2020,1-1,22), 0), new InfectionCount(new Date(2020,1-1,23), 2)]),
          new Country('Jupiter', 
          [new InfectionCount(new Date(2020,1-1,22), 5), new InfectionCount(new Date(2020,1-1,23), 6)],
          [new InfectionCount(new Date(2020,1-1,22), 0), new InfectionCount(new Date(2020,1-1,23), 1)])
        ]);

        done();
    });
  });

  it('load with 4 date fields', (done : DoneFn) => {
    const service: Covid19dataService = TestBed.get(Covid19dataService);
    httpTestingController = TestBed.get(HttpTestingController);
    service.load();

    const req=httpTestingController.expectOne('testdata.csv');
    expect(req.request.method).toEqual('GET');
    getData('testdata_4fields.csv').then(dataString => {
      req.flush(dataString);

      expect(service.covidData).toEqual([
          new Country('Mars',
          [new InfectionCount(new Date(2020,1-1,22), 4), new InfectionCount(new Date(2020,1-1,23), 6), new InfectionCount(new Date(2020,12-1,12), 14), new InfectionCount(new Date(2020,10-1,1), 18)],
          [new InfectionCount(new Date(2020,1-1,22), 0), new InfectionCount(new Date(2020,1-1,23), 2), new InfectionCount(new Date(2020,12-1,12), 8), new InfectionCount(new Date(2020,10-1,1), 4)]),
          new Country('Jupiter',
          [new InfectionCount(new Date(2020,1-1,22), 5), new InfectionCount(new Date(2020,1-1,23), 6),new InfectionCount(new Date(2020,12-1,12), 87), new InfectionCount(new Date(2020,10-1,1), 3)],
          [new InfectionCount(new Date(2020,1-1,22), 0), new InfectionCount(new Date(2020,1-1,23), 1),new InfectionCount(new Date(2020,12-1,12), 81), new InfectionCount(new Date(2020,10-1,1), -84)])
        ]);

        done();
    });
  });

  it('load with disjointed date fields', (done : DoneFn) => {
    const service: Covid19dataService = TestBed.get(Covid19dataService);
    httpTestingController = TestBed.get(HttpTestingController);
    service.load();

    const req=httpTestingController.expectOne('testdata.csv');
    expect(req.request.method).toEqual('GET');
    getData('testdata_disjointed_fields.csv').then(dataString => {
      req.flush(dataString);

      expect(service.covidData).toEqual([
          new Country('Mars', 
          [new InfectionCount(new Date(2020,1-1,22), 3), new InfectionCount(new Date(2020,1-1,23), 2)],
          [new InfectionCount(new Date(2020,1-1,22), 0), new InfectionCount(new Date(2020,1-1,23), -1)]),
          new Country('Jupiter',
          [new InfectionCount(new Date(2020,1-1,22), 1), new InfectionCount(new Date(2020,1-1,23), 2)],
          [new InfectionCount(new Date(2020,1-1,22), 0), new InfectionCount(new Date(2020,1-1,23), 1)]),
          new Country('Neptune', 
          [new InfectionCount(new Date(2020,1-1,22), 0), new InfectionCount(new Date(2020,1-1,23), 0)],
          [new InfectionCount(new Date(2020,1-1,22), 0), new InfectionCount(new Date(2020,1-1,23), 0)])
        ]);

        done();
    });
  });


  async function getData(csvFilename : string): Promise<string> {
    const response : Response = await fetch(`test-assets/${csvFilename}`);
    return response.text();
  }

  describe('isDateField tests', () => {
    it('isDateField', () => {
      const service: Covid19dataService = TestBed.get(Covid19dataService);
      expect(service.isDateField('12/12/19')).toBeTruthy();
      expect(service.isDateField('1/22/20')).toBeTruthy();
      expect(service.isDateField('2/1/20')).toBeTruthy();
      expect(service.isDateField('12/1/20')).toBeTruthy();
      expect(service.isDateField('1/1/20')).toBeTruthy();
      expect(service.isDateField('test')).toBeFalsy();
      expect(service.isDateField('12')).toBeFalsy();
      expect(service.isDateField('12/44/233')).toBeFalsy();
    });
  });
});
