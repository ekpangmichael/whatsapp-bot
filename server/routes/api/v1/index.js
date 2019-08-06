import { Router } from 'express';
import botRouter from './whatsappbot';


const v1Router = Router();
v1Router.use('/api/v1', botRouter);




export default v1Router;