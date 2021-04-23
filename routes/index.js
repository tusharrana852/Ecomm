const express= require('express');
const router = express.Router();

const homeController= require('../controllers/home_controller')

router.get('/', homeController);

console.log("hello");
module.exports=router;