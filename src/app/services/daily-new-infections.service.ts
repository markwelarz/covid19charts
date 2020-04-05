import { Injectable } from '@angular/core';
import { Covid19dataService } from './covid19data.service';
import { Country } from '../model/country';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class DailyNewInfectionsService {

  constructor(private covid19dataService: Covid19dataService, private timeService: TimeService) { }

  public createChartOptions(countries: string[], startWhenCasesAtLeast: number, title: string): Highcharts.Options {
    debugger;
    let startIndex: number = this.timeService.indexOfStartDate(countries, startWhenCasesAtLeast);
    let countrySeries: Highcharts.SeriesLineOptions[] = countries.map(v => this.seriesForCountry(v, startIndex));
    return {
      title: {text: title},
      series: countrySeries,
      xAxis: {
        categories: this.timeService.formattedDateInRange(startIndex)
      }
    };
  }
  
  private seriesForCountry(countryName: string, startAt: number): Highcharts.SeriesLineOptions {
    let countryData: Country = this.covid19dataService.covidData.find(v => v.name === countryName);
    let infectionCounts: number[] = countryData.infectionCount
      .filter((v, i) => i >= startAt)
      .map(v => v.amount);
    let countrySeries: Highcharts.SeriesLineOptions = {
      data: infectionCounts,
      type: 'line',
      name: countryData.name,
    };
    return countrySeries;
  }
}
