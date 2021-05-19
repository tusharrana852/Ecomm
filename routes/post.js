const express= require('express');
const router = express.Router();
router.use(express.urlencoded());
const passport = require('passport');

const postController = require('../controllers/post');


router.post('/create', passport.checkAuthentication,postController.create);

module.exports =router;