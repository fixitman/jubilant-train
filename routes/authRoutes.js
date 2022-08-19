const router = require('express').Router();
const authenticate = require('../middlewares/authenticate')

const { register, login, logout, refresh, invalidMethod } = require('../controllers/authController')


router.post('/register', register)
router.all('/register', invalidMethod)

router.post('/login', login)
router.all('/login', invalidMethod)

router.get('/logout', logout)
router.all('/logout', invalidMethod)

router.get('/refresh', refresh)
router.all('/refresh', invalidMethod)

//for testing only
function test(req,res){
    console.log('test route')
    res.status(200).json({data:"test success!"})
}

router.get('/test', authenticate, test)
router.all('/test', invalidMethod)

module.exports = router
