import * as _ from "lodash";

export enum Category {
  "W Piccolo (3-6)",
  "W Mini (7-8)",
  "W Midi (9-10)",
  "W Maxi (ab 11)",
  "M Piccolo (3-6)",
  "M Mini (7-8)",
  "M Midi (9-10)",
  "M Maxi (ab 11)",
}

export const categoryValues = _.keysIn(Category).filter((k) => k == 0 || +k);
export const currentYear = new Date().getFullYear();

export const dbConnection =
  "mongodb+srv://kidstrophy:sVNcMN2HNGh1RHyTKsU0@cluster0.axqut.mongodb.net/kidstrophy?retryWrites=true&w=majority";
//   "mongodb://kidstrophy:sVNcMN2HNGh1RHyTKsU0@ds029381.mlab.com:29381/kidstrophy";

export const minutes = (m) => (m ? Math.floor(m / 60) : "");
export const seconds = (m) => (m ? Math.floor(m % 60) : 0);
export const millis = (m) =>
  m ? ("" + Math.floor((m % 1) * 100)).padStart(2, "0") : 0;
