import { serverPort } from './src/helpers';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { notesRouter } from './src/routes/notesRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/notes', notesRouter);

app.use((req: Request, res: Response) => {
  res.status(403).send('Forbidden');
});

app.use((err: any, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err?.status || 500);
  res.render('error');
});

app.listen(serverPort, () => {
  console.log(`Server is listening on port ${serverPort}`);
});

process.on('uncaughtException', (err: Error) => {
  console.error('Server uncaught exception', err.message);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('Server unhandled rejection', err.message);
});
