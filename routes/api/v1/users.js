const express= require('express');
const router = express.Router();

const createSession = require('../../../controllers/api/v1/users_api')

router.post('/create-session', createSession.createSession);

module.exports = router;