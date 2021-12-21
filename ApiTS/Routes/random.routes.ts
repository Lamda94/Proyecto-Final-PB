import {Router} from 'express'; 
const processController = require('../controllers/process.controller');

const processRouter = Router();

processRouter.get('/', processController.process);

module.exports = processRouter;