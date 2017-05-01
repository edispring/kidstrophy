import { index } from './routes/index';
import { createRun } from './routes/create-run';

export function router(app) {
    app.get('/', index);
    app.post('/create-run', createRun);
}