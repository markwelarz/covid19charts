import { Country } from '../model/country';
import { InfectionCount } from '../model/infection-count';

export class MockCountryData {

  public static mockCountryData(): Country[] {
    const countrya: Country = new Country('countrya', [
        new InfectionCount(new Date(2020, 2, 1), 4),
        new InfectionCount(new Date(2020, 2, 2), 5),
        new InfectionCount(new Date(2020, 2, 3), 6),
        new InfectionCount(new Date(2020, 2, 4), 7),
        new InfectionCount(new Date(2020, 2, 5), 10),
        new InfectionCount(new Date(2020, 2, 6), 11),
        new InfectionCount(new Date(2020, 2, 7), 12),
        new InfectionCount(new Date(2020, 2, 8), 50)],

        [
        new InfectionCount(new Date(2020, 2, 1), 0),
        new InfectionCount(new Date(2020, 2, 2), 1),
        new InfectionCount(new Date(2020, 2, 3), 1),
        new InfectionCount(new Date(2020, 2, 4), 1),
        new InfectionCount(new Date(2020, 2, 5), 3),
        new InfectionCount(new Date(2020, 2, 6), 1),
        new InfectionCount(new Date(2020, 2, 7), 1),
        new InfectionCount(new Date(2020, 2, 8), 38)]
        );

    const countryb: Country = new Country('countryb', [
        new InfectionCount(new Date(2020, 2, 1), 4),
        new InfectionCount(new Date(2020, 2, 2), 10),
        new InfectionCount(new Date(2020, 2, 3), 6),
        new InfectionCount(new Date(2020, 2, 4), 7),
        new InfectionCount(new Date(2020, 2, 5), 10),
        new InfectionCount(new Date(2020, 2, 6), 11),
        new InfectionCount(new Date(2020, 2, 7), 12),
        new InfectionCount(new Date(2020, 2, 8), 13)],
        [
            new InfectionCount(new Date(2020, 2, 1), 0),
            new InfectionCount(new Date(2020, 2, 2), 6),
            new InfectionCount(new Date(2020, 2, 3), -4),
            new InfectionCount(new Date(2020, 2, 4), 1),
            new InfectionCount(new Date(2020, 2, 5), 1),
            new InfectionCount(new Date(2020, 2, 6), 3),
            new InfectionCount(new Date(2020, 2, 7), 1),
            new InfectionCount(new Date(2020, 2, 8), 1)]
        );
    
    return [countrya, countryb];
    }

    public static mockCountryData2(): Country[] {
        const countrya: Country = new Country('countrya', [
            new InfectionCount(new Date(2020, 2, 1), 1),
            new InfectionCount(new Date(2020, 2, 2), 2),
            new InfectionCount(new Date(2020, 2, 3), 3),
            new InfectionCount(new Date(2020, 2, 4), 4),
            new InfectionCount(new Date(2020, 2, 5), 5),
            new InfectionCount(new Date(2020, 2, 6), 6),
            new InfectionCount(new Date(2020, 2, 7), 7),
            new InfectionCount(new Date(2020, 2, 8), 8),
            new InfectionCount(new Date(2020, 2, 9), 9),
            new InfectionCount(new Date(2020, 2, 10), 10),
            new InfectionCount(new Date(2020, 2, 11), 11),
            new InfectionCount(new Date(2020, 2, 12), 12),
            new InfectionCount(new Date(2020, 2, 13), 13),
            new InfectionCount(new Date(2020, 2, 14), 14),
            new InfectionCount(new Date(2020, 2, 15), 15),
            new InfectionCount(new Date(2020, 2, 16), 16),
            new InfectionCount(new Date(2020, 2, 17), 17),
            new InfectionCount(new Date(2020, 2, 18), 18)],
            [
                new InfectionCount(new Date(2020, 2, 1), 0),
                new InfectionCount(new Date(2020, 2, 2), 1),
                new InfectionCount(new Date(2020, 2, 3), 1),
                new InfectionCount(new Date(2020, 2, 4), 1),
                new InfectionCount(new Date(2020, 2, 5), 1),
                new InfectionCount(new Date(2020, 2, 6), 1),
                new InfectionCount(new Date(2020, 2, 7), 1),
                new InfectionCount(new Date(2020, 2, 8), 1),
                new InfectionCount(new Date(2020, 2, 9), 1),
                new InfectionCount(new Date(2020, 2, 10), 1),
                new InfectionCount(new Date(2020, 2, 11), 1),
                new InfectionCount(new Date(2020, 2, 12), 1),
                new InfectionCount(new Date(2020, 2, 13), 1),
                new InfectionCount(new Date(2020, 2, 14), 1),
                new InfectionCount(new Date(2020, 2, 15), 1),
                new InfectionCount(new Date(2020, 2, 16), 1),
                new InfectionCount(new Date(2020, 2, 17), 1),
                new InfectionCount(new Date(2020, 2, 18), 1)]
            );
        return [countrya];
        }        
}
