import * as _ from 'lodash';

export enum Category {
    'Piccolo Maedchen (3-6)',
    'Piccolo Knaben (3-6)',
    'Mini Maedchen (7-8)',
    'Mini Knaben (7-8)',
    'Midi Maedchen (9-10)',
    'Midi Knaben (9-10)',
    'Maxi Maedchen (11-13)',
    'Maxi Knaben (11-13)'
}

export const categoryValues = _.keysIn(Category).filter(k=> k==0 || +k);

export const currentYear = 2016; // new Date().getFullYear();

export const dbConnection = 'mongodb://kidstrophy:sVNcMN2HNGh1RHyTKsU0@ds029381.mlab.com:29381/kidstrophy';

export const minutes = m => m ? Math.floor(m / 60) : '';
export const seconds = m => m ? (m % 60) : '';