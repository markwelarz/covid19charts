import { Injectable } from '@angular/core';
import { Covid19dataService } from './covid19data.service';
import { TimeService } from './time.service';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class DailyNewInfectionsAdjustedTimeService {

  constructor(private covid19dataService: Covid19dataService, private timeService: TimeService) { }

  public createChartOptions(countries: string[], startWhenCasesAtLeast: number, title: string): Highcharts.Options {
    let countrySeries: Highcharts.SeriesLineOptions[] = countries.map(v => this.seriesForCountry(v, startWhenCasesAtLeast));
    return {
      title: {text: title},
      series: countrySeries,
      xAxis: {
        title: {
          text: `Days since ${startWhenCasesAtLeast} infections`
        },
        categories: this.daysSinceCategories(countrySeries)
      }
    };
  }

  private daysSinceCategories(countrySeries: Highcharts.SeriesLineOptions[]): string[] {
    const sizeOfEachSeries: number[] = countrySeries.map(v => v.data.length);
    const maxSize: number = Math.max(...sizeOfEachSeries); 
    let daysSince: string[] = [];
    for(let i=0; i<maxSize; i++) {
      daysSince.push(i.toString());
    }
    return daysSince;
  }
  
  private seriesForCountry(countryName: string, startWhenCasesAtLeast: number): Highcharts.SeriesLineOptions {
    let startIndex: number = this.timeService.indexOfStartDate([countryName], startWhenCasesAtLeast);
    let countryData: Country = this.covid19dataService.covidData.find(v => v.name === countryName);
    let infectionCounts: number[] = countryData.infectionCount
      .filter((v, i) => i >= startIndex)
      .map(v => v.amount);
    let countrySeries: Highcharts.SeriesLineOptions = {
      data: infectionCounts,
      type: 'line',
      name: countryData.name,
    };
    return countrySeries;
  }
}
