import '@database';
import '@utils/eventHandler';
import express, { Request, Response } from 'express';
import middleware from '@middleware/commons.middleware';
import APIRoutes from '@routes/index.route';
import { PORT, NODE_ENV } from '@config';
import welcomePage from '@utils/welcomePage';
import page404 from '@utils/404Page';

const app = express();

// middleware
middleware(app);

// API

app.get('/', (_req: Request, res: Response) => res.send(welcomePage));
app.use('/api/v1', APIRoutes);
app.use('/*', (req: Request, res: Response) => res.send(page404(req.originalUrl)));
// if in production mode than use the cluster mode

if (NODE_ENV === 'prod'){
    const cluster = require('cluster');

    if (cluster.isMaster) {
        require('os')
            .cpus().forEach(() => cluster.fork());
    } else {
        app.listen(PORT, () => {
            //eslint-disable-next-line  no-console

            console.log(`Server is running in ${NODE_ENV} mode on port${PORT}`);

        });
    }
} else {
    app.listen(PORT, () => {
        // eslint-disable-next-line  no-console
        console.log(`server is runnig on ${NODE_ENV} mode on port ${PORT}`);
    });
}