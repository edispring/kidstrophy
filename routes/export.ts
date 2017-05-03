import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as json2csv from 'json2csv';

const fields = ['id', 'firstName', 'lastName', 'category', 'year', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'points1', 'points2', 'points3', 'points4', 'points5', 'points6', 'points'];

const Kid = mongoose.model('Kid');

import '../models/kid';
import { Category, currentYear, categoryValues } from '../config';
import { calculateRanks } from './ranking';

export function rankingExport(req, res, next) {
    return Promise.resolve()
        .then(() => Kid.find())
        .then(list => {
            //console.log('list', list);

            
            const resultsPerCategory = calculateRanks(list);
            var result = json2csv({ data: _.flatten(resultsPerCategory), fields: fields });
            res.set('Content-Type', 'text/csv');
            res.set('Content-Disposition', 'attachment; filename="export.csv"');
            res.status(200).send(result);
        });
}

