import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';

import '../models/kid';

const Kid = mongoose.model('Kid');
mongoose.Promise = Promise;
const currentYear = new Date().getFullYear();
import { Category } from '../models/category';

export function createRun(req, res, next) {
  const kid: any = { runs: [{}, {}] };
  return Promise.resolve()
    .then(() => {
      console.log('create-run', req.body);
      const result = req.body

      kid.firstName = result.firstName;
      kid.lastName = result.lastName;
      kid.category = +result.category;

      const runs = _.keysIn(result).reduce((p, c, i) => {
        const [stage, run, metric] = c.split('-');

        if (stage && run && metric && metric === 'sec')
          p[run][stage] = +result[c] + ((+result[stage + '-' + run + '-min'] || 0) * 60);
        else if (stage && run && metric && metric === 'points')
          p[run][stage] = +result[c];

        return p;
      }, [{}, {}]);

      if (!_.isEmpty(runs[0])) {
        runs[0].number = 1;
        runs[0].year = currentYear;
        _.assign(kid.runs[0], runs[0]);
      }

      if (!_.isEmpty(runs[1])) {
        runs[1].number = 2;
        runs[1].year = currentYear;
        _.assign(kid.runs[1], runs[1]);
      }

      return kid;
    })
    .then(kid => {
      const query = req.body.id ? { _id: req.body.id } : { firstName: kid.firstName, lastName: kid.lastName, category: +kid.category };
      return Kid.findOneAndUpdate(query, kid, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    })
    .then((result) => {
      //console.log('create-run save result', result);
      res.redirect('/');
    })
    .catch((e) => {
      console.error('create-run', e);
      res.render('index', { title: 'Kidstrophy ' + currentYear, error: '' + e, categories: Category, kid: kid, minutes: m => m ? Math.floor(m / 60) : '', seconds: m => m ? (m % 60) : '' });
    })
    .finally(() => {
      //next();
    });
}
