import { Injectable } from '@angular/core';
import { Covid19dataService } from './covid19data.service';
import { TimeService } from './time.service';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class InfectionRateIncreaseService {

  constructor(private covid19dataService: Covid19dataService, private timeService: TimeService) { }

  public createChartOptions(countries: string[], startWhenCasesAtLeast: number, title: string, averageOver: number): Highcharts.Options {
    let startIndex: number = this.timeService.indexOfStartDate(countries, startWhenCasesAtLeast);
    let countrySeries: Highcharts.SeriesLineOptions[] = countries.map(v => this.seriesForCountry(v, startIndex, averageOver));
    return {
      title: {text: title},
      series: countrySeries,
      xAxis: {
        categories: this.timeService.formattedDateInRange(this.startAtDay(startIndex, averageOver) - 1)
      },
      yAxis: {
        max: 50,
        title: {
          text: 'Percentage increase, 5-day moving average'
        }
      }
    };
  }

  private seriesForCountry(countryName: string, startAt: number, averageOver: number): Highcharts.SeriesLineOptions {
    const countryData: Country = this.covid19dataService.covidData.find(v => v.name === countryName);
    const firstDataPoint: number = this.startAtDay(startAt, averageOver);
    const infectionCounts: number[] = countryData.infectionCount
      .map(v => v.amount)
      .map(this.percentageIncreaseOverPrevious)
      .map((v, i, array) => this.averageOverWindow(i, array, averageOver))
      .filter((v, i) => i >= firstDataPoint);

    const countrySeries: Highcharts.SeriesLineOptions = {
      data: infectionCounts,
      type: 'line',
      name: countryData.name,
    };
    return countrySeries;
  }

  private percentageIncreaseOverPrevious(infectionAmount: number, i : number, array: number[]): number {
    if(i === 0) return 0;
    return 100 * ((array[i] - array[i - 1]) /  array[i - 1]);
  }

  private averageOverWindow(i : number, array: number[], averageOver: number): number {
    if(i < averageOver) return 0;
    return array.slice(i - averageOver, i).reduce((v1, v2) => v1 + v2) / averageOver;
  }

  private startAtDay(startAt: number, averageOver: number): number {
    return Math.max(startAt, averageOver + 1)
  }
}
