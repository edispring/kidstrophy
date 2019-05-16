import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';

import '../models/kid';
import { Category, currentYear, seconds, minutes, millis } from '../config';

const Kid = mongoose.model('Kid');

export function index(req, res, next) {

    return Promise.resolve()
        .then(() => {
            console.log("req.params", req.params);
            if (req.params.id)
                return Kid.findById(req.params.id)
        })
        .then(kid => {
            console.log("kid", kid);
            res.render('index', { title: 'Kidstrophy ' + currentYear, categories: Category, kid: kid || { runs: [{}, {}] }, minutes: minutes, seconds: seconds, millis });
        });
}
