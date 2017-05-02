import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as json2csv from 'json2csv';

const fields = ['id', 'firstName', 'lastName', 'category', 'year', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6'];

const Kid = mongoose.model('Kid');

import '../models/kid';
import { Category, currentYear, categoryValues } from '../config';

export function rankingExport(req, res, next) {
    return Promise.resolve()
        .then(() => Kid.find())
        .then(list => {
            //console.log('list', list);

            const ranks = list.reduce((p, c, i) => {

                const currentRuns = c.runs.filter(x => x.year === currentYear)

                const runCount = currentRuns.length;
                if (runCount < 1) return p;

                const rank: any = {};
                p.push(rank);

                rank.id = c._id;
                rank.firstName = c.firstName;
                rank.lastName = c.lastName;
                rank.category = Category[c.category];
                rank.year = currentYear;

                rank.stage1 = _.minBy(currentRuns.filter(x => x.stage1 > 0), 'stage1').stage1 || 1000;
                rank.stage2 = _.maxBy(currentRuns.filter(x => x.stage2 > 0), 'stage2').stage2;
                rank.stage3 = _.minBy(currentRuns.filter(x => x.stage3 > 0), 'stage3').stage3 || 1000;
                rank.stage4 = _.maxBy(currentRuns.filter(x => x.stage4 > 0), 'stage4').stage4;
                rank.stage5 = _.minBy(currentRuns.filter(x => x.stage5 > 0), 'stage5').stage5 || 1000;
                rank.stage6 = _.minBy(currentRuns.filter(x => x.stage6 > 0), 'stage6').stage6 || 1000;

                return p;
            }, []);

            return ranks;
        })
        .then(ranks => {
            var result = json2csv({ data: ranks, fields: fields });
            res.set('Content-Type', 'text/csv');
            res.set('Content-Disposition', 'attachment; filename="export.csv"');
            res.status(200).send(result);
        });
}

