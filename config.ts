import * as _ from 'lodash';

export enum Category {
    'Maedchen Piccolo (3-6)',
    'Knaben Piccolo (3-6)',
    'Maedchen I (7-8)',
    'Knaben I (7-8)',
    'Maedchen II (9-10)',
    'Knaben II (9-10)',
    'Maedchen III (11-13)',
    'Knaben III (11-13)'
}

export const categoryValues = _.keysIn(Category).filter(k=> k==0 || +k);

export const currentYear = 2016; // new Date().getFullYear();

export const dbConnection = 'mongodb://kidstrophy:sVNcMN2HNGh1RHyTKsU0@ds029381.mlab.com:29381/kidstrophy';

export const minutes = m => m ? Math.floor(m / 60) : '';
export const seconds = m => m ? (m % 60) : '';