const express= require('express');
const router = express.Router();

const homeController= require('../controllers/home_controller')

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts',require('./post'));
router.use('/comment',require('./comment'));
router.use('/api',require('./api'));

console.log("hello");
module.exports=router;
