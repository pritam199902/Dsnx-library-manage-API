const router = require('express').Router()
const user = require('../controllers/User')
const authUser = require('../controllers/Auth')

// middleware
const {isLibrarian, isNotLibrarian, isLoggedIn, isNotLoggedIn} = require('../middleware/checkUser')


// other
router.get('/',isLoggedIn, user.GetAllUser )
router.post('/', user.RegisterUser )
router.get('/:id', isLoggedIn, user.GetUserById )
router.put('/:id', isLoggedIn, isLibrarian, user.UpdateUserById )
router.delete('/:id',isLoggedIn, isLibrarian, user.DeleteUserById )

// auth
router.post('/getToken', authUser.GetToken ) // login
router.post('/refreshToken', isNotLoggedIn, authUser.RefreshToken ) // get refresh token


module.exports = router