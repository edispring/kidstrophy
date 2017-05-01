import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';

import '../models/kid';

const Kid = mongoose.model('Kid');
mongoose.Promise = Promise;

export function createRun(req, res, next) {
  return Promise.resolve()
    .then(() => {
      console.log('create-run', req.body);
      const result = req.body
      const kid: any = new Kid(result);
      kid.runs.push({ stage1: 2.2, stage2: 3 });

      return kid.save();
    })
    .then((result) => {
      console.log('create-run save result', result);
      res.redirect('/');
    })
    .catch((e) => {
      console.error('create-run',e);
      res.render('index', { title: 'Kidstrophy 2017', error: e.message });
    })
    .finally(() => {
      //next();
    });
}
