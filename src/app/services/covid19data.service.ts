import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa, ParseResult } from 'ngx-papaparse';
import { Country } from '../model/country';
import { InfectionCount } from '../model/infection-count';
import { parse } from 'ts-date/esm/locale/en';
import { tap } from 'rxjs/operators';

export const COVID19_DATA_URL = new InjectionToken<string>('covid19DataUrl');

@Injectable({
  providedIn: 'root'
})
export class Covid19dataService {

  private _covidData: Country[];

  constructor(private httpClient: HttpClient, private papa: Papa, @Inject(COVID19_DATA_URL) private url: string) { }

  public load(): Promise<string> {
     return this.httpClient.get(this.url, {responseType : 'text'}).pipe(
       tap(csvData => {
       const parseResult: ParseResult = this.papa.parse(csvData, {header : true});
       let typed: Country[] = parseResult.data.map(csvRow => {
         let infectionCounts: InfectionCount[] = Object.keys(csvRow)
           .filter(headerColumn => this.isDateField(headerColumn))
           .map(dateHeader =>  new InfectionCount(parse(dateHeader, 'M/D/YY'), parseInt(csvRow[dateHeader]) || 0));

         return new Country(csvRow['Country/Region'], infectionCounts);
       });
    
       this._covidData = typed.reduce(this.combineCountryData, []);
     })).toPromise();
  }

  public combineCountryData = (accumulator : Country[], currentValue : Country) => {
    const aggregatedCountryEntry: Country = accumulator.find(country => country.name === currentValue.name);
    if(aggregatedCountryEntry) {
      for(const infectionCount of currentValue.infectionCount) {
        const dayIndex: number = aggregatedCountryEntry.infectionCount.findIndex(ic => ic.when.getTime() === infectionCount.when.getTime());
        if(dayIndex >= 0) {
          aggregatedCountryEntry.infectionCount[dayIndex] = aggregatedCountryEntry.infectionCount[dayIndex].combine(infectionCount);
        }
        else {
          aggregatedCountryEntry.infectionCount.push(infectionCount);
        }
      }
    }
    else {
      accumulator.push(currentValue);
    }
    return accumulator;
  }

  public isDateField(columnName: string): boolean {
    return !!parse(columnName, 'M/D/YY');
  }

  get covidData() {
    return this._covidData;
  }
}
