import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { orderRouter, productRouter } from './routes';
import errorMiddleware from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';
import { PORT, DB_ADDRESS } from './config';

const app = express();
mongoose.connect(DB_ADDRESS);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(requestLogger);

app.listen(PORT);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorMiddleware);
