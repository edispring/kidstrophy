import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';

import '../models/kid';

const Kid = mongoose.model('Kid');
mongoose.Promise = Promise;

export function createRun(req, res, next) {
  return Promise.resolve()
    .then(() => {
      console.log('create-run', req.body);
      const result = req.body
      const kid: any = { firstName: result.firstName, lastName: result.lastName, category: +result.category, runs: [] };

      const runs = _.keysIn(result).reduce((p, c, i) => {
        const [stage, run] = c.split('-');
        if (run === 'run1')
          p[0][stage] = +result[c];
        else if (run === 'run2')
          p[1][stage] = +result[c];

        return p;
      }, [{}, {}]);

      if (!_.isEmpty(runs[0])) {
        runs[0].number = 1;
        kid.runs.push(runs[0]);
      }

      if (!_.isEmpty(runs[1])) {
        runs[1].number = 2;
        kid.runs.push(runs[1]);
      }

      return kid;
    })
    .then(kid => {
      return Kid.findOneAndUpdate({ firstName: kid.firstName, lastName: kid.lastName, category: +kid.category }, kid, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    })
    .then((result) => {
      //console.log('create-run save result', result);
      res.redirect('/');
    })
    .catch((e) => {
      console.error('create-run', e);
      res.render('index', { title: 'Kidstrophy 2017', error: '' + e });
    })
    .finally(() => {
      //next();
    });
}
