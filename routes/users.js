const express = require('express');
const router= express.Router();
router.use(express.urlencoded());
const passport= require('passport');
const cookieParser = require('cookie-parser')
router.use(cookieParser())


const userController= require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/delete/:id',passport.checkAuthentication,userController.delete);


router.get('/sign-up',userController.sign_up);

router.get('/sign-in',userController.sign_in);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',{
        failureRedirect:'/users/profile',
        successRedirect: '/',
        failureFlash: true

    }) ,userController.createSession);

router.get('/sign-out',userController.destroy);

module.exports= router;