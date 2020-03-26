import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DailyNewInfectionsAdjustedTimeService } from '../../services/daily-new-infections-adjusted-time.service';
import { InfectionRateIncreaseService } from '../../services/infection-rate-increase.service';

@Component({
  selector: 'rate-of-change-comparison',
  templateUrl: './rate-of-change-comparison.component.html',
  styleUrls: ['./rate-of-change-comparison.component.scss']
})
export class RateOfChangeComparisonComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  @Input()
  public startWhenCasesAtLeast : number;
  @Input()
  public countries: string[]
  @Input()
  public title: string;

  constructor(private infectionRateIncreaseService: InfectionRateIncreaseService) { }

  ngOnInit() {
    this.chartOptions = this.infectionRateIncreaseService.createChartOptions(this.countries, this.startWhenCasesAtLeast, this.title, 5);
  }
}
