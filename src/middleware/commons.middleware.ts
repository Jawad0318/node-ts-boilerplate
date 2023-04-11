
import { Application } from './../../node_modules/@types/express-serve-static-core/index.d';
import logger from 'morgan';

import cors from 'cors';

import { NODE_ENV } from '@config';
import express from 'express';

// common middleware
export default function middleware(app: Application): void{
    app.use(cors({ origin: NODE_ENV === 'prod' ? process.env.ORIGIN : true, credentials: true }));  
    app.use(logger('dev'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/uploads', express.static('uploads', { maxAge: '31536000' }));
    
}