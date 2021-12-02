import { Router } from 'express';
const  { getInfo } = require('../Controllers/info.controller');

const router = Router();

router.get('/', getInfo);

module.exports = router;