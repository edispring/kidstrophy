import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';

const Kid = mongoose.model('Kid');

import '../models/kid';
import { Category, currentYear, categoryValues } from '../config';

export function ranking(req, res, next) {
    return Promise.resolve()
        .then(() => Kid.find())
        .then(list => {
            // console.log('list', list);

            const resultsPerCategory = calculateRanks(list);

            //console.log('resultsPerCategory', resultsPerCategory);

            res.render('ranking', { title: 'Kidstrophy ' + currentYear, categories: Category, resultsPerCategory: resultsPerCategory || [] });
        })
        .catch((e) => {
            console.error('ranking', e);
            res.render('ranking', { title: 'Kidstrophy ' + currentYear, error: '' + e });
        })
}

export function calculateRanks(list) {
    const ranks = list.reduce((p, c, i) => {

        const currentRuns = c.runs.filter(x => x.year === currentYear)

        const runCount = currentRuns.length;
        if (runCount < 1) return p;

        const rank: any = {};
        p.push(rank);

        rank.id = c._id;
        rank.firstName = c.firstName;
        rank.lastName = c.lastName;
        rank.category = c.category;
        rank.year = currentYear;

        rank.stage1 = _.maxBy(currentRuns.filter(x => x.stage1 > 0).map(x => x.stage1)) || 1000;
        rank.stage2 = _.minBy(currentRuns.filter(x => x.stage2 > 0).map(x => x.stage2)) || 0;
        rank.stage3 = _.minBy(currentRuns.filter(x => x.stage3 > 0).map(x => x.stage3)) || 1000;
        rank.stage4 = _.minBy(currentRuns.filter(x => x.stage4 > 0).map(x => x.stage4)) || 0;
        rank.stage5 = _.maxBy(currentRuns.filter(x => x.stage5 > 0).map(x => x.stage5)) || 1000;
        rank.stage6 = _.minBy(currentRuns.filter(x => x.stage6 > 0).map(x => x.stage6)) || 1000;

        return p;
    }, []);

    //console.log('ranks', ranks);

    const categories = _.groupBy(ranks, 'category');

    const topResultsPerCategory = categoryValues.map(category => {

        const ranksPerCategory = categories[category];

        if (!ranksPerCategory) return {};

        const topResults = ranksPerCategory.reduce((p, c, i) => {

            p.category = category;

            p.stage1 = _.max([+c.stage1, +p.stage1]);
            p.stage2 = _.min([+c.stage2, +p.stage2]);
            p.stage3 = _.min([+c.stage3, +p.stage3]);
            p.stage4 = _.min([+c.stage4, +p.stage4]);
            p.stage5 = _.max([+c.stage5, +p.stage5]);
            p.stage6 = _.min([+c.stage6, +p.stage6]);

            return p;
        }, {});

        return topResults;
    });

    console.log('topResultsPerCategory', topResultsPerCategory);

    const resultsPerCategory = categoryValues.map(category => {

        const ranksPerCategory = categories[category];
        if (!ranksPerCategory) return {};

        const topResult = _.find(topResultsPerCategory, c => c.category === category);

        const results = ranksPerCategory.map(r => {

            r.points1 = Math.floor(r.stage1 / topResult.stage1 * 1000);
            r.points2 = Math.floor(topResult.stage2 / r.stage2 * 1000);
            r.points3 = Math.floor(topResult.stage3 / r.stage3 * 1000);
            r.points4 = Math.floor(topResult.stage4 / r.stage4 * 1000);
            r.points5 = Math.floor(r.stage5 / topResult.stage5 * 1000);
            r.points6 = Math.floor(topResult.stage6 / r.stage6 * 1000);

            r.points = r.points1 + r.points2 + r.points3 + r.points4 + r.points5 + r.points6;

            return r;
        });

        return _.orderBy(results, ['points'], ['desc']);
    });

    return resultsPerCategory;
}