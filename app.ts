import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const logger = require('morgan');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || '30000';

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/notes', notesRouter);

app.use((req: Request, res: Response) => {
  res.status(StatusCodes.FORBIDDEN).send('Forbidden');
});

app.use((err: any, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.render('error');
});

const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.crt'),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
