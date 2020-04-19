import { Injectable } from '@angular/core';
import { Covid19dataService } from './covid19data.service';
import { Country } from '../model/country';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class DailyNewInfectionsService {

  constructor(private covid19dataService: Covid19dataService, private timeService: TimeService) { }

  public createChartOptions(countries: string[], startWhenCasesAtLeast: number, title: string, delta: boolean): Highcharts.Options {
    let startIndex: number = this.timeService.indexOfStartDate(countries, startWhenCasesAtLeast);
    let countrySeries: Highcharts.SeriesLineOptions[] = countries.map(v => this.seriesForCountry(v, startIndex, delta));

    // hack for France spike on 4 Apr
    let max: number = undefined;

    if(delta) {
      max = 10000;
    }

    return {
      title: {text: title},
      series: countrySeries,
      xAxis: {
        categories: this.timeService.formattedDateInRange(startIndex)
      },
      yAxis: {
        max: max
      }
    };
  }
  
  private seriesForCountry(countryName: string, startAt: number, delta: boolean): Highcharts.SeriesLineOptions {
    let countryData: Country = this.covid19dataService.covidData.find(v => v.name === countryName);
    let infectionCounts: number[] = (delta? countryData.deltaCount : countryData.infectionCount)
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
