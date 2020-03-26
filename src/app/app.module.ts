import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { COVID19_DATA_URL, Covid19dataService } from './services/covid19data.service';
import { TimeComparisonComponent } from './charts/time-comparison/time-comparison.component';

import { HighchartsChartModule } from 'highcharts-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OffsetTimeComparison } from './charts/offset-time-comparison/offset-time-comparison.component';
import { RateOfChangeComparisonComponent } from './charts/rate-of-change-comparison/rate-of-change-comparison.component';

export function loadData(covid19dataService: Covid19dataService) {
  return () => covid19dataService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    TimeComparisonComponent,
    OffsetTimeComparison,
    RateOfChangeComparisonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HighchartsChartModule,
    NgbModule
  ],
  providers: [
    { provide : Covid19dataService, useClass: Covid19dataService},
    {
      provide: APP_INITIALIZER,
      useFactory: loadData,
      multi: true,
      deps: [Covid19dataService]
    },
    { provide: COVID19_DATA_URL, useValue: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
