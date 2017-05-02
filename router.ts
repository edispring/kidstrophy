import { index } from './routes/index';
import { createRun } from './routes/create-run';
import { ranking } from './routes/ranking';

export function router(app) {
    app.get('/', index);
    app.post('/create-run', createRun);
    app.get('/ranking', ranking);
    app.get('/:id', index);
}