import { index } from './routes/index';
import { createRun } from './routes/create-run';
import { ranking } from './routes/ranking';
import { rankingExport } from './routes/export';

export function router(app) {
    app.get('/', index);
    app.post('/create-run', createRun);
    app.get('/ranking', ranking);
    app.get('/export', rankingExport);
    app.get('/:id', index);
}