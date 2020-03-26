import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DailyNewInfectionsService } from '../../services/daily-new-infections.service';
import { DailyNewInfectionsAdjustedTimeService } from '../../services/daily-new-infections-adjusted-time.service';

@Component({
  selector: 'offset-time-comparison',
  templateUrl: './offset-time-comparison.component.html',
  styleUrls: ['./offset-time-comparison.component.scss']
})
export class OffsetTimeComparison implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  @Input()
  public startWhenCasesAtLeast : number;
  @Input()
  public countries: string[]
  @Input()
  public title: string;

  constructor(private dailyNewInfectionsAdjustedTimeService: DailyNewInfectionsAdjustedTimeService) { }

  ngOnInit() {
    this.chartOptions = this.dailyNewInfectionsAdjustedTimeService.createChartOptions(this.countries, this.startWhenCasesAtLeast, this.title);
  }
}
