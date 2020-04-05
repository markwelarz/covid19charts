import { Injectable } from '@angular/core';
import { format } from 'ts-date/esm/locale/en';
import { Covid19dataService } from './covid19data.service';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private covid19dataService: Covid19dataService) { }

  public indexOfStartDate(countries: string[], startWhenCasesAtLeast: number): number {
    let startIndexesPerCountry = countries.map(v => this.indexOfStartDateFor(v, startWhenCasesAtLeast))
     .filter(v => v >= 0);
    return Math.min(...startIndexesPerCountry);
  }

  private indexOfStartDateFor(countryName: string, startWhenCasesAtLeast: number): number {
    let countryData: Country = this.covid19dataService.covidData.find(v => v.name === countryName);
    let startIndex = countryData.infectionCount.findIndex(v => v.amount >= startWhenCasesAtLeast);
    return startIndex;
  }

  public formattedDateInRange(startAt: number): string[] {
    return this.covid19dataService.covidData[0].infectionCount
      .filter((v, i) => i >= startAt)
      .map(v => v.when)
      .map(v => format(v, 'D MMM'));
  }
}
