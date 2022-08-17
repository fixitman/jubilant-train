const router = require('express').Router();
const authController = require('../controllers/authController')
const authenticate = require('../middlewares/authenticate')



router.post('/register', authController.register)
router.all('/register', authController.invalidMethod)

router.post('/login', authController.login)
router.all('/login', authController.invalidMethod)

router.get('/logout', authController.logout)
router.all('/logout', authController.invalidMethod)

router.get('/refresh', authController.refresh)
router.all('/refresh', authController.invalidMethod)

//for testing only
function test(req,res){
    console.log('test route')
    res.status(200).json({data:"test success!"})
}

router.get('/test', authenticate, test)
router.all('/test', authController.invalidMethod)

module.exports = router
