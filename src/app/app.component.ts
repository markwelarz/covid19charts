import { Component, OnInit } from '@angular/core';
import { Config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public countriesLinearComparison() : string[] {
    return ["France", "United Kingdom", "Germany", "Spain", "Italy"];
  }

  public allCountriesLinearComparison() : string[] {
    return ["France", "United Kingdom", "Germany", "Spain", "Italy", "China", "US"];
  }

  public percentageComparison() : string[] {
    return ["France", "United Kingdom", "Germany", "Spain", "Italy", "China", "US"];
  }
}
