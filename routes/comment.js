const express= require('express');
const router = express.Router();
router.use(express.urlencoded());
const passport = require('passport');

const commentController = require('../controllers/comment');

router.post('/create', passport.checkAuthentication,commentController.create);

router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports= router;