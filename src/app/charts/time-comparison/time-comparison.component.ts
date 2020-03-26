import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Covid19dataService } from '../../services/covid19data.service';
import { DailyNewInfectionsService } from '../../services/daily-new-infections.service';

@Component({
  selector: 'time-comparison',
  templateUrl: './time-comparison.component.html',
  styleUrls: ['./time-comparison.component.scss']
})
export class TimeComparisonComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  @Input()
  public startWhenCasesAtLeast : number;
  @Input()
  public countries: string[]
  @Input()
  public title: string;

  constructor(private dailyNewInfectionsService: DailyNewInfectionsService) { }

  ngOnInit() {
    this.chartOptions = this.dailyNewInfectionsService.createChartOptions(this.countries, this.startWhenCasesAtLeast, this.title);
  }
}
